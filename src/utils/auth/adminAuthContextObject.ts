import { createContext } from "react";
import type { User } from "firebase/auth";

export interface AdminAuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
}

export const AdminAuthContext = createContext<AdminAuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
});
