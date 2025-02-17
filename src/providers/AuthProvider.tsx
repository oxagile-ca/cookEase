import React, { createContext, useContext, useState } from 'react';
import { router } from 'expo-router';

interface AuthContextType {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = async (email: string, password: string) => {
    try {
      // Add your authentication logic here
      // Example: const response = await authService.login(email, password);

      setIsAuthenticated(true);
      // Navigate to root path
      router.replace('/');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const signOut = () => {
    setIsAuthenticated(false);
    router.replace('/(auth)/login');
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
