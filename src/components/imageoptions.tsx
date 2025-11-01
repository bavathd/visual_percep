import React from "react";

interface ImageOptionsProps {
  images: string[]; // 4 image URLs (1 correct + 3 incorrect)
  onSelect: (src: string) => void; // handle image click
}

const ImageOptions: React.FC<ImageOptionsProps> = ({ images, onSelect }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {images.map((img, index) => (
        <div
          key={index}
          className="cursor-pointer border-2 border-transparent hover:border-blue-500 rounded-xl p-2 transition-all"
          onClick={() => onSelect(img)}
        >
          <img
            src={img}
            alt={`option-${index}`}
            className="w-32 h-32 object-contain rounded-lg shadow-md"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageOptions;
