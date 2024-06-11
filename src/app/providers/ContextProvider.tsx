"use client";

import { useState, createContext, useContext, ReactNode } from "react";

type CartContextType = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [opened, setOpened] = useState(false);

  return (
    <CartContext.Provider value={{ opened, setOpened }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
