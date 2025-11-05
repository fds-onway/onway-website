import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AuthResponse } from '../types/auth';
import {
  login as apiLogin,
  setToken,
  getToken,
  logout as apiLogout,
} from '../services/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getToken());

  useEffect(() => {
    setIsAuthenticated(!!getToken());
  }, []);

  const login = async (email: string, password: string) => {
  const data: AuthResponse = await apiLogin(email, password);
    if (data.accessToken) {
      setToken(data.accessToken);
      setIsAuthenticated(true);
    } else {
      throw new Error('Token de acesso não encontrado.');
    }
  };

  const logout = () => {
    apiLogout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
