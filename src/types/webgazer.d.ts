declare module "webgazer" {
  export interface GazeData {
    x: number;
    y: number;
    timestamp?: number;
  }

  export interface WebGazer {
    setRegression(model: string): WebGazer;
    setTracker(model: string): WebGazer;
    begin(): Promise<void>;
    pause(): void;
    end(): void;
    clearData(): void;
    showVideo(show: boolean): void;
    showFaceOverlay(show: boolean): void;
    showPredictionPoints?(show: boolean): void;
    setGazeListener(callback: (data: GazeData | null, elapsedTime: number) => void): WebGazer;
    
    // ✅ Add this for calibration points
    recordScreenPosition?(x: number, y: number, type?: string): void;
  }

  const webgazer: WebGazer;
  export default webgazer;
}
