import { useState, useEffect, type ReactNode } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../firebasesdk";
import { AdminAuthContext } from "./adminAuthContextObject";

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const snap = await getDoc(doc(db, "admins", currentUser.uid));
        setIsAdmin(snap.exists() && snap.data()?.role === "admin");
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <AdminAuthContext.Provider value={{ user, loading, isAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
