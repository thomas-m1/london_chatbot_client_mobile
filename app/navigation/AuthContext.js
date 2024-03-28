import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = () => setIsAuthenticated(true);
  const signOut = () => setIsAuthenticated(false);
  const continueWithoutSigningIn = () => setIsAuthenticated(true); // Treat as authenticated for navigation purposes

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, signIn, signOut, continueWithoutSigningIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
