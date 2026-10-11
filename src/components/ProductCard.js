import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const colors = {
  background: '#F5F9F4',
  surface: '#FFFFFF',
  primary: '#2F9E44',
  accent: '#F7C948',
  text: '#1D2A21',
  muted: '#6C7B6F',
  border: '#DDE9DE',
  white: '#FFFFFF',
};

export function ProductCard({ product, onAdd }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.unit}>{product.unit}</Text>

      <View style={styles.metaRow}>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.oldPrice}>${product.oldPrice.toFixed(2)}</Text>
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.rating}>
          <Ionicons name="star" size={12} color={colors.accent} /> {product.rating}
        </Text>
        <TouchableOpacity style={styles.addButton} onPress={() => onAdd(product)}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    marginBottom: 14,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 14,
    marginBottom: 10,
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  unit: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 10,
  },
  price: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 18,
  },
  oldPrice: {
    color: colors.muted,
    fontSize: 12,
    marginLeft: 8,
    textDecorationLine: 'line-through',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  rating: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  addText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 12,
  },
});
