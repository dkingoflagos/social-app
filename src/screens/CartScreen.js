import React, { useMemo } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { products } from '../data/mockData';

export function CartScreen({ cartItems, setCartItems, navigation }) {
  const { theme } = useTheme();

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartItems]
  );

  const deliveryFee = subtotal > 25 ? 0 : 4.99;
  const total = subtotal + deliveryFee;

  const updateQty = (id, newQty) => {
    if (newQty <= 0) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems(
        cartItems.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
      );
    }
  };

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          paddingHorizontal: 18,
          paddingTop: 18,
          backgroundColor: theme.colors.background,
        },
        title: {
          fontSize: 22,
          fontWeight: '800',
          color: theme.colors.text,
          marginBottom: 12,
        },
        cartItem: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colors.surface,
          borderRadius: 18,
          padding: 10,
          borderWidth: 1,
          borderColor: theme.colors.border,
          marginTop: 12,
        },
        itemImage: { width: 54, height: 54, borderRadius: 12 },
        itemMeta: { flex: 1, marginLeft: 12 },
        itemTitle: { color: theme.colors.text, fontWeight: '700', fontSize: 15 },
        itemUnit: { color: theme.colors.textSecondary, fontSize: 12, marginTop: 4 },
        itemPrice: { color: theme.colors.text, fontWeight: '700', fontSize: 15 },
        summaryCard: {
          backgroundColor: theme.colors.surface,
          borderRadius: 18,
          borderWidth: 1,
          borderColor: theme.colors.border,
          padding: 16,
          marginTop: 22,
        },
        summaryRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        },
        summaryLabel: { color: theme.colors.textSecondary, fontSize: 14 },
        summaryValue: { color: theme.colors.text, fontSize: 15, fontWeight: '700' },
        totalRow: {
          marginTop: 8,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          paddingTop: 12,
          marginBottom: 0,
        },
        totalLabel: { color: theme.colors.text, fontSize: 18, fontWeight: '800' },
        totalValue: { color: theme.colors.primary, fontSize: 18, fontWeight: '800' },
        checkoutButton: {
          backgroundColor: theme.colors.primary,
          paddingVertical: 16,
          borderRadius: 16,
          alignItems: 'center',
          marginTop: 22,
          marginBottom: 24,
        },
        checkoutText: { color: theme.colors.white, fontSize: 16, fontWeight: '800' },
        emptyText: { color: theme.colors.textSecondary, textAlign: 'center', fontSize: 16 },
      }),
    [theme]
  );

  if (cartItems.length === 0) {
    return (
      <View style={[dynamicStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={dynamicStyles.emptyText}>Your basket is empty</Text>
      </View>
    );
  }

  return (
    <ScrollView style={dynamicStyles.container} showsVerticalScrollIndicator={false}>
      <Text style={dynamicStyles.title}>Your basket</Text>

      {cartItems.map((item) => {
        const product = products.find((p) => p.id === item.id);
        return (
          <View key={item.id} style={dynamicStyles.cartItem}>
            <Image source={{ uri: product?.image }} style={dynamicStyles.itemImage} />
            <View style={dynamicStyles.itemMeta}>
              <Text style={dynamicStyles.itemTitle}>{item.name}</Text>
              <Text style={dynamicStyles.itemUnit}>{item.unit}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={dynamicStyles.itemPrice}>${(item.price * item.qty).toFixed(2)}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <TouchableOpacity onPress={() => updateQty(item.id, item.qty - 1)}>
                  <Ionicons name="remove-circle-outline" size={18} color={theme.colors.primary} />
                </TouchableOpacity>
                <Text style={{ color: theme.colors.text, marginHorizontal: 8, fontWeight: '700' }}>
                  {item.qty}
                </Text>
                <TouchableOpacity onPress={() => updateQty(item.id, item.qty + 1)}>
                  <Ionicons name="add-circle-outline" size={18} color={theme.colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })}

      <View style={dynamicStyles.summaryCard}>
        <View style={dynamicStyles.summaryRow}>
          <Text style={dynamicStyles.summaryLabel}>Subtotal</Text>
          <Text style={dynamicStyles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={dynamicStyles.summaryRow}>
          <Text style={dynamicStyles.summaryLabel}>Delivery</Text>
          <Text style={dynamicStyles.summaryValue}>
            {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
          </Text>
        </View>
        <View style={[dynamicStyles.summaryRow, dynamicStyles.totalRow]}>
          <Text style={dynamicStyles.totalLabel}>Total</Text>
          <Text style={dynamicStyles.totalValue}>${total.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity style={dynamicStyles.checkoutButton} onPress={() => navigation.navigate('Checkout')}>
        <Text style={dynamicStyles.checkoutText}>Proceed to checkout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
