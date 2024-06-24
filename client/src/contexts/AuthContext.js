import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ADMIN } from "../query/admin";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const { data } = useQuery(GET_ADMIN);
  useEffect(() => {
    if (data) {
      setCurrentAdmin(data.admin);
    }
  }, [data]);

  const login = (data) => {
    const { token, ...admin } = data;
    setCurrentAdmin(admin);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setCurrentAdmin(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ currentAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
