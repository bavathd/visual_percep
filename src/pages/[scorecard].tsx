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
                    : "incorrect"}
              </span>
            </div>

            {/* RESPONSE TIME */}
            <div>
              <span className="font-semibold">Response Time:</span>{" "}
              <span className="text-black">
                {item.responseTime !== null ? `${item.responseTime} ms` : "-"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const domains = [
  "Visual Attention", // VA
  "Visual Memory", // VM
  "Visual Discrimination", // VD
  "Visual Form Constancy", // VFC
  "Visual Figure Ground", // VFG
  "Visual Closure", // VC
  "Visual Spatial Relationships", // VSR
  "Visual Topography", // VTo
  "Global Motion Perception", // VGM
  "Local Motion Perception", // VLM
  "Motion Speed", // VMS
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
    domains.map(() => generateEmptyItems()),
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
        today,
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
    doc.text(
      "Digitalized Comprehensive Visual Perception-Children Score Card",
      14,
      20,
    );

    doc.setFontSize(12);
    doc.text(`VPD ID: ${vpdId}`, 14, 30);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 38);

    // =========================================================
    // SUMMARY TABLE
    // =========================================================
    const summaryRows = domains.map((domain, index) => {
      const { correct, totalTime } = calculateDomainScore(data[index]);
      return [domain, `${correct}/10`, `${totalTime} ms`];
    });

    autoTable(doc, {
      startY: 50,
      head: [["Domain", "Response Score", "Total Time"]],
      body: summaryRows,
    });

    // =========================================================
    // LEVEL DETAILS PER DOMAIN
    // =========================================================
    domains.forEach((domain, domainIndex) => {
      doc.addPage();
      doc.setFontSize(16);
      doc.text(`${domain} Domain Scores`, 14, 20);

      const levelRows = data[domainIndex].map((item) => [
        item.itemNo,
        item.correct === null ? "-" : item.correct ? "Correct" : "incorrect",
        item.responseTime !== null ? item.responseTime : "-",
      ]);

      autoTable(doc, {
        startY: 30,
        head: [["Item", "Response Score", "Response Time (ms)"]],
        body: levelRows,
      });
    });

    // =========================================================
    // APPENDIX 2 TOTAL CALCULATIONS
    // =========================================================
    const foundation = [0, 1, 2];
    const objectBased = [3, 4, 5];
    const spaceMotion = [6, 7, 8, 9, 10];

    const pdfSum = (indexes: number[]) => {
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

    const fTotal = pdfSum(foundation);
    const oTotal = pdfSum(objectBased);
    const sTotal = pdfSum(spaceMotion);

    const grandCorrect = fTotal.correct + oTotal.correct + sTotal.correct;
    const grandTotal = fTotal.total + oTotal.total + sTotal.total;
    const grandTime = fTotal.time + oTotal.time + sTotal.time;
    const grandAccuracy = (grandCorrect / grandTotal).toFixed(3);

    // =========================================================
    // APPENDIX 2 PDF TABLE
    // =========================================================
    doc.addPage();
    doc.setFontSize(18);
    doc.text("Raw Scores", 14, 20);

    const appendixTableRows = [
      ["VISUAL FOUNDATION SKILLS", "", "", "", ""],
      ...foundation.map((idx) => {
        const items = data[idx];
        const correct = items.filter((i) => i.correct).length;
        const time = items.reduce((sum, a) => sum + (a.responseTime || 0), 0);
        return [
          domains[idx],
          `${correct}/10`,
          `10`,
          (correct / 10).toFixed(3),
          time,
        ];
      }),
      [
        "VISUAL FOUNDATION SKILLS TOTAL",
        fTotal.correct,
        fTotal.total,
        (fTotal.correct / fTotal.total).toFixed(3),
        fTotal.time,
      ],

      ["OBJECT-BASED VISUAL PERCEPTION SKILLS", "", "", "", ""],
      ...objectBased.map((idx) => {
        const items = data[idx];
        const correct = items.filter((i) => i.correct).length;
        const time = items.reduce((sum, a) => sum + (a.responseTime || 0), 0);
        return [
          domains[idx],
          `${correct}/10`,
          `10`,
          (correct / 10).toFixed(3),
          time,
        ];
      }),
      [
        "OBJECT-BASED VISUAL PERCEPTION SKILLS TOTAL",
        oTotal.correct,
        oTotal.total,
        (oTotal.correct / oTotal.total).toFixed(3),
        oTotal.time,
      ],

      ["SPACE & MOTION VISUAL PERCEPTION SKILLS", "", "", "", ""],
      ...spaceMotion.map((idx) => {
        const items = data[idx];
        const correct = items.filter((i) => i.correct).length;
        const time = items.reduce((sum, a) => sum + (a.responseTime || 0), 0);
        return [
          domains[idx],
          `${correct}/10`,
          `10`,
          (correct / 10).toFixed(3),
          time,
        ];
      }),
      [
        "SPACE & MOTION VISUAL PERCEPTION SKILLS TOTAL",
        sTotal.correct,
        sTotal.total,
        (sTotal.correct / sTotal.total).toFixed(3),
        sTotal.time,
      ],

      // ======================
      // GRAND TOTAL
      // ======================
      [
        "DCVPA-C Total Score",
        grandCorrect,
        grandTotal,
        grandAccuracy,
        grandTime,
      ],
    ];

    autoTable(doc, {
      startY: 35,
      head: [
        ["Domain", "Response Score", "Total Score", "Accuracy", "Time (ms)"],
      ],
      body: appendixTableRows,

      theme: "grid",

      styles: {
        fontSize: 10,
        cellPadding: 3,
        lineWidth: 0.2,
        lineColor: [180, 180, 180],
        valign: "middle",
      },

      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: "bold",
        halign: "center",
      },

      didParseCell: (hookData) => {
        if (hookData.section !== "body") return;

        const rowTitle = String(hookData.row.cells[0].raw);

        const sectionHeaders = [
          "VISUAL FOUNDATION SKILLS",
          "OBJECT-BASED VISUAL PERCEPTION SKILLS",
          "SPACE & MOTION VISUAL PERCEPTION SKILLS",
        ];

        const totals = [
          "VISUAL FOUNDATION SKILLS TOTAL",
          "OBJECT-BASED VISUAL PERCEPTION SKILLS TOTAL",
          "SPACE & MOTION VISUAL PERCEPTION SKILLS TOTAL",
        ];

        // ------------------------------
        // SECTION HEADERS
        // ------------------------------
        if (sectionHeaders.includes(rowTitle)) {
          hookData.cell.styles.fontStyle = "bold";
          hookData.cell.styles.fontSize = 11;
          hookData.cell.styles.fillColor = [220, 230, 241];
          hookData.cell.styles.textColor = [0, 0, 0];

          if (hookData.column.index > 0) {
            hookData.cell.text = [""];
            hookData.cell.styles.fillColor = [220, 230, 241];
          }
        }

        // ------------------------------
        // TOTAL ROWS
        // ------------------------------
        if (totals.includes(rowTitle)) {
          hookData.cell.styles.fontStyle = "bold";
          hookData.cell.styles.fillColor = [242, 242, 242];
          hookData.cell.styles.textColor = [0, 0, 0];
        }

        // ------------------------------
        // GRAND TOTAL
        // ------------------------------
        if (rowTitle === "DCVPA-C Total Score") {
          hookData.cell.styles.fontStyle = "bold";
          hookData.cell.styles.fontSize = 11;
          hookData.cell.styles.fillColor = [255, 235, 156];
          hookData.cell.styles.textColor = [0, 0, 0];
        }
      },
    });

    // =========================================================
    // SAVE PDF
    // =========================================================
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
        Digitalized Comprehensive Visual Perception-Children Score Card
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
  const foundation = [0, 1, 2];
  const objectBased = [3, 4, 5];
  const spaceMotion = [6, 7, 8, 9, 10];

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

  // GRAND TOTALS FOR ALL DOMAINS
  const grandCorrect =
    foundationTotals.correct + objectTotals.correct + spaceTotals.correct;
  const grandTotal =
    foundationTotals.total + objectTotals.total + spaceTotals.total;
  const grandTime =
    foundationTotals.time + objectTotals.time + spaceTotals.time;

  const grandAccuracy = (grandCorrect / grandTotal).toFixed(3);

  return (
    <div className="p-6 bg-white shadow rounded-2xl mt-8">
      <h2 className="text-2xl font-bold mb-4">Raw & Time Scores</h2>

      <table className="w-full border text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Domain</th>
            <th className="p-2 text-center">Response Score</th>
            <th className="p-2 text-center">Total Items</th>
            <th className="p-2 text-center">Accuracy</th>
            <th className="p-2 text-center">Total Time (milli sec)</th>
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
                <td className="p-2 text-center">{(correct / 10).toFixed(3)}</td>
                <td className="p-2 text-center">{time}</td>
              </tr>
            );
          })}

          <tr className="font-bold bg-gray-50">
            <td className="p-2">FOUNDATION TOTAL</td>
            <td className="p-2 text-center">{foundationTotals.correct}</td>
            <td className="p-2 text-center">{foundationTotals.total}</td>
            <td className="p-2 text-center">
              {(foundationTotals.correct / foundationTotals.total).toFixed(3)}
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
                  {((correct / 10) * 100).toFixed(3)}
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
              {(objectTotals.correct / objectTotals.total).toFixed(3)}
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
                <td className="p-2 text-center">{(correct / 10).toFixed(3)}</td>
                <td className="p-2 text-center">{time}</td>
              </tr>
            );
          })}

          <tr className="font-bold bg-gray-50">
            <td className="p-2">SPACE & MOTION TOTAL</td>
            <td className="p-2 text-center">{spaceTotals.correct}</td>
            <td className="p-2 text-center">{spaceTotals.total}</td>
            <td className="p-2 text-center">
              {(spaceTotals.correct / spaceTotals.total).toFixed(3)}
            </td>
            <td className="p-2 text-center">{spaceTotals.time}</td>
          </tr>
          <tr className="font-bold bg-yellow-100">
            <td className="p-2">DCVPA-C Total Score</td>
            <td className="p-2 text-center">{grandCorrect}</td>
            <td className="p-2 text-center">{grandTotal}</td>
            <td className="p-2 text-center">{grandAccuracy}</td>
            <td className="p-2 text-center">{grandTime}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScoreCard;
