import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BackButton from "../src/components/BackButton";
import PrimaryButton from "../src/components/PrimaryButton";
import ScreenHeader from "../src/components/ScreenHeader";
import { COLORS } from "../src/constants/colors";
import { useCart } from "../src/context/CartContext";
import { formatPrice } from "../src/utils/format";

const PAYMENT_METHODS = ["Cartão de Crédito", "Pix", "Boleto"];

function generateOrderNumber() {
  return `MZ-${Date.now().toString().slice(-6)}`;
}

export default function CheckoutScreen() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [payment, setPayment] = useState(PAYMENT_METHODS[0]);
  const [order, setOrder] = useState(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirm = () => {
    if (!name.trim() || !address.trim() || !city.trim()) {
      Alert.alert(
        "Dados incompletos",
        "Preencha nome, endereço e cidade para concluir o pedido.",
      );
      return;
    }

    // Guarda um resumo do pedido antes de limpar o carrinho
    setOrder({
      number: generateOrderNumber(),
      items: cart,
      total,
      name: name.trim(),
      address: `${address.trim()}, ${city.trim()}`,
      payment,
    });
    clearCart();
  };

  // Carrinho vazio e nenhum pedido concluído: nada para mostrar aqui
  if (!order && cart.length === 0) {
    return (
      <SafeAreaCheckout>
        <ScreenHeader
          left={<BackButton onPress={() => router.back()} />}
          title="Checkout"
        />
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyText}>Não há itens para finalizar.</Text>
          <PrimaryButton
            label="Voltar à Loja"
            onPress={() => router.dismissAll()}
            style={styles.stretch}
          />
        </View>
      </SafeAreaCheckout>
    );
  }

  // Estado de sucesso: pedido confirmado
  if (order) {
    return (
      <SafeAreaCheckout>
        <ScreenHeader title="Pedido Confirmado" />
        <ScrollView
          contentContainerStyle={styles.successContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.successBadge}>
            <Text style={styles.successCheck}>✓</Text>
          </View>
          <Text style={styles.successTitle}>Pedido confirmado!</Text>
          <Text style={styles.successSubtitle}>
            Obrigado pela sua compra na Moriza, {order.name.split(" ")[0]}.
          </Text>

          <View style={styles.card}>
            <SummaryRow label="Número do pedido" value={order.number} strong />
            <View style={styles.divider} />
            <SummaryRow label="Entrega em" value={order.address} />
            <SummaryRow label="Pagamento" value={order.payment} />
            <SummaryRow label="Previsão" value="3 a 7 dias úteis" />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Itens</Text>
            {order.items.map((item) => (
              <View key={item.cartKey} style={styles.itemRow}>
                <Text style={styles.itemName} numberOfLines={1}>
                  {item.quantity}x {item.name}{" "}
                  <Text style={styles.itemSize}>({item.selectedSize})</Text>
                </Text>
                <Text style={styles.itemPrice}>
                  {formatPrice(item.price * item.quantity)}
                </Text>
              </View>
            ))}
            <View style={styles.divider} />
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total pago</Text>
              <Text style={styles.totalValue}>{formatPrice(order.total)}</Text>
            </View>
          </View>

          <PrimaryButton
            label="Voltar à Loja"
            onPress={() => router.dismissAll()}
          />
        </ScrollView>
      </SafeAreaCheckout>
    );
  }

  // Estado de revisão: confirmar dados e pedido
  return (
    <SafeAreaCheckout>
      <ScreenHeader
        left={<BackButton onPress={() => router.back()} />}
        title="Checkout"
      />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.formContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.sectionLabel}>Dados de entrega</Text>
          <View style={styles.card}>
            <Field
              label="Nome completo"
              value={name}
              onChangeText={setName}
              placeholder="Ex: Maria Silva"
            />
            <Field
              label="Endereço"
              value={address}
              onChangeText={setAddress}
              placeholder="Rua, número, bairro"
            />
            <Field
              label="Cidade"
              value={city}
              onChangeText={setCity}
              placeholder="Ex: Apiúna - SC"
            />
          </View>

          <Text style={styles.sectionLabel}>Forma de pagamento</Text>
          <View style={styles.paymentRow}>
            {PAYMENT_METHODS.map((method) => {
              const active = payment === method;
              return (
                <TouchableOpacity
                  key={method}
                  style={[styles.payChip, active && styles.payChipActive]}
                  onPress={() => setPayment(method)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.payChipText,
                      active && styles.payChipTextActive,
                    ]}
                  >
                    {method}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionLabel}>Resumo</Text>
          <View style={styles.card}>
            {cart.map((item) => (
              <View key={item.cartKey} style={styles.itemRow}>
                <Text style={styles.itemName} numberOfLines={1}>
                  {item.quantity}x {item.name}{" "}
                  <Text style={styles.itemSize}>({item.selectedSize})</Text>
                </Text>
                <Text style={styles.itemPrice}>
                  {formatPrice(item.price * item.quantity)}
                </Text>
              </View>
            ))}
            <View style={styles.divider} />
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatPrice(total)}</Text>
            </View>
          </View>

          <PrimaryButton
            label="Confirmar Pedido"
            variant="orange"
            onPress={handleConfirm}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaCheckout>
  );
}

function SafeAreaCheckout({ children }) {
  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.blue} />
      {children}
    </View>
  );
}

function Field({ label, ...props }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.grayText}
        {...props}
      />
    </View>
  );
}

function SummaryRow({ label, value, strong }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={[styles.summaryValue, strong && styles.summaryValueStrong]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.gray },
  flex: { flex: 1 },
  formContent: { padding: 16, paddingBottom: 40, gap: 8 },
  successContent: { padding: 20, paddingBottom: 40, gap: 16 },

  sectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.grayText,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginTop: 12,
    marginBottom: 4,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.black,
    marginBottom: 12,
  },

  field: { marginBottom: 14 },
  fieldLabel: {
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

  paymentRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  payChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.grayText,
    backgroundColor: COLORS.white,
  },
  payChipActive: { backgroundColor: COLORS.blue, borderColor: COLORS.blue },
  payChipText: { fontSize: 13, color: COLORS.grayText, fontWeight: "600" },
  payChipTextActive: { color: COLORS.white },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    gap: 12,
  },
  itemName: { flex: 1, fontSize: 14, color: COLORS.black, fontWeight: "500" },
  itemSize: { color: COLORS.grayText, fontWeight: "400" },
  itemPrice: { fontSize: 14, fontWeight: "700", color: COLORS.black },

  divider: {
    height: 1,
    backgroundColor: COLORS.gray,
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: { fontSize: 16, color: COLORS.grayText, fontWeight: "600" },
  totalValue: { fontSize: 24, fontWeight: "900", color: COLORS.black },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    paddingVertical: 4,
  },
  summaryLabel: { fontSize: 14, color: COLORS.grayText },
  summaryValue: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: "600",
    flexShrink: 1,
    textAlign: "right",
  },
  summaryValueStrong: { color: COLORS.blue, fontWeight: "900" },

  successBadge: {
    alignSelf: "center",
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  successCheck: { color: COLORS.white, fontSize: 48, fontWeight: "900" },
  successTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.black,
    textAlign: "center",
  },
  successSubtitle: {
    fontSize: 15,
    color: COLORS.grayText,
    textAlign: "center",
    marginTop: -8,
  },

  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    gap: 16,
  },
  emptyIcon: { fontSize: 64 },
  emptyText: { fontSize: 17, color: COLORS.grayText, fontWeight: "500" },
  stretch: { alignSelf: "stretch" },
});
