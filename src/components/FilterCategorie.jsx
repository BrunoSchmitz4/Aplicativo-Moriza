import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function FilterCategorie({ activeCategory, setActiveCategory }) {
  return (
    <View>
      <TouchableOpacity
        key={cat}
        style={[
          styles.filterBtn,
          activeCategory === cat && styles.filterBtnActive,
        ]}
        onPress={() => setActiveCategory(cat)}
      >
        <Text
          style={[
            styles.filterBtnText,
            activeCategory === cat && styles.filterBtnTextActive,
          ]}
        >
          {cat}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create;
