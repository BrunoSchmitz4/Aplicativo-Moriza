import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/colors";

export default function CartIconButton({ count = 0, onPress }) {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <Text style={styles.icon}>🛍️</Text>
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: { padding: 4, position: "relative" },
  icon: { fontSize: 24 },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: COLORS.orange,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: { color: COLORS.white, fontSize: 10, fontWeight: "bold" },
});
