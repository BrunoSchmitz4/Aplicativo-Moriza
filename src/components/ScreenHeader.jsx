import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/colors";

export default function ScreenHeader({ left, title, right }) {
  return (
    <View style={styles.header}>
      <View style={styles.slot}>{left}</View>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View style={[styles.slot, styles.slotRight]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.blue,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 4,
  },
  slot: { minWidth: 70 },
  slotRight: { alignItems: "flex-end" },
});
