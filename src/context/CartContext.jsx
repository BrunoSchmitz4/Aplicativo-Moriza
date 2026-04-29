import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, size) => {
    const cartKey = `${product.id}-${size}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.cartKey === cartKey);
      if (existing) {
        return prev.map((i) =>
          i.cartKey === cartKey ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, selectedSize: size, cartKey, quantity: 1 }];
    });
  };

  const updateQuantity = (cartKey, qty) => {
    if (qty <= 0) {
      removeItem(cartKey);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.cartKey === cartKey ? { ...i, quantity: qty } : i))
    );
  };

  const removeItem = (cartKey) => {
    setCart((prev) => prev.filter((i) => i.cartKey !== cartKey));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeItem, clearCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}