import {
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebasesdk"; // adjust based on your folder

export async function adminLogin(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const user = credential.user;

  const ref = doc(db, "admins", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists() || snap.data()?.role !== "admin") {
    await signOut(auth);
    throw new Error("Access denied: Not an admin");
  }

  return user;
}

export function adminLogout() {
  return signOut(auth);
}
