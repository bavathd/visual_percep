import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface ScoreItem {
  itemNo: number;
  correct: boolean | null;
  responseTime: number | null;
}

interface DomainSectionProps {
  title: string;
  items: ScoreItem[];
  onUpdate: (
    index: number,
    field: keyof ScoreItem,
    value: boolean | null | number
  ) => void;
}

const DomainSection: React.FC<DomainSectionProps> = ({
  title,
  items,
  onUpdate,
}) => {
  return (
    <div className="p-4 rounded-2xl shadow mb-6 bg-white">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm">
        {items.map((item, i) => (
          <div key={item.itemNo} className="p-3 border rounded-xl bg-gray-50">
            <p className="font-medium mb-1">Item {item.itemNo}</p>

            <label className="block mb-1">Correct:</label>
            <select
              className="w-full p-2 border rounded"
              value="-"
              onChange={() => {}}
            >
              <option value="-">-</option>
            </select>

            <label className="block mt-2 mb-1">Response Time (sec):</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={item.responseTime ?? ""}
              onChange={(e) =>
                onUpdate(
                  i,
                  "responseTime",
                  e.target.value ? Number(e.target.value) : null
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ScoreCard: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  const exportCleanPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Visual Perception Full Report", 14, 20);

    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    // ---------------------------
    // SUMMARY TABLE
    // ---------------------------
    const summaryRows = domains.map((domain, idx) => {
      const { correct, totalTime } = calculateDomainScore(data[idx]);
      return [domain, `${correct}/10`, totalTime + "s"];
    });

    autoTable(doc, {
      startY: 40,
      head: [["Domain", "Correct", "Time (s)"]],
      body: summaryRows,
    });

    // ---------------------------
    // DOMAIN-LEVEL ITEM TABLES
    // ---------------------------
    domains.forEach((domain, idx) => {
      doc.addPage();
      doc.setFontSize(16);
      doc.text(domain, 14, 20);

      const rows = data[idx].map((item) => [
        item.itemNo,
        item.correct === null ? "-" : item.correct ? "Correct" : "Incorrect",
        item.responseTime ?? "-",
      ]);

      autoTable(doc, {
        startY: 30,
        head: [["Item No", "Correct", "Response Time (s)"]],
        body: rows,
      });
    });

    // ---------------------------
    // APPENDIX 2
    // ---------------------------
    doc.addPage();
    doc.setFontSize(16);
    doc.text("Appendix 2: Raw and Time Scores", 14, 20);

    const foundation = [0, 2, 4, 6];
    const objectBased = [8, 10, 1];
    const spaceMotion = [3, 5, 7, 9, 11];

    const sumSection = (
      indexes: number[]
    ): { correct: number; total: number; time: number } => {
      let correct = 0;
      let time = 0;

      indexes.forEach((i: number) => {
        data[i].forEach((x: ScoreItem) => {
          if (x.correct) correct++;
          if (x.responseTime) time += x.responseTime;
        });
      });

      return { correct, total: indexes.length * 10, time };
    };

    const appendixRows = [
      ["VISUAL FOUNDATION SKILLS", "", "", "", ""],
      ...foundation.map((i) => [
        domains[i],
        data[i].filter((x) => x.correct).length,
        10,
        ((data[i].filter((x) => x.correct).length / 10) * 100).toFixed(1) + "%",
        data[i].reduce((s, a) => s + (a.responseTime || 0), 0),
      ]),
      [
        "Foundation Total",
        sumSection(foundation).correct,
        sumSection(foundation).total,
        "",
        sumSection(foundation).time,
      ],

      ["OBJECT-BASED VISUAL SKILLS", "", "", "", ""],
      ...objectBased.map((i) => [
        domains[i],
        data[i].filter((x) => x.correct).length,
        10,
        ((data[i].filter((x) => x.correct).length / 10) * 100).toFixed(1) + "%",
        data[i].reduce((s, a) => s + (a.responseTime || 0), 0),
      ]),

      ["SPACE & MOTION SKILLS", "", "", "", ""],
      ...spaceMotion.map((i) => [
        domains[i],
        data[i].filter((x) => x.correct).length,
        10,
        ((data[i].filter((x) => x.correct).length / 10) * 100).toFixed(1) + "%",
        data[i].reduce((s, a) => s + (a.responseTime || 0), 0),
      ]),
    ];

    autoTable(doc, {
      startY: 30,
      head: [
        ["Domain", "Correct", "Total Items", "Accuracy", "Total Time (s)"],
      ],
      body: appendixRows,
    });

    doc.save("Visual-Perception-Full-Report.pdf");
  };

  const generateItems = (count: number): ScoreItem[] =>
    Array.from({ length: count }, (_, i) => ({
      itemNo: i + 1,
      correct: null,
      responseTime: null,
    }));

  const domains = [
    "Visual Attention",
    "Visual Closure",
    "Visual Tracking",
    "Spatial Relationships",
    "Visual Discrimination",
    "Topography",
    "Visual Memory",
    "Global Motion Perception",
    "Visual Figure-Ground",
    "Local Motion Perception",
    "Visual Form Constancy",
    "Motion Speed",
  ];

  const [data, setData] = useState(domains.map(() => generateItems(10)));

  const updateItem = (
    domainIndex: number,
    itemIndex: number,
    field: keyof ScoreItem,
    value: boolean | null | number
  ) => {
    setData((prev) => {
      const newData = [...prev];
      newData[domainIndex] = [...newData[domainIndex]];
      newData[domainIndex][itemIndex] = {
        ...newData[domainIndex][itemIndex],
        [field]: value,
      };
      return newData;
    });
  };

  const calculateDomainScore = (items: ScoreItem[]) => {
    const correct = items.filter((i) => i.correct).length;
    const totalTime = items.reduce((s, i) => s + (i.responseTime || 0), 0);
    return { correct, totalTime };
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Visual Perception Score Report", 10, 10);

    let y = 20;
    domains.forEach((domain, idx) => {
      const { correct, totalTime } = calculateDomainScore(data[idx]);
      doc.text(
        `${domain}: Correct = ${correct}/10 | Time = ${totalTime}s`,
        10,
        y
      );
      y += 8;
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("scorecard.pdf");
  };

  return (
    <div
      ref={pageRef}
      className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen"
    >
      <h1 className="text-3xl font-bold mb-6 text-center">
        Digitalized Comprehensive Visual Perception Score Card
      </h1>

      {domains.map((domain, i) => (
        <DomainSection
          key={domain}
          title={domain}
          items={data[i]}
          onUpdate={(index, field, value) => updateItem(i, index, field, value)}
        />
      ))}

      <div className="p-6 bg-white shadow rounded-2xl mt-10">
        <h2 className="text-2xl font-bold mb-4">Summary Scores</h2>

        <div className="space-y-3 text-lg">
          {domains.map((domain, i) => {
            const { correct, totalTime } = calculateDomainScore(data[i]);
            return (
              <p key={domain}>
                <strong>{domain}</strong>: {correct}/10 correct | {totalTime}s
                total
              </p>
            );
          })}
        </div>

        <button
          onClick={exportPDF}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700"
        >
          Export PDF
        </button>
      </div>

      <AppendixTwo data={data} domains={domains} />

      <button
        onClick={exportCleanPDF}
        className="mt-4 bg-green-600 text-white px-6 py-3 rounded-xl shadow hover:bg-green-700"
      >
        Download Full Report (All Sections)
      </button>
    </div>
  );
};

// Appendix 2 Table Component
interface SummaryRowProps {
  domain: string;
  correct: number;
  total: number;
  time: number;
}

const SummaryRow: React.FC<SummaryRowProps> = ({
  domain,
  correct,
  total,
  time,
}) => (
  <tr className="border">
    <td className="p-2 font-medium">{domain}</td>
    <td className="p-2 text-center">{correct}</td>
    <td className="p-2 text-center">{total}</td>
    <td className="p-2 text-center">{((correct / total) * 100).toFixed(1)}%</td>
    <td className="p-2 text-center">{time}</td>
  </tr>
);

const AppendixTwo: React.FC<{ data: ScoreItem[][]; domains: string[] }> = ({
  data,
  domains,
}) => {
  const foundation = [0, 2, 4, 6];
  const objectBased = [8, 10, 1];
  const spaceMotion = [3, 5, 7, 9, 11];

  const sumSection = (indexes: number[]) => {
    let correct = 0;
    let time = 0;
    indexes.forEach((i) => {
      data[i].forEach((x) => {
        if (x.correct) correct++;
        if (x.responseTime) time += x.responseTime;
      });
    });
    return { correct, total: indexes.length * 10, time };
  };

  const foundationTotals = sumSection(foundation);
  const objectTotals = sumSection(objectBased);
  const spaceTotals = sumSection(spaceMotion);

  return (
    <div className="p-6 bg-white mt-10 shadow rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">
        Appendix 2: Raw and Time Scores
      </h2>

      <table className="w-full border text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Domain</th>
            <th className="p-2 text-center">Total Correct</th>
            <th className="p-2 text-center">Total Items</th>
            <th className="p-2 text-center">Accuracy (%)</th>
            <th className="p-2 text-center">Total Time (s)</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td colSpan={5} className="p-2 font-bold bg-gray-100">
              VISUAL FOUNDATION SKILLS
            </td>
          </tr>
          {foundation.map((i) => {
            const c = data[i].filter((x) => x.correct).length;
            const t = data[i].reduce((s, a) => s + (a.responseTime || 0), 0);
            return (
              <SummaryRow
                key={domains[i]}
                domain={domains[i]}
                correct={c}
                total={10}
                time={t}
              />
            );
          })}
          <SummaryRow
            domain="VISUAL FOUNDATION SKILLS TOTAL"
            correct={foundationTotals.correct}
            total={foundationTotals.total}
            time={foundationTotals.time}
          />

          <tr>
            <td colSpan={5} className="p-2 font-bold bg-gray-100">
              OBJECT-BASED VISUAL PERCEPTION SKILLS
            </td>
          </tr>
          {objectBased.map((i) => {
            const c = data[i].filter((x) => x.correct).length;
            const t = data[i].reduce((s, a) => s + (a.responseTime || 0), 0);
            return (
              <SummaryRow
                key={domains[i]}
                domain={domains[i]}
                correct={c}
                total={10}
                time={t}
              />
            );
          })}
          <SummaryRow
            domain="OBJECT-BASED TOTAL"
            correct={objectTotals.correct}
            total={objectTotals.total}
            time={objectTotals.time}
          />

          <tr>
            <td colSpan={5} className="p-2 font-bold bg-gray-100">
              SPACE AND MOTION-BASED VISUAL PERCEPTION SKILLS
            </td>
          </tr>
          {spaceMotion.map((i) => {
            const c = data[i].filter((x) => x.correct).length;
            const t = data[i].reduce((s, a) => s + (a.responseTime || 0), 0);
            return (
              <SummaryRow
                key={domains[i]}
                domain={domains[i]}
                correct={c}
                total={10}
                time={t}
              />
            );
          })}
          <SummaryRow
            domain="SPACE & MOTION TOTAL"
            correct={spaceTotals.correct}
            total={spaceTotals.total}
            time={spaceTotals.time}
          />

          <tr>
            <td colSpan={5} className="p-2 font-bold bg-gray-200">
              VISUAL PERCEPTION TOTAL SCORE
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScoreCard;
