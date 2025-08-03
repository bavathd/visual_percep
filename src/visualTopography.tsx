import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface GameImage {
    id:string,
    src: string;
    clicked: boolean;
    isCorrect: boolean;
}
const baseUrl = "https://visualperceptiondomain.s3.ap-south-1.amazonaws.com/game-assets/topography"
const flashImage = ["/level1/TOP+TR+S.png",
                    "/level2/TOP+L1+S.png", 
                    "/level3/TOP+L2+S.png", 
                    "/level4/TOP+L3+S.png", 
                    "/level5/TOP+L4+S.png", 
                    "/level6/TOP+L5+S.png" ];

const correctImage = [["/level1/TOP+TR+CR.png"],
                      ["/level2/TOP+L1+CR.png"],
                      ["/level3/TOP+L2+CR.png"], 
                      ["/level4/TOP+L3+CR.png"], 
                      ["/level5/TOP+L4+CR.png"], 
                      ["/level6/TOP+L5+CR.png"] 
                    ];

const inCorrectImage = [[
                            "/level1/TOP+TR+INC+1.png", 
                            "/level1/TOP+TR+INC+2.png",
                        ],
                        [
                            "/level2/TOP+L1+INC+1.png", 
                            "/level2/TOP+L1+INC+2.png",
                           
                        ],
                        [
                            "/level3/TOP+L2+INC+1.png",
                            "/level3/TOP+L2+INC+2.png",
                            
                        ], 
                        [
                            "/level4/TOP+L3+INC+1.png",
                            "/level4/TOP+L3+INC+2.png",
                            "/level4/TOP+L3+INC+3.png",
                            
                        ],
                        [
                         "/level5/TOP+L4+INC+1.png",
                         "/level5/TOP+L4+INC+2.png", 
                         "/level5/TOP+L4+INC+3.png", 
                        ],
                        [                            
                            "/level6/TOP+L5+INC+1.png",
                            "/level6/TOP+L5+INC+2.png",
                            "/level6/TOP+L5+INC+3.png",
                            "/level6/TOP+L5+INC+4.png",
                        ],
                        ];

const Topography:React.FC=()=>{
    const [level, setLevel] = useState(0);
       const [showFlash, setShowFlash] = useState(true);
       const [images, setImages] = useState<GameImage[]>([]);
       const [correct, setCorrect] = useState<number>(0);
       const [count, setCount] = useState<number>(0);
       const [showModal, setShowModal] = useState(false);
   
       const navigate = useNavigate();
       const preloadImage = (src: string): Promise<void> =>
           new Promise((resolve) => {
           const img = new Image();
           img.src = src;
           img.onload = () => resolve();
           });
   
       const generateOptions = () => {
           const correctList = correctImage[level] || [];
           const correct: GameImage[] = correctList.map((src, i) => ({
           id: `correct-${i}`,
           src: baseUrl + src,
           isCorrect: false,
           clicked: false,
           }));
   
           const incorrectList = inCorrectImage[level] || [];
           const incorrects: GameImage[] = incorrectList.map((src, i) => ({
           id: `incorrect-${i}`,
           src: baseUrl + src,
           isCorrect: false,
           clicked: false,
           }));
   
           const all = [...correct, ...incorrects].sort(() => Math.random() - 0.5);
           setImages(all);
       };
   
       useEffect(() => {
           preloadImage(baseUrl + flashImage[level]).then(() => {
           setShowFlash(true);
           generateOptions();
           });
       }, [level]);
   
      const handleClick = (id: string) => {
            setImages((prev) =>
                prev.map((img) => (img.id === id ? { ...img, clicked: true } : img))
            );

            const selected = images.find((img) => img.id === id);
            if (selected && !selected.clicked) {
                setCount((prev) => prev + 1);
                if (selected.isCorrect) setCorrect((prev) => prev + 1);
            }

            if (count + 1 >= correctImage[level].length) nextLevel();
            console.log("count", count+1)
        };

   
       const nextLevel = () => {
           if (level < flashImage.length - 1) {
           setLevel(level + 1);
           setShowFlash(true);
           setShowModal(false);
           setCount(0);
           console.log(correct);
           } else {
               setShowModal(true);
           }
       };
       const gridCols = images.length <= 2 ? "grid-cols-2"
               : images.length <= 4 ? "grid-cols-2 md:grid-cols-4"
               : images.length <= 6 ? "grid-cols-3 md:grid-cols-4"
               : "grid-cols-4";
       
       return (
           <div className="w-screen h-screen bg-gradient-to-t from-white to-blue-500 dark:from-blue-900 dark:to-gray-900 flex flex-col p-4">
           {/* Header */}
           <div className="flex justify-between items-center mb-4">
             <button className="text-blue-700 dark:text-blue-300 hover:bg-amber-50 font-semibold bg-amber-300 rounded-2xl px-4 py-2 shadow">
               ← Back
             </button>
   
             <div className="text-lg font-bold text-white bg-blue-600 rounded-xl px-4 py-2">
              Topography Visual Spatial Relation Test
             </div>
   
             <div className="text-lg font-bold text-white rounded-xl px-4 py-2">
               VPd1110
             </div>
           </div>
   
   
           {/* Game Container */}
           <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full overflow-hidden relative">
               {showFlash && (
                   <div className="w-full flex justify-center items-center">
                   <img
                       src={baseUrl + flashImage[level]}
                       alt="Flash"
                       className="w-[500px] h-auto object-contain rounded shadow-xl"
                   />
                   </div>
               )}
   
               {/* Option Images */}
                   <div className={`grid ${gridCols} gap-4 w-full mt-6 justify-center items-center`}>
                   {images.map(({ id, src, clicked }) => (
                       <div
                       key={id}
                       onClick={() => handleClick(id)}
                       className={`bg-white max-w-[50%] rounded-xl p-2 shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer ${
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
               {showModal && (
               <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
               <div className="bg-white dark:bg-gray-800 text-center rounded-xl shadow-2xl p-6 w-80 mx-4 transform transition-all duration-300">
                   <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-white">
                   Topography Visual Spatial Relation Assessment
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
export default Topography;
