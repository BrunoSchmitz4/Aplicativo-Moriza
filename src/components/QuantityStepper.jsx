import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/colors";

export default function QuantityStepper({ value, onChange }) {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.btn} onPress={() => onChange(value - 1)}>
        <Text style={styles.btnText}>−</Text>
      </TouchableOpacity>
      <Text style={styles.value}>{value}</Text>
      <TouchableOpacity style={styles.btn} onPress={() => onChange(value + 1)}>
        <Text style={styles.btnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  btn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: COLORS.gray,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: { fontSize: 18, fontWeight: "700", color: COLORS.black },
  value: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.black,
    minWidth: 20,
    textAlign: "center",
  },
});
