import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface GameImage {
    id:number,
    src: string;
    clicked: boolean;
    isCorrect: boolean;
}
// const baseUrl = "https://visualperceptiondomain.s3.ap-south-1.amazonaws.com/game-assets/visualMemory"
const baseUrl = "https://assetsperception.s3.ap-south-1.amazonaws.com/assets/visualMemory";

const flashImage = [
  "/level1/objects/VM+TR+CR.png",
  "/level1/shapes/VM+TR+CR.png",
  "/level2/objects/VM+L1+CR.png",
  "/level2/shapes/VM+L1+CR.png",
  "/level3/objects/VM+L2+CR.png",
  "/level3/shapes/VM+L2+CR.png",
  "/level4/objects/VM+L3+CR.png",
  "/level4/shapes/VM+L3+CR.png",
  "/level5/objects/VM+L4+CR.png",
  "/level5/shapes/VM+L4+CR.png",
  "/level6/objects/VM+L5+CR.png",
  "/level6/shapes/VM+L5+CR.png",
];

// Correct answer for each level
const correctImage = [
  "/level1/objects/VM+TR+CR.png",
  "/level1/shapes/VM+TR+CR.png",
  "/level2/objects/VM+L1+CR.png",
  "/level2/shapes/VM+L1+CR.png",
  "/level3/objects/VM+L2+CR.png",
  "/level3/shapes/VM+L2+CR.png",
  "/level4/objects/VM+L3+CR.png",
  "/level4/shapes/VM+L3+CR.png",
  "/level5/objects/VM+L4+CR.png",
  "/level5/shapes/VM+L4+CR.png",
  "/level6/objects/VM+L5+CR.png",
  "/level6/shapes/VM+L5+CR.png",
];

// Incorrect options per level (3–4 per level)
const inCorrectImage = [
  // Level 1 - Objects
  [
    "/level1/objects/VM+TR+INC+1.png",
    "/level1/objects/VM+TR+INC+2.png",
    "/level1/objects/VM+TR+INC+3.png",
  ],
  // Level 1 - Shapes
  [
    "/level1/shapes/VM+TR+INC+1.png",
    "/level1/shapes/VM+TR+INC+2.png",
    "/level1/shapes/VM+TR+INC+3.png",
  ],
  [
    "/level2/objects/VM+L1+INC+1.png",
    "/level2/objects/VM+L1+INC+2.png",
    "/level2/objects/VM+L1+INC+3.png",
  ],
  // Level 2 - Shapes
  [
    "/level2/shapes/VM+L1+INC+1.png",
    "/level2/shapes/VM+L1+INC+2.png",
    "/level2/shapes/VM+L1+INC+3.png",
  ],
  // Level 2 - Objects
  [
    "/level3/objects/VM+L2+INC+1.png",
    "/level3/objects/VM+L2+INC+2.png",
    "/level3/objects/VM+L2+INC+3.png",
  ],
  // Level 2 - Shapes
  [
    "/level3/shapes/VM+L2+INC+1.png",
    "/level3/shapes/VM+L2+INC+2.png",
    "/level3/shapes/VM+L2+INC+3.png",
  ],
  // Level 3 - Objects
  [
    "/level4/objects/VM+L3+INC+1.png",
    "/level4/objects/VM+L3+INC+2.png",
    "/level4/objects/VM+L3+INC+3.png",
  ],
  // Level 3 - Shapes
  [
    "/level4/shapes/VM+L3+INC+1.png",
    "/level4/shapes/VM+L3+INC+2.png",
    "/level4/shapes/VM+L3+INC+3.png",
  ],
  // Level 4 - Objects
  [
    "/level5/objects/VM+L4+INC+1.png",
    "/level5/objects/VM+L4+INC+2.png",
    "/level5/objects/VM+L4+INC+3.png",
  ],
  // Level 4 - Shapes
  [
    "/level5/shapes/VM+L4+INC+1.png",
    "/level5/shapes/VM+L4+INC+2.png",
    "/level5/shapes/VM+L4+INC+3.png",
  ],
  // Level 5 - Objects
  [
    "/level6/objects/VM+L5+INC+1.png",
    "/level6/objects/VM+L5+INC+2.png",
    "/level6/objects/VM+L5+INC+3.png",
  ],
  // Level 5 - Shapes
  [
    "/level6/shapes/VM+L5+INC+1.png",
    "/level6/shapes/VM+L5+INC+2.png",
    "/level6/shapes/VM+L5+INC+3.png",
  ],
];

const VisualMemory:React.FC = () => {
    const [level, setLevel] = useState(0);
    const [showFlash, setShowFlash] = useState(true);
    const [images, setImages] = useState<GameImage[]>([]);
    const [correct, setCorrect] = useState<number>(0);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();
    const preloadImage = (src: string): Promise<void> =>
        new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
        });

const generateOptions = () => {
    const correct: GameImage = {
      id: 0,
      src: baseUrl + correctImage[level],
      isCorrect: true,
      clicked: false,
    };

    const incorrectList = inCorrectImage[level] || [];
    const shuffledIncorrect = incorrectList.sort(() => Math.random() - 0.5).slice(0, 3);
    const incorrects: GameImage[] = shuffledIncorrect.map((src, i) => ({
      id: i + 1,
      src: baseUrl + src,
      isCorrect: false,
      clicked: false,
    }));

    // Combine and shuffle all options
    const allOptions = [correct, ...incorrects].sort(() => Math.random() - 0.5);
    setImages(allOptions);
  };

  // Load flash image and transition to options

    useEffect(() => {
        preloadImage(baseUrl + flashImage[level]).then(() => {
        setShowFlash(true);
        setTimeout(() => {
            setShowFlash(false);
            generateOptions();
        }, 3000);
        });
    }, [level]);

    const handleClick = (id: number) => {
        setImages((prev) =>
        prev.map((img) =>
            img.id === id ? { ...img, clicked: true } : img
        )
        );

        const selected = images.find((img) => img.id === id);
        if (selected?.isCorrect) {
            setCorrect(1);
        }
        nextLevel();
    };

    const nextLevel = () => {
        if (level < flashImage.length - 1) {
        setLevel(level + 1);
        setShowFlash(true);
        setShowModal(false);
        console.log(correct);
        } else {
            setShowModal(true);
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
            {showFlash && (
                <div className="w-full flex justify-center items-center mb-6">
                <img
                    src={baseUrl + flashImage[level]}
                    alt="Flash"
                    className="max-w-[60%] h-auto object-contain rounded shadow-xl"
                />
                </div>
            )}

            {/* Option Images */}
            {!showFlash && (
                <div className="w-full flex justify-center items-center mb-6">
                <div className="grid grid-cols-4 md:grid-cols-4 gap-1 w-full mt-[15%] justify-between items-center">
                {images.map(({ id, src, clicked }) => (
                    <div
                    key={id}
                    onClick={() => handleClick(id)}
                    className={`bg-white max-w-[60%] rounded-xl p-2 shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer ${
                        clicked ? "opacity-50" : ""
                    }`}
                    >
                    <img
                        src={src}
                        alt="Option"
                        className="w-full h-auto object-contain rounded"
                    />
                    </div>
                ))}
                    </div>
                </div>
                )}
            </div>
            {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 text-center rounded-xl shadow-2xl p-6 w-80 mx-4 transform transition-all duration-300">
                <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-white">
                Visual Memory Assessment
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                Completed Successfully
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
    )
}

export default VisualMemory;