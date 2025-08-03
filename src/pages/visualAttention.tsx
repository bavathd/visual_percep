import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface GameImage {
  id: number;
  top: number;
  left: number;
  src: string;
  clicked: boolean;
  isCorrect: boolean;
}

// Move constants outside component to avoid recreating them on every render

const CORRECT_IMAGES = [
  "VA TR S.png", // level 0 (training)
  "VA L1 S.png",
  "VA L2 S1.png",
  "VA L3 S1.png",
  "VA L4 S.png",
  "VA L5 S.png",
];

const INCORRECT_IMAGES = [
  [], // for level 0
  [], // for level 1
  ["VA L2 S2.png"],
  ["VA L3 S2.png", "VA L3 S3.png"],
  ["VA L4 S2.png", "VA L4 S3.png", "VA L4 S4.png"],
  ["VA L5 S2.png", "VA L5 S3.png", "VA L5 S4.png", "VA L5 S5.png"],
];

const NUMBER_OF_CORRECT = [5, 10, 10, 6, 7, 6];
const TOTAL_IMAGES = [5, 10, 25, 25, 25, 25];

const GameScreen: React.FC = () => {
  const [level, setLevel] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const url = "https://visualperceptiondomain.s3.ap-south-1.amazonaws.com/game-assets/visualAttention/";

  const [correct, setCorrect] = useState<number>(1);
  const [images, setImages] = useState<GameImage[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const generateUniquePositions = (count: number): { top: number; left: number }[] => {
      const positions: { top: number; left: number }[] = [];

      while (positions.length < count) {
        const top = Math.floor(Math.random() * 80);
        const left = Math.floor(Math.random() * 95);

        const tooClose = positions.some(
          pos => Math.abs(pos.top - top) < 12 && Math.abs(pos.left - left) < 12
        );

        if (!tooClose) positions.push({ top, left });
      }

      return positions;
    };

    const positions = generateUniquePositions(TOTAL_IMAGES[level]);
    const correctIndexes = new Set<number>();

    while (correctIndexes.size < NUMBER_OF_CORRECT[level]) {
      correctIndexes.add(Math.floor(Math.random() * TOTAL_IMAGES[level]));
    }

    const newImages: GameImage[] = Array.from({ length: TOTAL_IMAGES[level] }, (_, i) => {
      const isCorrect = correctIndexes.has(i);
      const src = isCorrect
        ? `${url}${CORRECT_IMAGES[level]}`
        : `${url}${INCORRECT_IMAGES[level][Math.floor(Math.random() * INCORRECT_IMAGES[level].length)]}`;

      return {
        id: i,
        top: positions[i].top,
        left: positions[i].left,
        clicked: false,
        src,
        isCorrect,
      };
    });

    setImages(newImages);
  }, [level]);

  useEffect(() => {
    
    if (count >= (NUMBER_OF_CORRECT[level])) {
      setLevel((prev) => prev + 1);
      setCount(0);
      setCorrect(0);
    }
    if(level>=5){
      setShowModal(true)
    }
  }, [count, level]); // Add dependencies for the useEffect

  const handleClick = (id: number) => {
    // Find the clicked image first
    const clickedImage = images.find(img => img.id === id);
    
    // Only proceed if the image exists and hasn't been clicked
    if (clickedImage && !clickedImage.clicked) {
      // Increment count only once per valid click
      setCount((prev) => prev + 1);
      console.log("New count will be:", count + 1);
      
      // Update the clicked image
      setImages(prev =>
        prev.map(img => {
          if (img.id === id) {
            if (img.isCorrect) {
              setCorrect(prev => (prev + 1));
              console.log(`✅ Correct image clicked: ${img.src}`);
            } else {
              console.log(`❌ Incorrect image clicked: ${img.src}`);
            }
            console.log("correct", correct);
            return { ...img, clicked: true };
          }
          return img;
        })
      );
    }
  };

  return (
      <div className="w-screen h-screen bg-gradient-to-t from-white to-blue-500 dark:from-blue-900 dark:to-gray-900 flex flex-col p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button className="text-blue-700 dark:text-blue-300 hover:bg-amber-50 font-semibold bg-amber-300 rounded-2xl px-4 py-2 shadow">
            ← Back
          </button>

          <div className="text-lg font-bold text-white bg-blue-600 rounded-xl px-4 py-2">
            Game Name
          </div>

          <div className="text-lg font-bold text-white rounded-xl px-4 py-2">
            VPd1110
          </div>
        </div>


        {/* Game Container */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full overflow-hidden relative">
          {images.map(({ id, top, left, src, clicked }) => (
            <img
              key={id}
              src={src}
              alt={`img-${id}`}
              onClick={() => handleClick(id)}
              className={`absolute w-[50px] h-[50px] cursor-pointer transition-all duration-200 ${
                clicked ? "opacity-30 scale-90" : "hover:scale-110"
              }`}
              style={{ top: `${top}%`, left: `${left}%` }}
            />
          ))}
        </div>
            {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 text-center rounded-xl shadow-2xl p-6 w-80 mx-4 transform transition-all duration-300">
            <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-white">
              Game Over
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              You completed 10 levels!
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate("/home")}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Next Assessment
              </button>
              <button
                onClick={() => console.log("back")}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Back to Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreen;