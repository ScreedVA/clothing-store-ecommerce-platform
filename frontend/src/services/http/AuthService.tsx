import { createContext, ReactNode, useEffect, useState } from "react";
import { API_BASE_DOMAIN } from "../CommonService";
import React from "react";
import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  getRefreshToken,
} from "../StorageService";
import { POSTRefreshTokenSchema, POSTRegisterRequestModel } from "../../models/AuthModels";

const API_BASE_URL: string = `${API_BASE_DOMAIN}/auth`;

// Http

async function POSTRefreshAccessToken(): Promise<Response> {
  const refreshToken: string | null = getRefreshToken();
  const requestBody: POSTRefreshTokenSchema = {
    refreshToken: refreshToken || "",
    tokenType: "bearer",
  };

  const response: Response = await fetch(`${API_BASE_URL}/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`Refresh token expired or invalid, Status: ${response.status}`);
  }

  const resData = await response.json();

  setAccessToken(resData.access_token);

  return response;
}

export async function handle401Exception(retryEndpoint: string, methodType: string, body?: any): Promise<any> {
  const refreshSuccess = await POSTRefreshAccessToken();

  if (refreshSuccess) {
    let accessToken = getAccessToken();
    let options: any = {
      method: methodType,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    if (methodType == "PUT" || methodType == "POST") {
      options.body = JSON.stringify(body);
      options.headers["Content-Type"] = "application/json";
    }

    let response: Response = await fetch(retryEndpoint, options);
    return response;
  } else {
    return null;
  }
}

export async function POSTLoginRequest(loginUserRequst: URLSearchParams): Promise<Response> {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: loginUserRequst.toString(),
  });

  if (!response.ok) {
    throw new Error("Response not okay");
  }

  return response;
}

export async function POSTRegisterRequest(createUserRequest: POSTRegisterRequestModel): Promise<Response> {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createUserRequest),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData || "Registration failed");
  }

  return response;
}

// Auth Context Methods

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
