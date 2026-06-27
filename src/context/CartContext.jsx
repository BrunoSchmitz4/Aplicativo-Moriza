import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();
const STORAGE_KEY = "@moriza:cart";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Carrega o carrinho salvo no dispositivo ao iniciar o app
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setCart(JSON.parse(stored));
      } catch (e) {
        console.warn("Falha ao carregar o carrinho:", e);
      } finally {
        setHydrated(true);
      }
    })();
  }, []);

  // Persiste o carrinho sempre que ele mudar (apenas após a carga inicial)
  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cart)).catch((e) =>
      console.warn("Falha ao salvar o carrinho:", e)
    );
  }, [cart, hydrated]);

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