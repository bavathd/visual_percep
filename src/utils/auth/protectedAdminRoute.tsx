import { Navigate } from "react-router-dom";
import { useAdminAuth } from "./useAdminAuth";
import type { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { loading, user, isAdmin } = useAdminAuth();

  if (loading) return <div>Loading...</div>;
  if (!user || !isAdmin) return <Navigate to="/admin-login" replace />;

  return children;
}
