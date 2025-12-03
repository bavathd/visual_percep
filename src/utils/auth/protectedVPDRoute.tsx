import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedVPDRoute = ({ children }: { children: ReactNode }) => {
  const regId = localStorage.getItem("CURRENT_VPD_ID");

  if (!regId) {
    return <Navigate to="/welcome" replace />;
  }

  return children;
};

export default ProtectedVPDRoute;
