import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  photoUrl?: string;
  preferences: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string, photoUrl?: string) => Promise<void>;
  logout: () => void;
  updatePreferences: (preferences: string[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("umuvoUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate login - in real app, this would call an API
    const mockUser: User = {
      id: "1",
      username: email.split("@")[0],
      email,
      preferences: [],
    };
    setUser(mockUser);
    localStorage.setItem("umuvoUser", JSON.stringify(mockUser));
  };

  const signup = async (username: string, email: string, password: string, photoUrl?: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      photoUrl,
      preferences: [],
    };
    setUser(newUser);
    localStorage.setItem("umuvoUser", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("umuvoUser");
    localStorage.removeItem("likedSongs");
  };

  const updatePreferences = (preferences: string[]) => {
    if (user) {
      const updatedUser = { ...user, preferences };
      setUser(updatedUser);
      localStorage.setItem("umuvoUser", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updatePreferences }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
