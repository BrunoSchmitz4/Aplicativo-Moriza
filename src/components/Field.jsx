import { StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS } from "../constants/colors";

export default function Field({ label, ...props }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.grayText}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: 14 },
  label: {
    fontSize: 13,
    color: COLORS.grayText,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.black,
  },
});
