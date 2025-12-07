import React, { useRef, useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { getScoresByDate } from "../utils/scoreStorage";

interface GameLevel {
  score: number;
  timestamp: number;
}

interface DomainScores {
  [key: string]: GameLevel | undefined; // "Level 1": {score, duration}
}

interface FirestoreScoreData {
  [domain: string]: DomainScores | undefined;
}

interface ScoreItem {
  itemNo: number;
  correct: boolean | null;
  responseTime: number | null;
}

interface DomainSectionProps {
  title: string;
  items: ScoreItem[];
}

const DomainSection: React.FC<DomainSectionProps> = ({ title, items }) => {
  return (
    <div className="p-4 rounded-2xl shadow mb-6 bg-white">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm">
        {items.map((item) => (
          <div key={item.itemNo} className="p-3 border rounded-xl bg-gray-50">
            <p className="font-medium mb-2">Level {item.itemNo}</p>

            {/* CORRECT / INCORRECT */}
            <div className="mb-1">
              <span className="font-semibold">Correct:</span>{" "}
              <span
                className={
                  item.correct === null
                    ? "text-gray-600"
                    : item.correct
                    ? "text-green-600 font-bold"
                    : "text-red-600 font-bold"
                }
              >
                {item.correct === null
                  ? "-"
                  : item.correct
                  ? "Correct"
                  : "Wrong"}
              </span>
            </div>

            {/* RESPONSE TIME */}
            <div>
              <span className="font-semibold">Response Time:</span>{" "}
              <span className="text-black">
                {item.responseTime !== null ? `${item.responseTime} sec` : "-"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const domains = [
  "Visual Attention",
  "Visual Closure",
  "Visual Tracking",
  "Spatial Relationships",
  "Visual Discrimination",
  "Topography",
  "Visual Memory",
  "Global Motion Perception",
  "Visual Figure Ground",
  "Local Motion Perception",
  "Visual Form Constancy",
  "Motion Speed",
] as const;
const ScoreCard: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  const generateEmptyItems = (): ScoreItem[] =>
    Array.from({ length: 10 }, (_, i) => ({
      itemNo: i + 1,
      correct: null,
      responseTime: null,
    }));

  const [vpdId, setVpdId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<ScoreItem[][]>(
    domains.map(() => generateEmptyItems())
  );

  // =========================================================
  // 🔥 FETCH FIRESTORE SCORES STRICTLY TYPED
  // =========================================================
  useEffect(() => {
    const load = async () => {
      const id = localStorage.getItem("CURRENT_VPD_ID");
      if (!id) {
        alert("No VPD ID found.");
        setLoading(false);
        return;
      }

      setVpdId(id);

      const today = new Date().toISOString().split("T")[0];
      const firestoreData = (await getScoresByDate(
        id,
        today
      )) as FirestoreScoreData;

      if (!firestoreData) {
        setLoading(false);
        return;
      }
      console.log(firestoreData);
      const mapped = domains.map((domain) => {
        const domainScores: DomainScores = firestoreData[domain] ?? {};

        return Array.from({ length: 10 }, (_, index) => {
          const key = `Level ${index + 1}`;
          const levelData = domainScores[key];

          return {
            itemNo: index + 1,
            correct:
              levelData?.score !== undefined ? levelData.score > 0 : null,
            responseTime: levelData?.timestamp ?? null,
          };
        });
      });

      setData(mapped);
      setLoading(false);
    };

    load();
  }, []);

  // =========================================================
  // PDF EXPORT
  // =========================================================
  const calculateDomainScore = (items: ScoreItem[]) => {
    const correct = items.filter((i) => i.correct).length;
    const totalTime = items.reduce((sum, i) => sum + (i.responseTime || 0), 0);

    return { correct, totalTime };
  };

  const exportCleanPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Visual Perception Full Report", 14, 20);

    doc.setFontSize(12);
    doc.text(`VPD ID: ${vpdId}`, 14, 30);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 38);

    // ---------------------------
    // SUMMARY TABLE
    // ---------------------------
    const summaryRows = domains.map((domain, index) => {
      const { correct, totalTime } = calculateDomainScore(data[index]);
      return [domain, `${correct}/10`, `${totalTime}s`];
    });

    autoTable(doc, {
      startY: 50,
      head: [["Domain", "Correct", "Total Time"]],
      body: summaryRows,
    });

    // ---------------------------
    // PER DOMAIN LEVEL DETAILS
    // ---------------------------
    domains.forEach((domain, domainIndex) => {
      doc.addPage();
      doc.setFontSize(16);
      doc.text(`${domain} — Level Details`, 14, 20);

      const levelRows = data[domainIndex].map((item) => [
        item.itemNo,
        item.correct === null ? "-" : item.correct ? "Correct" : "Wrong",
        item.responseTime !== null ? item.responseTime : "-",
      ]);

      autoTable(doc, {
        startY: 30,
        head: [["Level", "Correct", "Response Time (sec)"]],
        body: levelRows,
      });
    });

    // ---------------------------
    // APPENDIX 2 (FINAL SECTION)
    // ---------------------------
    doc.addPage();
    doc.setFontSize(18);
    doc.text("Appendix 2 — Raw & Time Scores", 14, 20);

    const foundation = [0, 2, 4, 6];
    const objectBased = [8, 10, 1];
    const spaceMotion = [3, 5, 7, 9, 11];

    const buildRows = (indexes: number[]) => {
      return indexes.map((idx) => {
        const correct = data[idx].filter((i) => i.correct).length;
        const time = data[idx].reduce(
          (sum, i) => sum + (i.responseTime || 0),
          0
        );

        return [
          domains[idx],
          correct,
          10,
          ((correct / 10) * 100).toFixed(1) + "%",
          time,
        ];
      });
    };

    const appendixRows = [
      ["VISUAL FOUNDATION SKILLS", "", "", "", ""],
      ...buildRows(foundation),

      ["FOUNDATION TOTAL", "", "", "", ""],

      ["OBJECT-BASED VISUAL SKILLS", "", "", "", ""],
      ...buildRows(objectBased),

      ["OBJECT-BASED TOTAL", "", "", "", ""],

      ["SPACE & MOTION VISUAL SKILLS", "", "", "", ""],
      ...buildRows(spaceMotion),

      ["SPACE & MOTION TOTAL", "", "", "", ""],
    ];

    autoTable(doc, {
      startY: 30,
      head: [["Domain", "Correct", "Total", "Accuracy", "Time"]],
      body: appendixRows,
      styles: { fontSize: 10 },
    });

    doc.save(`VPD-${vpdId}-Full-Report.pdf`);
  };

  if (loading)
    return (
      <div className="p-10 text-center text-xl font-semibold">
        Loading score data...
      </div>
    );

  return (
    <div
      ref={pageRef}
      className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen"
    >
      {/* VPD ID TOP RIGHT */}
      <div className="flex justify-end text-xl font-bold text-blue-700 mb-2">
        {vpdId && `ID: ${vpdId}`}
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">
        Digitalized Comprehensive Visual Perception Score Card
      </h1>

      {domains.map((domain, i) => (
        <DomainSection key={domain} title={domain} items={data[i]} />
      ))}

      <div className="p-6 bg-white shadow rounded-2xl mt-10">
        <h2 className="text-2xl font-bold mb-4">Summary Scores</h2>

        {domains.map((domain, index) => {
          const { correct, totalTime } = calculateDomainScore(data[index]);
          return (
            <p key={domain} className="text-lg">
              <strong>{domain}</strong>: {correct}/10 correct | {totalTime}s
            </p>
          );
        })}
      </div>
      <AppendixTwo data={data} domains={domains} />
      <button
        onClick={exportCleanPDF}
        className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl shadow hover:bg-green-700"
      >
        Download Full Report (PDF)
      </button>
    </div>
  );
};
interface AppendixProps {
  data: ScoreItem[][];
  domains: readonly string[];
}

const AppendixTwo: React.FC<AppendixProps> = ({ data, domains }) => {
  // Domain index groups
  const foundation = [0, 2, 4, 6];
  const objectBased = [8, 10, 1];
  const spaceMotion = [3, 5, 7, 9, 11];

  const sum = (indexes: number[]) => {
    let correct = 0;
    let time = 0;

    indexes.forEach((idx) => {
      const items = data[idx];

      items.forEach((item) => {
        if (item.correct) correct++;
        if (item.responseTime) time += item.responseTime;
      });
    });

    return { correct, total: indexes.length * 10, time };
  };

  const foundationTotals = sum(foundation);
  const objectTotals = sum(objectBased);
  const spaceTotals = sum(spaceMotion);

  return (
    <div className="p-6 bg-white shadow rounded-2xl mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Appendix 2 — Raw & Time Scores
      </h2>

      <table className="w-full border text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Domain</th>
            <th className="p-2 text-center">Correct</th>
            <th className="p-2 text-center">Total Items</th>
            <th className="p-2 text-center">Accuracy %</th>
            <th className="p-2 text-center">Total Time (sec)</th>
          </tr>
        </thead>

        <tbody>
          {/* ---------- FOUNDATION SKILLS ---------- */}
          <tr>
            <td colSpan={5} className="p-2 font-bold bg-gray-100">
              VISUAL FOUNDATION SKILLS
            </td>
          </tr>

          {foundation.map((idx) => {
            const items = data[idx];
            const correct = items.filter((i) => i.correct).length;
            const time = items.reduce((s, a) => s + (a.responseTime || 0), 0);
            return (
              <tr key={domains[idx]} className="border">
                <td className="p-2">{domains[idx]}</td>
                <td className="p-2 text-center">{correct}</td>
                <td className="p-2 text-center">10</td>
                <td className="p-2 text-center">
                  {((correct / 10) * 100).toFixed(1)}%
                </td>
                <td className="p-2 text-center">{time}</td>
              </tr>
            );
          })}

          <tr className="font-bold bg-gray-50">
            <td className="p-2">FOUNDATION TOTAL</td>
            <td className="p-2 text-center">{foundationTotals.correct}</td>
            <td className="p-2 text-center">{foundationTotals.total}</td>
            <td className="p-2 text-center">
              {(
                (foundationTotals.correct / foundationTotals.total) *
                100
              ).toFixed(1)}
              %
            </td>
            <td className="p-2 text-center">{foundationTotals.time}</td>
          </tr>

          {/* ---------- OBJECT BASED ---------- */}
          <tr>
            <td colSpan={5} className="p-2 font-bold bg-gray-100">
              OBJECT-BASED VISUAL PERCEPTION SKILLS
            </td>
          </tr>

          {objectBased.map((idx) => {
            const items = data[idx];
            const correct = items.filter((i) => i.correct).length;
            const time = items.reduce((s, a) => s + (a.responseTime || 0), 0);
            return (
              <tr key={domains[idx]} className="border">
                <td className="p-2">{domains[idx]}</td>
                <td className="p-2 text-center">{correct}</td>
                <td className="p-2 text-center">10</td>
                <td className="p-2 text-center">
                  {((correct / 10) * 100).toFixed(1)}%
                </td>
                <td className="p-2 text-center">{time}</td>
              </tr>
            );
          })}

          <tr className="font-bold bg-gray-50">
            <td className="p-2">OBJECT-BASED TOTAL</td>
            <td className="p-2 text-center">{objectTotals.correct}</td>
            <td className="p-2 text-center">{objectTotals.total}</td>
            <td className="p-2 text-center">
              {((objectTotals.correct / objectTotals.total) * 100).toFixed(1)}%
            </td>
            <td className="p-2 text-center">{objectTotals.time}</td>
          </tr>

          {/* ---------- SPACE & MOTION ---------- */}
          <tr>
            <td colSpan={5} className="p-2 font-bold bg-gray-100">
              SPACE & MOTION VISUAL SKILLS
            </td>
          </tr>

          {spaceMotion.map((idx) => {
            const items = data[idx];
            const correct = items.filter((i) => i.correct).length;
            const time = items.reduce((s, a) => s + (a.responseTime || 0), 0);
            return (
              <tr key={domains[idx]} className="border">
                <td className="p-2">{domains[idx]}</td>
                <td className="p-2 text-center">{correct}</td>
                <td className="p-2 text-center">10</td>
                <td className="p-2 text-center">
                  {((correct / 10) * 100).toFixed(1)}%
                </td>
                <td className="p-2 text-center">{time}</td>
              </tr>
            );
          })}

          <tr className="font-bold bg-gray-50">
            <td className="p-2">SPACE & MOTION TOTAL</td>
            <td className="p-2 text-center">{spaceTotals.correct}</td>
            <td className="p-2 text-center">{spaceTotals.total}</td>
            <td className="p-2 text-center">
              {((spaceTotals.correct / spaceTotals.total) * 100).toFixed(1)}%
            </td>
            <td className="p-2 text-center">{spaceTotals.time}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScoreCard;
