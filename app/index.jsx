import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CartIconButton from "../src/components/CartIconButton";
import CategoryFilter from "../src/components/CategoryFilter";
import ProductCard from "../src/components/ProductCard";
import ScreenHeader from "../src/components/ScreenHeader";
import { COLORS } from "../src/constants/colors";
import { useCart } from "../src/context/CartContext";
import { PRODUCTS_DATA } from "../src/data/products";

const CATEGORIES = ["Masculino", "Feminino", "Acessórios"];

export default function HomeScreen() {
  const router = useRouter();
  const { cartCount } = useCart();
  const [activeCategory, setActiveCategory] = useState(null);

  const filteredProducts = activeCategory
    ? PRODUCTS_DATA.filter((p) => p.category === activeCategory)
    : PRODUCTS_DATA;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.blue} />

      <ScreenHeader
        left={
          <View>
            <Text style={styles.brand}>MORIZA</Text>
            <Text style={styles.subtitle}>Apiúna · SC</Text>
          </View>
        }
        right={
          <CartIconButton
            count={cartCount}
            onPress={() => router.push("/cart")}
          />
        }
      />

      <CategoryFilter
        categories={CATEGORIES}
        active={activeCategory}
        onChange={setActiveCategory}
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={() => router.push(`/product/${item.id}`)}
          />
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
  listContent: {
    padding: 12,
    paddingBottom: 40,
  },
  row: {
    justifyContent: "space-between",
  },
});
