import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const OrdersContext = createContext();
const STORAGE_KEY = "@moriza:orders";

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Carrega os pedidos salvos no dispositivo ao iniciar o app
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setOrders(JSON.parse(stored));
      } catch (e) {
        console.warn("Falha ao carregar os pedidos:", e);
      } finally {
        setHydrated(true);
      }
    })();
  }, []);

  // Persiste os pedidos sempre que mudarem (apenas após a carga inicial)
  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(orders)).catch((e) =>
      console.warn("Falha ao salvar os pedidos:", e)
    );
  }, [orders, hydrated]);

  // Adiciona um novo pedido no topo da lista (mais recente primeiro)
  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const ordersCount = orders.length;

  return (
    <OrdersContext.Provider value={{ orders, addOrder, ordersCount }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrdersContext);
}
