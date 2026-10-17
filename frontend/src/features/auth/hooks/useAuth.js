import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/** Access to the current session: { user, token, login, logout }. */
export function useAuth() {
  return useContext(AuthContext);
}
