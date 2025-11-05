import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface GameImage {
  id: number;
  top: number;
  left: number;
  src: string;
  clicked: boolean;
  isCorrect: boolean;
  size:number;
}

// Move constants outside component to avoid recreating them on every render

const CORRECT_IMAGES = [
    "TrialRound/objects/VA%2BTR%2BS.png",
    "TrialRound/shapes/VA%2BTR%2BS.png",
    "Level1/objects/VA%2BL1%2BS.png",
    "Level1/shapes/VA%2BL1%2BS.png",
    "Level2/objects/VA%2BL2%2BS.png",
    "Level2/shapes/VA%2BL2%2BS.png",
    "Level3/objects/VA%2BL3%2BS.png",
    "Level3/shapes/VA%2BL3%2BS.png",
    "Level4/objects/VA%2BL4%2BS.png",
    "Level4/shapes/VA%2BL4%2BS.png",
    "Level5/objects/VA%2BL5%2BS.png",
    "Level5/shapes/VA%2BL5%2BS.png",
];

const INCORRECT_IMAGES = [
  [ "TrialRound/objects/VA%2BTR%2BS0.png"], // for level 0
  [ "TrialRound/shapes/VA%2BTR%2BS0.png"],

  ["Level1/objects/VA%2BL1%2BS0.png"], // for level 1
  ["Level1/shapes/VA%2BL1%2BS0.png"],

  ["Level2/objects/VA%2BL2%2BS0.png"],
  ["Level2/shapes/VA%2BL2%2BS0.png"],

  [ "Level3/objects/VA%2BL3%2BS0.png",
    "Level3/objects/VA%2BL3%2BS1.png",
    "Level3/objects/VA%2BL3%2BS2.png",
  ], // for level 0
  [ "Level3/shapes/VA%2BL3%2BS0.png",
    "Level3/shapes/VA%2BL3%2BS1.png",
    "Level3/shapes/VA%2BL3%2BS2.png"
  ], // for level 1
  [ "Level4/objects/VA%2BL4%2BS0.png",
    "Level4/objects/VA%2BL4%2BS1.png",
    "Level4/objects/VA%2BL4%2BS2.png",
    "Level4/objects/VA%2BL4%2BS3.png"
  ],
  [ 
    "Level4/shapes/VA%2BL4%2BS0.png",
    "Level4/shapes/VA%2BL4%2BS1.png",
    "Level4/shapes/VA%2BL4%2BS2.png",
    "Level4/shapes/VA%2BL4%2BS3.png"
  ],
  [ 
    "Level5/objects/VA%2BL5%2BS0.png",
    "Level5/objects/VA%2BL5%2BS1.png",
    "Level5/objects/VA%2BL5%2BS2.png",
    "Level5/objects/VA%2BL5%2BS3.png",
    "Level5/objects/VA%2BL5%2BS4.png",
  ],
  [ 
    "Level5/shapes/VA%2BL5%2BS0.png",
    "Level5/shapes/VA%2BL5%2BS1.png",
    "Level5/shapes/VA%2BL5%2BS2.png",
    "Level5/shapes/VA%2BL5%2BS3.png",
    "Level5/shapes/VA%2BL5%2BS4.png",
  ],
  
];

const NUMBER_OF_CORRECT = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const NUMBER_OF_INCORRECT = [[20],[20],[20],[20],[20],[20],[10,7,5],[10,7,5],[10,7,5,3],[10,7,5,3],[10,7,5,3,2],[10,7,5,3,2]]
const TOTAL_IMAGES = [21, 21, 21, 21, 21, 21, 23, 23, 26, 26, 28, 28];


const GameScreen: React.FC = () => {
  const [level, setLevel] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  //const url = "https://visualperceptiondomain.s3.ap-south-1.amazonaws.com/game-assets/visualAttention/";
  const url = "https://assetsperception.s3.ap-south-1.amazonaws.com/assets/vads/";
  //const url = "http://127.0.0.1:5500/vads/";

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
        pos => Math.hypot(pos.top - top, pos.left - left) < 10 + Math.random() * 5
      );
      if (!tooClose) positions.push({ top, left });
    }
    return positions;
  };

  const correctCount = NUMBER_OF_CORRECT[level] || 1;
  const IncorrectCount = NUMBER_OF_INCORRECT[level];
  const totalImages = TOTAL_IMAGES[level] || 28;

  const positions = generateUniquePositions(totalImages);

  // ✅ Randomly pick which ones will be correct
  const correctIndexes = new Set<number>();
  while (correctIndexes.size < correctCount) {
    correctIndexes.add(Math.floor(Math.random() * totalImages));
  }

// ✅ remaining available positions
const availablePositions = Array.from({ length: totalImages }, (_, i) => i).filter(
  (i) => !correctIndexes.has(i)
);

// ✅ divide remaining positions among incorrect groups (exhaustively)
const incorrectPositions: number[][] = [];
let indexPointer = 0;

IncorrectCount.forEach((count) => {
  const group: number[] = [];

  for (let i = 0; i < count && indexPointer < availablePositions.length; i++) {
    group.push(availablePositions[indexPointer]);
    indexPointer++;
  }

  incorrectPositions.push(group);
});

  // ✅ flatten incorrect indexes
  const allIncorrectIndexes = incorrectPositions.flat()
  const allAssigned = new Set([...correctIndexes, ...allIncorrectIndexes]);

  if (allAssigned.size !== totalImages) {
  console.warn("⚠️ Some positions unassigned!", totalImages - allAssigned.size);
  } else {
  console.log("✅ All positions assigned:", allAssigned.size);
  }

  const correctImage = CORRECT_IMAGES[level];
  const incorrectList = INCORRECT_IMAGES[level] || [];

  // ✅ Random size options only for incorrect images
  const sizeOptions = [70, 80, 90];
  

  const newImages: GameImage[] = Array.from({ length: totalImages }, (_, i) => {
  const isCorrect = correctIndexes.has(i);
  let src: string;
  let size: number;

  if (isCorrect) {
    src = `${url}${correctImage}`;
    size = 75;
  } else {
    // find which group this position belongs to
    let groupIndex = incorrectPositions.findIndex((group) => group.includes(i));
    if (groupIndex === -1) groupIndex = 0; // fallback safety

    // assign image in order of group index (no randomness)
    const incorrectImg =
      incorrectList[groupIndex % incorrectList.length] || correctImage;

    src = `${url}${incorrectImg}`;
    size = sizeOptions[Math.floor(Math.random() * sizeOptions.length)];
  }

  return {
    id: i,
    top: positions[i].top,
    left: positions[i].left,
    clicked: false,
    src,
    isCorrect,
    size,
  } as GameImage & { size: number };
});

  setImages(newImages);
  setCorrect(0);
  setCount(0);
}, [level]);



  useEffect(() => {
    
    if (count >= (NUMBER_OF_CORRECT[level])) {
      setLevel((prev) => prev + 1);
      setCount(0);
    }
    if(level>=11){
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
        <div className="flex-1 bg-white rounded-xl shadow-lg p-6 w-full overflow-hidden relative">
          {images.map(({ id, top, left, src, clicked, size }) => (
            <img
              key={id}
              src={src}
              alt={`img-${id}`}
              onClick={() => handleClick(id)}
              className={`absolute cursor-pointer transition-all duration-200 ${
                clicked ? "opacity-30 scale-90" : "hover:scale-110"
              }`}
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${size}px`,
                height:'auto'
              }}
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