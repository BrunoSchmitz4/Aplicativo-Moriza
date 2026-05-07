import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/colors";

export default function SizeSelector({ sizes, selected, onSelect }) {
  return (
    <View style={styles.row}>
      {sizes.map((size) => {
        const isActive = selected === size;
        return (
          <TouchableOpacity
            key={size}
            style={[styles.btn, isActive && styles.btnActive]}
            onPress={() => onSelect(size)}
          >
            <Text style={[styles.text, isActive && styles.textActive]}>
              {size}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 28 },
  btn: {
    width: 56,
    height: 56,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#DDD",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  btnActive: { borderColor: COLORS.orange, backgroundColor: COLORS.orange },
  text: { fontSize: 15, fontWeight: "700", color: COLORS.black },
  textActive: { color: COLORS.white },
});
