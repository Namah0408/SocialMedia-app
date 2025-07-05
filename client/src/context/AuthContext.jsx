import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // NEW ✅

  const fetchUser = async () => {
    if (token) {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data); // ✅ Set the actual user
      } catch (err) {
        console.error("Failed to fetch user", err);
        logout();
      }
    }
    setLoading(false); // ✅ Done loading
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
