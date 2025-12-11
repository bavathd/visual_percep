import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  startLevelTimer,
  stopLevelTimer,
  resetLevelTimer,
} from "../utils/timerStore";
import { saveScore } from "../utils/scoreStorage";

const correctVideoBase =
  "https://assetsperception.s3.ap-south-1.amazonaws.com/assets/Motion+Speed/";

const correctSide: ("left" | "right")[] = [
  "left", // Level 1
  "right", // Level 2
  "right", // Level 3
  "right", // Level 4
  "left", // Level 5
  "left", // Level 6
  "left", // Level 1
  "right", // Level 2
  "right", // Level 3
  "right", // Level 4
  "left", // Level 5
  "left", // Level 6
];
const MotionSpeed: React.FC = () => {
  const navigate = useNavigate();
  const vid = localStorage.getItem("CURRENT_VPD_ID");

  const [level, setLevel] = useState(0);
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
      console.log("✔ Correct");
    } else {
      console.log("✖ Wrong");
    }

    const durationMs = stopLevelTimer();
    console.log(`⏱ Time taken: ${durationMs} ms`);

    if (level >= 2) {
      // Save score for this level
      saveScore(
        vid!,
        "Motion Speed",
        level + 1 - 2,
        isCorrect ? 1 : 0,
        durationMs
      );
    }
    // Move next
    nextLevel();
  };

  const nextLevel = () => {
    resetLevelTimer();

    if (level < 11) {
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
          Sub 12:VMS Item{level + 1}
        </div>
      </div>

      {/* GAME AREA */}
      {/* GAME AREA */}
      <div
        className="flex items-center justify-center bg-white rounded-xl shadow-lg relative"
        style={{
          width: "100%",
          height: "calc(100vh - 180px)", // fixed non-scrollable area
          paddingLeft: "10px",
          paddingRight: "10px",
          paddingBottom: "10px",
          overflow: "hidden", // prevent scrolling
        }}
      >
        {/* MERGED VIDEO */}
        <video
          key={`ms-${level}`}
          src={`${correctVideoBase}${level + 1}.mp4`}
          autoPlay
          loop
          muted
          className="w-full h-full object-contain rounded-xl"
        />

        {/* TOUCH OVERLAY */}
        <div className="absolute inset-0 grid grid-cols-2">
          {/* LEFT SIDE */}
          <div
            onClick={() => handleAnswer(correctSide[level] === "left")}
            className="cursor-pointer"
          />

          {/* RIGHT SIDE */}
          <div
            onClick={() => handleAnswer(correctSide[level] === "right")}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* COMPLETION MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center w-80">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Assessment Complete
            </h2>
            <button
              onClick={() => navigate("/score")}
              className="w-full bg-green-600 text-white py-3 rounded-lg mb-3"
            >
              Score Card
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
