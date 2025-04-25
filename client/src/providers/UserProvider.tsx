"use client";

import { IUser } from "@/interfaces/IUser";
import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  currentUser: IUser | null;
  setCurrentUser: (user: IUser | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: IUser | null;
}) {
  const [currentUser, setCurrentUser] = useState<IUser | null>(initialUser);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
