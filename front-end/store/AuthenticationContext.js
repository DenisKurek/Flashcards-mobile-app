import React, { createContext, useState } from "react";
import axios from "axios";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, setState] = useState({
    loggedIn: false,
    user: null,
    //TODO replace localhost with your ip address (do not push it to github with your address)
    API_URL: "http://localhost:8080/api",
  });

  const login = async (user) => {
    try {
      const response = await axios.post(state.API_URL + "/users/login", {
        emailAddress: user.email,
        password: user.password,
      });
      setState({
        loggedIn: true,
        user,
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
