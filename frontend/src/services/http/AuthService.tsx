import { createContext, ReactNode, useEffect, useState } from "react";
import { API_BASE_DOMAIN } from "../CommonService";
import React from "react";
import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from "../StorageService";

const API_BASE_URL: string = `${API_BASE_DOMAIN}/auth`;

async function loginPOSTRequest() {}

// Auth Methods

interface AuthContextType {
  signedIn: boolean;
  login: (access_token: string, refresh_token: string) => void;
  logout: () => void;
}

const defaultContextValue: AuthContextType = {
  signedIn: false,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultContextValue);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    setSignedIn(!!token);
  }, []);

  const login = (access_token: string, refresh_token: string) => {
    setAccessToken(access_token);
    setRefreshToken(refresh_token);
    setSignedIn(true);
  };

  const logout = () => {
    removeAccessToken();
    removeRefreshToken();
    setSignedIn(false);
  };

  return <AuthContext.Provider value={{ signedIn, login, logout }}>{children}</AuthContext.Provider>;
};
