import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/colors";
import { formatPrice } from "../utils/format";
import OrderItemRow from "./OrderItemRow";

export default function OrderSummary({ items, total, title, totalLabel = "Total" }) {
  return (
    <View style={styles.card}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {items.map((item) => (
        <OrderItemRow key={item.cartKey} item={item} />
      ))}
      <View style={styles.divider} />
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>{totalLabel}</Text>
        <Text style={styles.totalValue}>{formatPrice(total)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.black,
    marginBottom: 12,
  },
  divider: { height: 1, backgroundColor: COLORS.gray, marginVertical: 10 },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: { fontSize: 16, color: COLORS.grayText, fontWeight: "600" },
  totalValue: { fontSize: 24, fontWeight: "900", color: COLORS.black },
});
