import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { COLORS } from "../constants/colors";
import { PRODUCTS_DATA } from "../data/products";
import ProductCard from "../components/ProductCard";

const CATEGORIES = ["Masculino", "Feminino", "Acessórios"];

export default function HomeScreen({ onNavigateToDetail, onNavigateToCart, cartCount }) {
  const [activeCategory, setActiveCategory] = useState(null);

  const filteredProducts = activeCategory
    ? PRODUCTS_DATA.filter((p) => p.category === activeCategory)
    : PRODUCTS_DATA;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.blue} />

      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>MORIZA</Text>
          <Text style={styles.subtitle}>Ascurra · SC</Text>
        </View>
        <TouchableOpacity  style={styles.cartIconWrapper} onPress={onNavigateToCart}>
          <Text style={styles.cartIcon}>🛍️</Text>
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterBtn, activeCategory === null && styles.filterBtnActive]}
          onPress={() => setActiveCategory(null)}
        >
          <Text style={[styles.filterBtnText, activeCategory === null && styles.filterBtnTextActive]}>
            Todos
          </Text>
        </TouchableOpacity>

        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.filterBtn, activeCategory === cat && styles.filterBtnActive]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text style={[styles.filterBtnText, activeCategory === cat && styles.filterBtnTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard item={item} onPress={onNavigateToDetail} />
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.blue,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 4,
  },
  subtitle: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 11,
    letterSpacing: 1,
    marginTop: 2,
  },
  cartIconWrapper: {
    padding: 4,
    position: "relative",
  },
  cartIcon: {
    fontSize: 24,
  },
  cartBadge: {
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
  cartBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "bold",
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    gap: 8,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.grayText,
    backgroundColor: COLORS.white,
  },
  filterBtnActive: {
    backgroundColor: COLORS.blue,
    borderColor: COLORS.blue,
  },
  filterBtnText: {
    fontSize: 13,
    color: COLORS.grayText,
    fontWeight: "600",
  },
  filterBtnTextActive: {
    color: COLORS.white,
  },
  listContent: {
    padding: 12,
    paddingBottom: 40,
  },
  row: {
    justifyContent: "space-between",
  },
});