import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const data = sessionStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      return {
        token: parseData.token,
        name: parseData.name,
        email: parseData.email,
        role: parseData.role,
        _id: parseData._id,
      };
    } else {
      return {
        token: "",
        name: null,
        email: null,
        role: null,
        _id: null,
      };
    }
  });
  
  useEffect(() => {
    sessionStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  // useEffect(() => {
  //   // Check sessionStorage when the component mounts and update auth state
  //   const data = sessionStorage.getItem("auth");
  //   if (data) {
  //     const parseData = JSON.parse(data);
  //     setAuth({
  //       token: parseData.token,
  //       name: parseData.name,
  //       email: parseData.email,
  //       role: parseData.role,
  //       _id: parseData._id,
  //     });
  //   }
  // }, [auth]);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}
