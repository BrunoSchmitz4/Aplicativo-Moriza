import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/colors";

export default function BackButton({ onPress, label = "← Voltar" }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { paddingVertical: 6, paddingRight: 12 },
  text: { color: COLORS.white, fontSize: 15, fontWeight: "600" },
});
