// Versão NATIVA (Android/iOS): persiste os pedidos em um banco SQLite.
// Na Web, o Metro usa OrdersContext.web.jsx (AsyncStorage), pois o
// expo-sqlite não roda no navegador sem configuração extra de WASM.
import * as SQLite from "expo-sqlite";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const OrdersContext = createContext();
const DB_NAME = "moriza.db";

// Cria as tabelas (uma vez) caso ainda não existam
async function initDatabase(db) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS orders (
      number     TEXT PRIMARY KEY NOT NULL,
      createdAt  TEXT NOT NULL,
      status     TEXT NOT NULL,
      total      REAL NOT NULL,
      name       TEXT NOT NULL,
      address    TEXT NOT NULL,
      payment    TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      orderNumber  TEXT NOT NULL,
      cartKey      TEXT NOT NULL,
      name         TEXT NOT NULL,
      price        REAL NOT NULL,
      selectedSize TEXT,
      quantity     INTEGER NOT NULL,
      FOREIGN KEY (orderNumber) REFERENCES orders (number) ON DELETE CASCADE
    );
  `);
}

// Lê todos os pedidos do banco, com seus itens, mais recentes primeiro
async function loadOrders(db) {
  const orderRows = await db.getAllAsync(
    "SELECT * FROM orders ORDER BY createdAt DESC"
  );

  const result = [];
  for (const order of orderRows) {
    const items = await db.getAllAsync(
      "SELECT cartKey, name, price, selectedSize, quantity FROM order_items WHERE orderNumber = ?",
      [order.number]
    );
    result.push({ ...order, items });
  }
  return result;
}

export function OrdersProvider({ children }) {
  const [db, setDb] = useState(null);
  const [orders, setOrders] = useState([]);

  // Abre o banco, garante as tabelas e carrega os pedidos ao iniciar
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const database = await SQLite.openDatabaseAsync(DB_NAME);
        await initDatabase(database);
        const loaded = await loadOrders(database);
        if (active) {
          setDb(database);
          setOrders(loaded);
        }
      } catch (e) {
        console.warn("Falha ao iniciar o banco de pedidos:", e);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Insere um pedido e seus itens em uma transação e atualiza a tela
  const addOrder = async (order) => {
    if (!db) return;
    try {
      await db.withTransactionAsync(async () => {
        await db.runAsync(
          "INSERT INTO orders (number, createdAt, status, total, name, address, payment) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            order.number,
            order.createdAt,
            order.status,
            order.total,
            order.name,
            order.address,
            order.payment,
          ]
        );
        for (const item of order.items) {
          await db.runAsync(
            "INSERT INTO order_items (orderNumber, cartKey, name, price, selectedSize, quantity) VALUES (?, ?, ?, ?, ?, ?)",
            [
              order.number,
              item.cartKey,
              item.name,
              item.price,
              item.selectedSize,
              item.quantity,
            ]
          );
        }
      });
      setOrders((prev) => [order, ...prev]);
    } catch (e) {
      console.warn("Falha ao salvar o pedido:", e);
    }
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
