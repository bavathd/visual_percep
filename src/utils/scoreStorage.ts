// ✅ Save a score with timestamp
export const saveScore = (
  username: string,
  gameName: string,
  level: number,
  score: number,
  timestamp: number,
) => {
  const key = `scores_${username}_${gameName}`;
  const existing = JSON.parse(localStorage.getItem(key) || "{}");

  existing[`Level ${level}`] = {
    score,
    timestamp,
  };

  localStorage.setItem(key, JSON.stringify(existing));
  console.log(
    `✅ Saved ${username}'s ${gameName} - Level ${level}: ${score} at ${new Date().toLocaleString()}`
  );
};

// ✅ Get all level scores for a specific user and game
export const getAllGameScores = (username: string, gameName: string) => {
  const key = `scores_${username}_${gameName}`;
  const scores = JSON.parse(localStorage.getItem(key) || "{}");
  return scores;
};

// ✅ Get all games and levels for a specific user
export const getAllUserScores = (username: string) => {
  const allKeys = Object.keys(localStorage);
  const userGameScores: Record<string, unknown> = {};

  allKeys.forEach((key) => {
    if (key.startsWith(`scores_${username}_`)) {
      const gameName = key.replace(`scores_${username}_`, "");
      userGameScores[gameName] = JSON.parse(localStorage.getItem(key) || "{}");
    }
  });

  return userGameScores;
};

// ✅ Clear all scores for a user
export const clearAllScores = (username: string) => {
  const allKeys = Object.keys(localStorage);
  allKeys.forEach((key) => {
    if (key.startsWith(`scores_${username}_`)) {
      localStorage.removeItem(key);
    }
  });
  console.log(`🧹 Cleared all scores for ${username}`);
};
