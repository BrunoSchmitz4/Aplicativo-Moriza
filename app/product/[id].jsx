import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BackButton from "../../src/components/BackButton";
import PrimaryButton from "../../src/components/PrimaryButton";
import ScreenHeader from "../../src/components/ScreenHeader";
import SizeSelector from "../../src/components/SizeSelector";
import { COLORS } from "../../src/constants/colors";
import { useCart } from "../../src/context/CartContext";
import { PRODUCTS_DATA } from "../../src/data/products";
import { formatPrice } from "../../src/utils/format";

export default function DetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);

  const product = PRODUCTS_DATA.find((p) => p.id === id);

  if (!product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text>Produto não encontrado.</Text>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      Alert.alert(
        "Atenção",
        "Por favor, selecione um tamanho antes de continuar.",
      );
      return;
    }
    addToCart(product, selectedSize);
    Alert.alert(
      "✅ Adicionado!",
      `${product.name} (${selectedSize}) foi adicionado ao carrinho.`,
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.blue} />

      <ScreenHeader
        left={<BackButton onPress={() => router.back()} />}
        title="MORIZA"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.body}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>

          <Text style={styles.sectionLabel}>Descrição</Text>
          <Text style={styles.description}>{product.description}</Text>

          <Text style={styles.sectionLabel}>Tamanho</Text>
          <SizeSelector
            sizes={product.sizes}
            selected={selectedSize}
            onSelect={setSelectedSize}
          />

          <PrimaryButton
            label="🛒  Adicionar ao Carrinho"
            variant="orange"
            onPress={handleAddToCart}
          />
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
});
