import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebasesdk";

export async function adminSignup(email: string, password: string) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCred.user;

  // Mark as admin in Firestore
  await setDoc(doc(db, "admins", user.uid), {
    role: "admin",
    email,
    createdAt: new Date(),
  });

  return user;
}
