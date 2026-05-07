import { useRouter } from "expo-router";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BackButton from "../src/components/BackButton";
import CartItem from "../src/components/CartItem";
import PrimaryButton from "../src/components/PrimaryButton";
import ScreenHeader from "../src/components/ScreenHeader";
import { COLORS } from "../src/constants/colors";
import { useCart } from "../src/context/CartContext";
import { formatPrice } from "../src/utils/format";

export default function CartScreen() {
  const router = useRouter();
  const { cart, updateQuantity, removeItem, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    Alert.alert("🎉 Pedido Realizado!", "Obrigado pela sua compra na Moriza!", [
      {
        text: "OK",
        onPress: () => {
          clearCart();
          router.back();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.blue} />

      <ScreenHeader
        left={<BackButton onPress={() => router.back()} />}
        title="Carrinho"
      />

      {cart.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🛍️</Text>
          <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
          <PrimaryButton
            label="Explorar Produtos"
            onPress={() => router.back()}
            style={styles.emptyButton}
          />
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.cartKey}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                onChangeQuantity={updateQuantity}
                onRemove={removeItem}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatPrice(total)}</Text>
            </View>
            <PrimaryButton label="Finalizar Compra" onPress={handleCheckout} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  listContent: {
    padding: 16,
    paddingBottom: 160,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    padding: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 6,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: COLORS.grayText,
    fontWeight: "600",
  },
  totalValue: {
    fontSize: 26,
    fontWeight: "900",
    color: COLORS.black,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    gap: 16,
  },
  emptyIcon: {
    fontSize: 64,
  },
  emptyText: {
    fontSize: 17,
    color: COLORS.grayText,
    fontWeight: "500",
    marginBottom: 8,
  },
  emptyButton: {
    alignSelf: "stretch",
  },
});
