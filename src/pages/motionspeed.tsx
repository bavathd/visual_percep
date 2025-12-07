import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  startLevelTimer,
  stopLevelTimer,
  resetLevelTimer,
} from "../utils/timerStore";
import { saveScore } from "../utils/scoreStorage";

const correctVideoBase =
  "https://assetsperception.s3.ap-south-1.amazonaws.com/assets/motion/correct/";
const wrongVideoBase =
  "https://assetsperception.s3.ap-south-1.amazonaws.com/assets/motion/wrong/";

const TOTAL_LEVELS = 10;

const MotionSpeed: React.FC = () => {
  const navigate = useNavigate();
  const vid = localStorage.getItem("CURRENT_VPD_ID");

  const [level, setLevel] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!vid) {
      alert("No VPD ID found. Please register first.");
      navigate("/register");
    }
  }, [vid, navigate]);

  // Start timer each level
  useEffect(() => {
    startLevelTimer();
    setClicked(false);
  }, [level]);

  const handleAnswer = (isCorrect: boolean) => {
    if (clicked) return; // prevent double-click

    setClicked(true);
    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      console.log("✔ Correct");
    } else {
      console.log("✖ Wrong");
    }

    const durationMs = stopLevelTimer();
    console.log(`⏱ Time taken: ${durationMs} ms`);

    // Save score for this level
    saveScore(vid!, "Motion Speed", level + 1, isCorrect ? 1 : 0, durationMs);

    // Move next
    setTimeout(() => nextLevel(), 600);
  };

  const nextLevel = () => {
    resetLevelTimer();

    if (level < TOTAL_LEVELS - 1) {
      setLevel(level + 1);
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex flex-col p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-700 font-semibold bg-white rounded-xl px-4 py-2 shadow"
        >
          ← Back
        </button>

        <div className="text-lg font-bold text-white bg-blue-600 rounded-xl px-4 py-2">
          Motion Speed
        </div>

        <div className="text-lg font-bold text-blue-800 rounded-xl px-4 py-2">
          Level {level + 1}/{TOTAL_LEVELS}
        </div>
      </div>

      {/* GAME AREA */}
      <div className="flex-1 bg-white rounded-xl shadow-lg p-6 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-6 w-full">
          {/* CORRECT VIDEO */}
          <div
            onClick={() => handleAnswer(true)}
            className={`cursor-pointer rounded-xl overflow-hidden shadow-lg border-4 transition ${
              clicked ? "opacity-50" : "hover:scale-105"
            }`}
          >
            <video
              key={`correct-${level}`}
              src={`${correctVideoBase}${level + 1}.mp4`}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            />
          </div>

          {/* WRONG VIDEO */}
          <div
            onClick={() => handleAnswer(false)}
            className={`cursor-pointer rounded-xl overflow-hidden shadow-lg border-4 transition ${
              clicked ? "opacity-50" : "hover:scale-105"
            }`}
          >
            <video
              key={`wrong-${level}`}
              src={`${wrongVideoBase}${level + 1}.mp4`}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* COMPLETION MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center w-80">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Assessment Complete
            </h2>
            <p className="text-lg mb-4">
              Correct Answers:{" "}
              <b>
                {correctCount} / {TOTAL_LEVELS}
              </b>
            </p>

            <button
              onClick={() => navigate("/top")}
              className="w-full bg-green-600 text-white py-3 rounded-lg mb-3"
            >
              Next Assessment
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="w-full bg-gray-600 text-white py-3 rounded-lg"
            >
              Back to Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MotionSpeed;
