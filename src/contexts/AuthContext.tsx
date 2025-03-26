"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types";
// import { users } from "@/lib/mock-data";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  // Mock login function (replace with real API call in production)
// (email: string, password: string)
  const login = async ()  => {
    // setIsLoading(true);
    // setError(null);
    
    // try {
    //   // Simulate API delay
    //   await new Promise(resolve => setTimeout(resolve, 1000));
      
    //   // Find user in the mock data
    //   const foundUser = users.find(u => u.email === email);
      
    //   if (foundUser) {
    //     // In a real app, we would validate the password here
    //     setUser(foundUser);
    //     localStorage.setItem("user", JSON.stringify(foundUser));
    //     toast.success(`Welcome back, ${foundUser.name}!`);
    //   } else {
    //     throw new Error("Invalid email or password");
    //   }
    // } catch (error) {
    //   if (error instanceof Error) {
    //     setError(error.message);
    //     toast.error(error.message);
    //   } else {
    //     setError("An unknown error occurred");
    //     toast.error("An unknown error occurred");
    //   }
    // } finally {
    //   setIsLoading(false);
    // }
  };

  // Mock register function (replace with real API call in production)
//   (name: string, email: string, password: string)
  const register = async () => {
    // setIsLoading(true);
    // setError(null);
    
    // try {
    //   // Simulate API delay
    //   await new Promise(resolve => setTimeout(resolve, 1000));
      
    //   // Check if email already exists
    //   const emailExists = users.some(u => u.email === email);
      
    //   if (emailExists) {
    //     throw new Error("Email already in use");
    //   }
      
    //   // Create new user
    //   const newUser: User = {
    //     id: `user-${Date.now()}`,
    //     name,
    //     email,
    //     role: "user",
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   };
      
    //   // In a real app, we would save the user to a database
    //   // For this mock, we're just setting the user in state
    //   setUser(newUser);
    //   localStorage.setItem("user", JSON.stringify(newUser));
    //   toast.success("Registration successful!");
    // } catch (error) {
    //   if (error instanceof Error) {
    //     setError(error.message);
    //     toast.error(error.message);
    //   } else {
    //     setError("An unknown error occurred");
    //     toast.error("An unknown error occurred");
    //   }
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
  };

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        register,
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}