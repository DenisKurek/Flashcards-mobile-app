import React, { createContext, useState } from "react";
import axios from "axios";
import { API_URL } from "./Config";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, setState] = useState({
    loggedIn: false,
    user: null,
  });

  const login = async (user) => {
    try {
      const response = await axios.post(API_URL + "/users/login", {
        emailAddress: user.email,
        password: user.password,
      });
      setState({
        loggedIn: true,
        user: response.data,
      });
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setState({
      loggedIn: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
