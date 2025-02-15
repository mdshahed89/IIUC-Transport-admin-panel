"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    if (typeof window !== "undefined") {
      const savedUserData = sessionStorage.getItem("userData");
      return savedUserData ? JSON.parse(savedUserData) : {};
    }
    return {};
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  const logout = () => {
    setUserData({});
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("token");
  };

  return (
    <DataContext.Provider value={{ userData, setUserData, logout }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
