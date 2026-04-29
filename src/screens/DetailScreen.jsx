import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
} from "react-native";
import { COLORS } from "../constants/colors";
import { formatPrice } from "../utils/format";

export default function DetailScreen({ product, onGoBack, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleAddToCart = () => {
    if (!selectedSize) {
      Alert.alert("Atenção", "Por favor, selecione um tamanho antes de continuar.");
      return;
    }
    onAddToCart(product, selectedSize);
    Alert.alert("✅ Adicionado!", `${product.name} (${selectedSize}) foi adicionado ao carrinho.`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.blue} />

      <View style={styles.header}>
        <TouchableOpacity onPress={onGoBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.brand}>MORIZA</Text>
        <View style={{ width: 70 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />

        <View style={styles.body}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>

          <Text style={styles.sectionLabel}>Descrição</Text>
          <Text style={styles.description}>{product.description}</Text>

          <Text style={styles.sectionLabel}>Tamanho</Text>
          <View style={styles.sizesRow}>
            {product.sizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[styles.sizeBtn, selectedSize === size && styles.sizeBtnActive]}
                onPress={() => setSelectedSize(size)}
              >
                <Text style={[styles.sizeBtnText, selectedSize === size && styles.sizeBtnTextActive]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart} activeOpacity={0.8}>
            <Text style={styles.addToCartText}>🛒  Adicionar ao Carrinho</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  backBtn: {
    paddingVertical: 6,
    paddingRight: 12,
    width: 70,
  },
  backBtnText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "600",
  },
  image: {
    width: "100%",
    height: 320,
  },
  body: {
    padding: 20,
    paddingBottom: 40,
  },
  category: {
    fontSize: 12,
    color: COLORS.orange,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  name: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.black,
    marginBottom: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.blue,
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.grayText,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 10,
    marginTop: 8,
  },
  description: {
    fontSize: 15,
    color: "#444",
    lineHeight: 24,
    marginBottom: 24,
  },
  sizesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 28,
  },
  sizeBtn: {
    width: 56,
    height: 56,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#DDD",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  sizeBtnActive: {
    borderColor: COLORS.orange,
    backgroundColor: COLORS.orange,
  },
  sizeBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.black,
  },
  sizeBtnTextActive: {
    color: COLORS.white,
  },
  addToCartBtn: {
    backgroundColor: COLORS.orange,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: COLORS.orange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  addToCartText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});