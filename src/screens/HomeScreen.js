import React, { useMemo, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { ProductCard } from '../components/ProductCard';
import { categories, offers, products } from '../data/mockData';

export function HomeScreen({ navigation, cartCount }) {
  const { theme } = useTheme();
  const [search, setSearch] = useState('');

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        content: {
          flex: 1,
          paddingHorizontal: 18,
          backgroundColor: theme.colors.background,
        },
        headerRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 18,
          marginBottom: 10,
        },
        greeting: {
          fontSize: 14,
          color: theme.colors.textSecondary,
        },
        userName: {
          fontSize: 28,
          fontWeight: '800',
          color: theme.colors.text,
        },
        cartButton: {
          width: 44,
          height: 44,
          borderRadius: 14,
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.border,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        },
        badge: {
          position: 'absolute',
          right: -4,
          top: -4,
          width: 18,
          height: 18,
          borderRadius: 9,
          backgroundColor: theme.colors.error,
          alignItems: 'center',
          justifyContent: 'center',
        },
        badgeText: {
          color: theme.colors.white,
          fontSize: 10,
          fontWeight: '700',
        },
        locationBar: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colors.surfaceAlt,
          borderRadius: 12,
          paddingHorizontal: 12,
          paddingVertical: 10,
          marginBottom: 14,
        },
        locationText: {
          color: theme.colors.text,
          fontSize: 13,
          fontWeight: '600',
          marginLeft: 8,
        },
        searchWrap: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colors.surface,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: theme.colors.border,
          paddingHorizontal: 12,
          paddingVertical: 12,
          marginBottom: 18,
        },
        searchInput: {
          flex: 1,
          color: theme.colors.text,
          marginLeft: 10,
          fontSize: 15,
        },
        promoCard: {
          backgroundColor: theme.colors.surfaceAlt,
          borderRadius: 22,
          padding: 16,
          marginBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        promoTitle: {
          color: theme.colors.text,
          fontSize: 22,
          fontWeight: '800',
          marginBottom: 6,
        },
        promoSubtitle: {
          color: theme.colors.textSecondary,
          fontSize: 13,
          marginBottom: 14,
        },
        promoButton: {
          backgroundColor: theme.colors.primary,
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: 12,
          alignSelf: 'flex-start',
        },
        promoButtonText: {
          color: theme.colors.white,
          fontWeight: '700',
          fontSize: 13,
        },
        promoImage: {
          width: 110,
          height: 110,
          borderRadius: 18,
        },
        sectionRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 22,
          marginBottom: 10,
        },
        sectionTitle: {
          fontSize: 22,
          fontWeight: '800',
          color: theme.colors.text,
        },
        linkText: {
          color: theme.colors.primary,
          fontWeight: '700',
          fontSize: 13,
        },
        categoryRow: {
          marginBottom: 8,
        },
        offerRow: {
          marginBottom: 8,
        },
        productGrid: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingBottom: 24,
        },
      }),
    [theme]
  );

  return (
    <ScrollView style={dynamicStyles.content} showsVerticalScrollIndicator={false}>
      <View style={dynamicStyles.headerRow}>
        <View>
          <Text style={dynamicStyles.greeting}>Good morning</Text>
          <Text style={dynamicStyles.userName}>Nia Johnson</Text>
        </View>
        <TouchableOpacity style={dynamicStyles.cartButton} onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart-outline" size={22} color={theme.colors.text} />
          {cartCount > 0 && (
            <View style={dynamicStyles.badge}>
              <Text style={dynamicStyles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={dynamicStyles.locationBar}>
        <Ionicons name="location" size={16} color={theme.colors.primary} />
        <Text style={dynamicStyles.locationText}>Deliver to 17 Opebi Road, Ikeja</Text>
      </View>

      <View style={dynamicStyles.searchWrap}>
        <Ionicons name="search-outline" size={18} color={theme.colors.textSecondary} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search groceries"
          placeholderTextColor={theme.colors.muted}
          style={dynamicStyles.searchInput}
        />
      </View>

      <View style={dynamicStyles.promoCard}>
        <View style={{ flex: 1, paddingRight: 8 }}>
          <Text style={dynamicStyles.promoTitle}>Fresh picks for your weekly shop</Text>
          <Text style={dynamicStyles.promoSubtitle}>Save up to 30% on organic essentials</Text>
          <TouchableOpacity style={dynamicStyles.promoButton}>
            <Text style={dynamicStyles.promoButtonText}>Shop now</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80' }}
          style={dynamicStyles.promoImage}
        />
      </View>

      <View style={dynamicStyles.sectionRow}>
        <Text style={dynamicStyles.sectionTitle}>Categories</Text>
        <Text style={dynamicStyles.linkText}>See all</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={dynamicStyles.categoryRow}>
        {categories.map((category) => (
          <CategoryChip key={category.id} category={category} theme={theme} />
        ))}
      </ScrollView>

      <View style={dynamicStyles.sectionRow}>
        <Text style={dynamicStyles.sectionTitle}>Hot deals</Text>
        <Text style={dynamicStyles.linkText}>View more</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={dynamicStyles.offerRow}>
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} theme={theme} />
        ))}
      </ScrollView>

      <View style={dynamicStyles.sectionRow}>
        <Text style={dynamicStyles.sectionTitle}>Popular picks</Text>
        <Text style={dynamicStyles.linkText}>Nearby</Text>
      </View>

      <View style={dynamicStyles.productGrid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            theme={theme}
            onPress={() => navigation.navigate('ProductDetail', { product })}
          />
        ))}
      </View>
    </ScrollView>
  );
}

function CategoryChip({ category, theme }) {
  const styles = StyleSheet.create({
    chip: {
      backgroundColor: theme.colors.surface,
      borderRadius: 18,
      paddingVertical: 14,
      paddingHorizontal: 16,
      marginRight: 12,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    icon: { fontSize: 20, marginBottom: 6 },
    text: { color: theme.colors.text, fontWeight: '600', fontSize: 12 },
  });

  return (
    <TouchableOpacity style={styles.chip}>
      <Text style={styles.icon}>{category.icon}</Text>
      <Text style={styles.text}>{category.name}</Text>
    </TouchableOpacity>
  );
}

function OfferCard({ offer, theme }) {
  const styles = StyleSheet.create({
    card: {
      width: 180,
      padding: 16,
      borderRadius: 18,
      marginRight: 12,
      backgroundColor: theme.colors.surfaceAlt,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    badge: {
      fontSize: 10,
      color: theme.colors.text,
      fontWeight: '700',
      backgroundColor: theme.colors.surface,
      borderRadius: 999,
      alignSelf: 'flex-start',
      paddingHorizontal: 8,
      paddingVertical: 5,
      marginBottom: 18,
    },
    title: { fontSize: 20, fontWeight: '800', color: theme.colors.text, marginBottom: 6 },
    subtitle: { fontSize: 12, color: theme.colors.textSecondary },
  });

  return (
    <View style={styles.card}>
      <Text style={styles.badge}>{offer.badge}</Text>
      <Text style={styles.title}>{offer.title}</Text>
      <Text style={styles.subtitle}>{offer.subtitle}</Text>
    </View>
  );
}
