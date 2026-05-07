import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/colors";
import { formatPrice } from "../utils/format";
import QuantityStepper from "./QuantityStepper";

export default function CartItem({ item, onChangeQuantity, onRemove }) {
  return (
    <View style={styles.row}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.size}>Tam: {item.selectedSize}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <QuantityStepper
          value={item.quantity}
          onChange={(qty) => onChangeQuantity(item.cartKey, qty)}
        />
      </View>

      <TouchableOpacity
        style={styles.removeBtn}
        onPress={() => onRemove(item.cartKey)}
      >
        <Text style={styles.removeBtnText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 14,
    padding: 12,
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  image: { width: 80, height: 90, borderRadius: 8, marginRight: 14 },
  info: { flex: 1 },
  name: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.black,
    marginBottom: 3,
  },
  size: { fontSize: 12, color: COLORS.grayText, marginBottom: 4 },
  price: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.blue,
    marginBottom: 10,
  },
  removeBtn: { padding: 8, marginLeft: 6 },
  removeBtnText: { fontSize: 16, color: COLORS.grayText, fontWeight: "700" },
});
