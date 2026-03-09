// /context/BottomNavContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type BottomNavContextType = {
  isVisible: boolean;
  showNav: () => void;
  hideNav: () => void;
};

const BottomNavContext = createContext<BottomNavContextType | undefined>(
  undefined,
);

export const BottomNavProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(true);

  const showNav = () => setIsVisible(true);
  const hideNav = () => setIsVisible(false);

  return (
    <BottomNavContext.Provider value={{ isVisible, showNav, hideNav }}>
      {children}
    </BottomNavContext.Provider>
  );
};

export const useBottomNav = () => {
  const context = useContext(BottomNavContext);
  if (!context)
    throw new Error("useBottomNav must be used within BottomNavProvider");
  return context;
};
