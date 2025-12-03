import { useContext } from "react";
import { AdminAuthContext } from "./adminAuthContextObject";

export const useAdminAuth = () => useContext(AdminAuthContext);
