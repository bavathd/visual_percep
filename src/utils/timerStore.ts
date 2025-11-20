// src/utils/timerStore.ts
let levelStartTime: number | null = null;
let levelEndTime: number | null = null;

// 🕒 Start timer
export const startLevelTimer = () => {
  levelStartTime = Date.now();
};

// 🕒 End timer
export const stopLevelTimer = () => {
  levelEndTime = Date.now();
  return getLevelDuration();
};

// ⏱️ Calculate difference
export const getLevelDuration = () => {
  if (levelStartTime && levelEndTime) {
    return levelEndTime - levelStartTime; // milliseconds
  }
  return 0;
};

// 🔁 Reset timer
export const resetLevelTimer = () => {
  levelStartTime = null;
  levelEndTime = null;
};
