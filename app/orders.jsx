import { useRouter } from "expo-router";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BackButton from "../src/components/BackButton";
import OrderItemRow from "../src/components/OrderItemRow";
import PrimaryButton from "../src/components/PrimaryButton";
import ScreenHeader from "../src/components/ScreenHeader";
import { COLORS } from "../src/constants/colors";
import { useOrders } from "../src/context/OrdersContext";
import { formatPrice } from "../src/utils/format";

function formatDate(iso) {
  const d = new Date(iso);
  const date = d.toLocaleDateString("pt-BR");
  const time = d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${date} às ${time}`;
}

function OrderCard({ order }) {
  const itemCount = order.items.reduce((sum, i) => sum + i.quantity, 0);
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.orderNumber}>{order.number}</Text>
        <View style={styles.statusPill}>
          <Text style={styles.statusText}>{order.status || "Confirmado"}</Text>
        </View>
      </View>

      {order.createdAt ? (
        <Text style={styles.date}>Realizado em {formatDate(order.createdAt)}</Text>
      ) : null}

      <View style={styles.divider} />

      {order.items.map((item) => (
        <OrderItemRow key={item.cartKey} item={item} />
      ))}

      <View style={styles.divider} />

      <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>
          {itemCount} {itemCount === 1 ? "item" : "itens"} · {order.payment}
        </Text>
        <Text style={styles.total}>{formatPrice(order.total)}</Text>
      </View>
    </View>
  );
}

export default function OrdersScreen() {
  const router = useRouter();
  const { orders } = useOrders();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.blue} />

      <ScreenHeader
        left={<BackButton onPress={() => router.back()} />}
        title="Meus Pedidos"
      />

      {orders.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📦</Text>
          <Text style={styles.emptyText}>
            Você ainda não fez nenhum pedido.
          </Text>
          <PrimaryButton
            label="Explorar Produtos"
            onPress={() => router.back()}
            style={styles.stretch}
          />
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.number}
          renderItem={({ item }) => <OrderCard order={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.gray },
  listContent: { padding: 16, paddingBottom: 40 },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderNumber: { fontSize: 17, fontWeight: "900", color: COLORS.black },
  statusPill: {
    backgroundColor: "#E5F4EC",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: { color: "#2E9E5B", fontSize: 12, fontWeight: "700" },
  date: { fontSize: 13, color: COLORS.grayText, marginTop: 4 },

  divider: { height: 1, backgroundColor: COLORS.gray, marginVertical: 12 },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaLabel: { fontSize: 13, color: COLORS.grayText, fontWeight: "500" },
  total: { fontSize: 20, fontWeight: "900", color: COLORS.black },

  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    gap: 16,
  },
  emptyIcon: { fontSize: 64 },
  emptyText: { fontSize: 17, color: COLORS.grayText, fontWeight: "500" },
  stretch: { alignSelf: "stretch" },
});
