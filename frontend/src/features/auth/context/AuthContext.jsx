import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

/** Holds the superadmin's own token while they are viewing an admin's dashboard. */
const SUPER_TOKEN_KEY = "superToken";

const decodeJwtPayload = (token) => {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(normalized);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
};

const userFromToken = (token) => {
  if (!token) return null;
  const userPayload = decodeJwtPayload(token)?.user;
  if (!userPayload?.id || !userPayload?.role) return null;
  return {
    id: userPayload.id,
    role: userPayload.role,
    name: userPayload.name,
    email: userPayload.email,
    impersonatedBy: userPayload.impersonatedBy || null,
  };
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return null;
    const storedUser = userFromToken(storedToken);
    if (!storedUser) {
      localStorage.removeItem("token");
      return null;
    }
    return storedUser;
  });

  const [isImpersonating, setIsImpersonating] = useState(
    () => !!localStorage.getItem(SUPER_TOKEN_KEY),
  );

  useEffect(() => {
    if (!token) {
      setUser(null);
    }
  }, [token]);

  const login = (newToken, userData) => {
    localStorage.removeItem(SUPER_TOKEN_KEY);
    localStorage.setItem("token", newToken);
    setIsImpersonating(false);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem(SUPER_TOKEN_KEY);
    setIsImpersonating(false);
    setToken(null);
    setUser(null);
  };

  /** Swaps in an admin's token, parking the superadmin's own token for later. */
  const startImpersonation = (adminToken, adminUser) => {
    const currentToken = localStorage.getItem("token");
    if (currentToken) {
      localStorage.setItem(SUPER_TOKEN_KEY, currentToken);
    }
    localStorage.setItem("token", adminToken);
    setIsImpersonating(true);
    setToken(adminToken);
    setUser(adminUser || userFromToken(adminToken));
  };

  /** Restores the superadmin session. Returns false when there is nothing to restore. */
  const stopImpersonation = () => {
    const superToken = localStorage.getItem(SUPER_TOKEN_KEY);
    if (!superToken) return false;
    localStorage.setItem("token", superToken);
    localStorage.removeItem(SUPER_TOKEN_KEY);
    setIsImpersonating(false);
    setToken(superToken);
    setUser(userFromToken(superToken));
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isImpersonating,
        startImpersonation,
        stopImpersonation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
