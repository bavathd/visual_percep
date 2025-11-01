import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface GameImage {
    id:string,
    src: string;
    clicked: boolean;
    isCorrect: boolean;
}

const baseUrl = "https://assetsperception.s3.ap-south-1.amazonaws.com/assets/spatial";

const flashImage = [
  "/level1/objects/VD+TR+S.png",
  "/level1/shapes/VD+TR+S.png",
  "/level2/objects/VD+L1+S.png",
  "/level2/shapes/VD+L1+S.png",
  "/level3/objects/VD+L2+S.png",
  "/level3/shapes/VD+L2+S.png",
  "/level4/objects/VD+L3+S.png",
  "/level4/shapes/VD+L3+S.png",
  "/level5/objects/VD+L4+S.png",
  "/level5/shapes/VD+L4+S.png",
  "/level6/objects/VD+L5+S.png",
  "/level6/shapes/VD+L5+S.png"
];

const correctImage = [
  "/level1/objects/VD+TR+CR.png",
  "/level1/shapes/VD+TR+CR.png",
  "/level2/objects/VD+L1+CR.png",
  "/level2/shapes/VD+L1+CR.png",
  "/level3/objects/VD+L2+CR.png",
  "/level3/shapes/VD+L2+CR.png",
  "/level4/objects/VD+L3+CR.png",
  "/level4/shapes/VD+L3+CR.png",
  "/level5/objects/VD+L4+CR.png",
  "/level5/shapes/VD+L4+CR.png",
  "/level6/objects/VD+L5+CR.png",
  "/level6/shapes/VD+L5+CR.png"
];

const inCorrectImage = [
  [
    // Level 1
    [
      "/level1/objects/VD+TR+INC+1.png",
      "/level1/objects/VD+TR+INC+2.png",
      "/level1/objects/VD+TR+INC+3.png"
    ],
    [
      "/level1/shapes/VD+TR+INC+1.png",
      "/level1/shapes/VD+TR+INC+2.png",
      "/level1/shapes/VD+TR+INC+3.png"
    ]
  ],
  [
    // Level 2
    [
      "/level2/objects/VD+L1+INC+1.png",
      "/level2/objects/VD+L1+INC+2.png",
      "/level2/objects/VD+L1+INC+3.png"
    ],
    [
      "/level2/shapes/VD+L1+INC+1.png",
      "/level2/shapes/VD+L1+INC+2.png",
      "/level2/shapes/VD+L1+INC+3.png"
    ]
  ],
  [
    // Level 3
    [
      "/level3/objects/VD+L2+INC+1.png",
      "/level3/objects/VD+L2+INC+2.png",
      "/level3/objects/VD+L2+INC+3.png"
    ],
    [
      "/level3/shapes/VD+L2+INC+1.png",
      "/level3/shapes/VD+L2+INC+2.png",
      "/level3/shapes/VD+L2+INC+3.png"
    ]
  ],
  [
    // Level 4
    [
      "/level4/objects/VD+L3+INC+1.png",
      "/level4/objects/VD+L3+INC+2.png",
      "/level4/objects/VD+L3+INC+3.png"
    ],
    [
      "/level4/shapes/VD+L3+INC+1.png",
      "/level4/shapes/VD+L3+INC+2.png",
      "/level4/shapes/VD+L3+INC+3.png"
    ]
  ],
  [
    // Level 5
    [
      "/level5/objects/VD+L4+INC+1.png",
      "/level5/objects/VD+L4+INC+2.png",
      "/level5/objects/VD+L4+INC+3.png"
    ],
    [
      "/level5/shapes/VD+L4+INC+1.png",
      "/level5/shapes/VD+L4+INC+2.png",
      "/level5/shapes/VD+L4+INC+3.png"
    ]
  ],
  [
    // Level 6
    [
      "/level6/objects/VD+L5+INC+1.png",
      "/level6/objects/VD+L5+INC+2.png",
      "/level6/objects/VD+L5+INC+3.png"
    ],
    [
      "/level6/shapes/VD+L5+INC+1.png",
      "/level6/shapes/VD+L5+INC+2.png",
      "/level6/shapes/VD+L5+INC+3.png"
    ]
  ]
];

const VisualDiscrimination:React.FC=()=>{
    const [level, setLevel] = useState(0);
      const [images, setImages] = useState<GameImage[]>([]);
      const [correct, setCorrect] = useState<number>(0);
      const [showModal, setShowModal] = useState(false);
    
      const navigate = useNavigate();
    
      const generateOptions = () => {
        // Determine if current level is object or shape
        const levelGroup = Math.floor(level / 2);
        const isShape = level % 2 !== 0;
    
        const correctImg: GameImage = {
          id: "correct",
          src: baseUrl + correctImage[level],
          isCorrect: true,
          clicked: false
        };
    
        const incorrectList = isShape
          ? inCorrectImage[levelGroup][1]
          : inCorrectImage[levelGroup][0];
    
        const incorrects: GameImage[] = incorrectList.map((src, i) => ({
          id: `incorrect-${i}`,
          src: baseUrl + src,
          isCorrect: false,
          clicked: false
        }));
    
        const all = [correctImg, ...incorrects].sort(() => Math.random() - 0.5);
        setImages(all);
      };
    
      useEffect(() => {
        generateOptions();
      }, [level]);
    
      const handleClick = (id: string) => {
      setImages((prev) =>
        prev.map((img) => (img.id === id ? { ...img, clicked: true } : img))
      );
    
      const selected = images.find((img) => img.id === id);
      if (selected?.isCorrect) {
        setCorrect((prev) => prev + 1);
        console.log("✅ Correct clicked! Total correct:", correct + 1);
      } else {
        console.log("❌ Incorrect clicked!");
      }
    
      nextLevel();
    };
    
    const nextLevel = () => {
      if (level < flashImage.length - 1) {
        console.log("Moving to next level:", level + 1);
        setLevel((prev) => prev + 1);
        setShowModal(false);
      } else {
        console.log("Game Completed! Total Correct:", correct);
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
                Visual Figure Ground Test
                </div>
    
                <div className="text-lg font-bold text-white rounded-xl px-4 py-2">
                VPd1110
                </div>
            </div>
    
            {/* Game Container */}
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center w-full space-y-8">
                    {/* Flash Image (Top Row) */}
                    <div className="flex justify-center items-center w-full">
                        <img
                        src={baseUrl + flashImage[level]}
                        alt="Flash"
                        className="max-w-[30%] h-auto object-contain rounded shadow-xl"
                        />
                    </div>
    
                    {/* Options (Bottom Row) */}
                    <div className="grid grid-cols-4 gap-2 justify-items-center w-full">
                        {images.map(({ id, src, clicked }) => (
                        <div
                            key={id}
                            onClick={() => handleClick(id)}
                            className={`bg-white rounded-xl p-2 shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer ${
                            clicked ? "opacity-50" : ""
                            }`}
                        >
                            <img
                            src={src}
                            alt="Option"
                            className="w-100 h-100 object-contain rounded"
                            />
                        </div>
                        ))}
                    </div>
                </div>
            </div>
    
    
          {/* Completion Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
              <div className="bg-white dark:bg-gray-800 text-center rounded-xl shadow-2xl p-6 w-80 mx-4 transform transition-all duration-300">
                <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-white">
                  Visual Figure Ground Assessment
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Completed Successfully
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate("/home")}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg"
                  >
                    Next Assessment
                  </button>
                  <button
                    onClick={() => console.log("back")}
                    className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg"
                  >
                    Back to Profile
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
}
export default VisualDiscrimination;
