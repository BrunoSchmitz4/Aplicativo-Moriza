import { Stack } from "expo-router";
import { CartProvider } from "../src/context/CartContext";
import { OrdersProvider } from "../src/context/OrdersContext";

export default function RootLayout() {
  return (
    <OrdersProvider>
      <CartProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </CartProvider>
    </OrdersProvider>
  );
}
