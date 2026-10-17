import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

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

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  
  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decoded = decodeJwtPayload(storedToken);
      const userPayload = decoded?.user;
      if (userPayload?.id && userPayload?.role) {
        return {
          id: userPayload.id,
          role: userPayload.role,
          name: userPayload.name,
          email: userPayload.email,
        };
      } else {
        localStorage.removeItem("token");
      }
    }
    return null;
  });

  useEffect(() => {
    if (!token) {
      setUser(null);
    }
  }, [token]);

  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
