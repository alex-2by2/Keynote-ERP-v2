// client/src/store/authStore.js

import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("accessToken")
  );

  const [user, setUser] = useState(() => {
    const value = localStorage.getItem("user");

    return value ? JSON.parse(value) : null;
  });

  const login = ({ accessToken, user }) => {
    localStorage.setItem(
      "accessToken",
      accessToken
    );

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    setToken(accessToken);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      login,
      logout,
      isAuthenticated: Boolean(token)
    }),
    [token, user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
}
