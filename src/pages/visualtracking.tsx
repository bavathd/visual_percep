import React, { useEffect, useRef, useState } from "react";
import webgazer from "webgazer";

interface GazeData {
  x: number;
  y: number;
}

const EyeTrackingVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loopCount, setLoopCount] = useState(0);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    let initialized = false;

    const startWebGazer = async () => {
      try {
        await webgazer.setRegression("ridge").setGazeListener((data: GazeData | null) => {
          if (!data || !canvasRef.current) return;
          const ctx = canvasRef.current.getContext("2d");
          if (!ctx) return;

          const { x, y } = data;
          ctx.lineWidth = 2;
          ctx.strokeStyle = "rgba(255, 0, 0, 0.7)";
          ctx.lineCap = "round";
          ctx.lineTo(x, y);
          ctx.stroke();
        }).begin();

        initialized = true;
        setIsTracking(true);
      } catch (err) {
        console.warn("WebGazer initialization failed:", err);
      }
    };

    // wait for DOM & video to mount
    const timer = setTimeout(startWebGazer, 800);

    return () => {
      clearTimeout(timer);
      if (initialized && webgazer?.end) {
        try {
          webgazer.end();
        } catch (e) {
          console.warn("WebGazer end safely ignored:", e);
        }
      }
      setIsTracking(false);
    };
  }, []);

  // Resize canvas to video
  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current && videoRef.current) {
        canvasRef.current.width = videoRef.current.clientWidth;
        canvasRef.current.height = videoRef.current.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // Handle looping 3 times
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setLoopCount((prev) => {
        const newCount = prev + 1;
        if (newCount < 3) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
        return newCount;
      });
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  // Save PNG
  const handleSave = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "gaze_path.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  // Clear drawing
  const handleClear = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4">
      <div className="relative">
        <video
          ref={videoRef}
          src="/1.mp4"
          width="800"
          height="450"
          className="rounded-lg border border-gray-400"
          onCanPlay={() => videoRef.current?.play()}
          muted
        ></video>

        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 pointer-events-none"
          style={{ width: "800px", height: "450px" }}
        ></canvas>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
        >
          Clear Lines
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Save PNG
        </button>
      </div>

      <p className="text-gray-700 text-sm">
        {isTracking ? "👁️ Tracking Active" : "🛑 Tracking Stopped"} | Loops:{" "}
        {loopCount}/3
      </p>
    </div>
  );
};

export default EyeTrackingVideo;
