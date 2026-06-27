import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/colors";
import { formatPrice } from "../utils/format";

export default function OrderItemRow({ item }) {
  return (
    <View style={styles.row}>
      <Text style={styles.name} numberOfLines={1}>
        {item.quantity}x {item.name}{" "}
        <Text style={styles.size}>({item.selectedSize})</Text>
      </Text>
      <Text style={styles.price}>{formatPrice(item.price * item.quantity)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    gap: 12,
  },
  name: { flex: 1, fontSize: 14, color: COLORS.black, fontWeight: "500" },
  size: { color: COLORS.grayText, fontWeight: "400" },
  price: { fontSize: 14, fontWeight: "700", color: COLORS.black },
});
