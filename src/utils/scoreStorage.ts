import { db } from "../utils/firebasesdk";
import { doc, setDoc, getDoc,collection, getDocs } from "firebase/firestore";

// Generate today's date as YYYY-MM-DD
const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

/**
 * ✅ Save score to Firestore
 * Path:
 * scores → VPDxxx → YYYY-MM-DD → gameName → "Level X"
 */
export const saveScore = async (
  vpdId: string,
  gameName: string,
  level: number,
  score: number,
  durationMs: number,
) => {
  const date = getTodayDate();
  const durationSec = Math.round(durationMs / 1000);
  const scoreRef = doc(db, "scores", vpdId, date, gameName);

  try {
    await setDoc(
      scoreRef,
      {
        [`Level ${level}`]: {
          score,
          timestamp: durationSec,
        },
      },
      { merge: true }
    );

    console.log(`🔥 Saved score for ${vpdId} → ${date} → ${gameName} → Level ${level}`);
  } catch (err) {
    console.error("❌ Error saving score:", err);
  }
};

/**
 * ✅ Get all scores for a specific user on a specific date
 */
export const getScoresByDate = async (vpdId: string, date: string) => {
  try {
    // ✔ VALID path: collection(scores → vpd → date)
    const dateCollectionRef = collection(db, "scores", vpdId, date);

    const snapshot = await getDocs(dateCollectionRef);

    const result: Record<string, unknown> = {};

    snapshot.forEach((doc) => {
      result[doc.id] = doc.data(); // gameName → levels
    });

    return result;
  } catch (err) {
    console.error("❌ Error getting scores:", err);
    return {};
  }
};
/**
 * ✅ Get all scores for a user (all dates, all games)
 */
export const getAllUserScores = async (vpdId: string) => {
  const userRef = doc(db, "scores", vpdId);

  try {
    const snapshot = await getDoc(userRef);
    return snapshot.exists() ? snapshot.data() : {};
  } catch (err) {
    console.error("❌ Error fetching all user scores:", err);
    return {};
  }
};

/**
 * ❗ Optional: Clear all scores for a user
 */
export const clearAllScores = async (vpdId: string) => {
  try {
    await setDoc(doc(db, "scores", vpdId), {});
    console.log(`🧹 Cleared all scores for ${vpdId}`);
  } catch (err) {
    console.error("❌ Error clearing scores:", err);
  }
};
