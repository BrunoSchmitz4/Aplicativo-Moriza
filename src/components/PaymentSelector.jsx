import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/colors";

export default function PaymentSelector({ methods, selected, onSelect }) {
  return (
    <View style={styles.row}>
      {methods.map((method) => {
        const active = selected === method;
        return (
          <TouchableOpacity
            key={method}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => onSelect(method)}
            activeOpacity={0.8}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>
              {method}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.grayText,
    backgroundColor: COLORS.white,
  },
  chipActive: { backgroundColor: COLORS.blue, borderColor: COLORS.blue },
  chipText: { fontSize: 13, color: COLORS.grayText, fontWeight: "600" },
  chipTextActive: { color: COLORS.white },
});
