import React from "react";
import {View, Text, Image, FlatList, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet, Alert, } from "react-native";
import { COLORS } from "../constants/colors";
import { formatPrice } from "../utils/format";

export default function CartScreen({
  cart, onGoBack, onUpdateQuantity, onRemoveItem,
}) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item.image }} style={styles.itemImage} resizeMode="cover"
      />

      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.itemSize}>Tam: {item.selectedSize}</Text>
        <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>

        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn} onPress={() => onUpdateQuantity(item.cartKey, item.quantity - 1)}
          >
            <Text style={styles.qtyBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyValue}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.qtyBtn} onPress={() => onUpdateQuantity(item.cartKey, item.quantity + 1)}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.removeBtn} onPress={() => onRemoveItem(item.cartKey)}>
        <Text style={styles.removeBtnText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.blue} />
        <View style={styles.header}>
          <TouchableOpacity onPress={onGoBack} style={styles.backBtn}>
            <Text style={styles.backBtnText}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.brand}>Carrinho</Text>
          <View style={{ width: 70 }} />
        </View>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🛍️</Text>
          <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
          <TouchableOpacity style={styles.checkoutBtn} onPress={onGoBack}>
            <Text style={styles.checkoutBtnText}>Explorar Produtos</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.blue} />

      <View style={styles.header}>
        <TouchableOpacity onPress={onGoBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.brand}>Carrinho</Text>
        <View style={{ width: 70 }} />
      </View>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.cartKey}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatPrice(total)}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() =>
            Alert.alert(
              "🎉 Pedido Realizado!",
              "Obrigado pela sua compra na Moriza!",
            )
          }
          activeOpacity={0.8}
        >
          <Text style={styles.checkoutBtnText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
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
  listContent: {
    padding: 16,
    paddingBottom: 160,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 14,
    padding: 12,
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 90,
    borderRadius: 8,
    marginRight: 14,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.black,
    marginBottom: 3,
  },
  itemSize: {
    fontSize: 12,
    color: COLORS.grayText,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.blue,
    marginBottom: 10,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  qtyBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: COLORS.gray,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.black,
  },
  qtyValue: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.black,
    minWidth: 20,
    textAlign: "center",
  },
  removeBtn: {
    padding: 8,
    marginLeft: 6,
  },
  removeBtnText: {
    fontSize: 16,
    color: COLORS.grayText,
    fontWeight: "700",
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
  checkoutBtn: {
    backgroundColor: COLORS.blue,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: COLORS.blue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  checkoutBtnText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.5,
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
});
