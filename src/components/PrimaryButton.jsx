import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/colors";

export default function PrimaryButton({
  label,
  onPress,
  variant = "blue",
  style,
}) {
  const color = variant === "orange" ? COLORS.orange : COLORS.blue;
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        { backgroundColor: color, shadowColor: color },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  text: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});
