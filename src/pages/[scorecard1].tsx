import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUserScores } from "../utils/scoreStorage";

interface Level {
  score: number;
  timestamp: number;
}

// structure: { [gameName: string]: { [levelName: string]: Level } }
type GameScores = Record<string, Record<string, Level>>;

const ScoreCard1: React.FC = () => {
  const [scores, setScores] = useState<GameScores>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScore = () => {
      const allScore = getAllUserScores("sunny") as GameScores;
      console.log("Fetched Scores:", allScore);
      setScores(allScore);
    };
    fetchScore();
  }, []);

  return (
    <div className="w-screen h-screen bg-gradient-to-t from-white to-purple-400 backdrop-blur-md overflow-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-6 bg-amber-100 rounded-3xl py-5 shadow-lg">
          <h1 className="text-3xl font-bold text-center text-black">
            DCVPA-C Assessment
          </h1>
          <p className="text-xl mt-1 text-center">
            Digitalized Comprehensive Visual Perception Assessment - Children
          </p>
          <p className="text-lg font-bold text-center mt-3">Record Form</p>
        </div>

        {/* Score Tables */}
        <div className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(scores).length === 0 ? (
            <p className="text-center text-gray-600">No scores found</p>
          ) : (
            Object.entries(scores).map(([gameName, levels]) => (
              <div key={gameName} className="mb-8 ">
                <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                  {gameName.toUpperCase()}
                </h2>

                <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
                  <thead className="bg-indigo-600 text-white">
                    <tr>
                      <th className="py-2 px-4 border">Level</th>
                      <th className="py-2 px-4 border">Score</th>
                      <th className="py-2 px-4 border">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(levels).map(
                      ([levelName, levelData], index) => (
                        <tr
                          key={index}
                          className="text-center even:bg-gray-100 hover:bg-indigo-50"
                        >
                          <td className="py-2 px-4 border">{levelName}</td>
                          <td className="py-2 px-4 border">
                            {levelData.score}
                          </td>
                          <td className="py-2 px-4 border">
                            {levelData.timestamp}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            ))
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => navigate("/home")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl"
          >
            Next Assessment
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl"
          >
            Back to Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard1;
