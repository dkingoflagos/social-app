import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function ProductCard({ product, theme, onPress }) {
  const styles = StyleSheet.create({
    card: {
      width: '48%',
      backgroundColor: theme.colors.surface,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: 10,
      marginBottom: 14,
    },
    image: { width: '100%', height: 120, borderRadius: 14, marginBottom: 10 },
    name: { color: theme.colors.text, fontSize: 16, fontWeight: '700' },
    unit: { color: theme.colors.textSecondary, fontSize: 12, marginTop: 4 },
    metaRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 10 },
    price: { color: theme.colors.primary, fontWeight: '800', fontSize: 18 },
    oldPrice: {
      color: theme.colors.textSecondary,
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
    rating: { color: theme.colors.text, fontSize: 12, fontWeight: '700' },
    addButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    addText: { color: theme.colors.white, fontWeight: '700', fontSize: 12 },
  });

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.unit}>{product.unit}</Text>

      <View style={styles.metaRow}>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.oldPrice}>${product.oldPrice.toFixed(2)}</Text>
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.rating}>
          <Ionicons name="star" size={12} color={theme.colors.accent} /> {product.rating}
        </Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
