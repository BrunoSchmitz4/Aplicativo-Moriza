import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/colors";

export default function CategoryFilter({
  categories,
  active,
  onChange,
  allLabel = "Todos",
}) {
  const options = [
    { label: allLabel, value: null },
    ...categories.map((c) => ({ label: c, value: c })),
  ];

  return (
    <View style={styles.container}>
      {options.map((opt) => {
        const isActive = active === opt.value;
        return (
          <TouchableOpacity
            key={opt.label}
            style={[styles.btn, isActive && styles.btnActive]}
            onPress={() => onChange(opt.value)}
          >
            <Text style={[styles.text, isActive && styles.textActive]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    gap: 8,
  },
  btn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.grayText,
    backgroundColor: COLORS.white,
  },
  btnActive: { backgroundColor: COLORS.blue, borderColor: COLORS.blue },
  text: { fontSize: 13, color: COLORS.grayText, fontWeight: "600" },
  textActive: { color: COLORS.white },
});
