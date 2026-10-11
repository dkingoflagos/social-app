import React, { useMemo, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ProductCard } from './src/components/ProductCard';
import { categories, offers, products } from './src/data/mockData';

const tabs = [
  { key: 'Home', icon: 'home' },
  { key: 'Deals', icon: 'pricetag' },
  { key: 'Cart', icon: 'cart' },
  { key: 'Profile', icon: 'person' },
];

const colors = {
  background: '#F5F9F4',
  surface: '#FFFFFF',
  surfaceAlt: '#EDF7EA',
  primary: '#2F9E44',
  primaryDark: '#1E7A34',
  accent: '#F7C948',
  text: '#1D2A21',
  muted: '#6C7B6F',
  border: '#DDE9DE',
  white: '#FFFFFF',
};

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [search, setSearch] = useState('');
  const [cartItems, setCartItems] = useState([
    { id: 'banana', name: 'Bananas', unit: '1 bunch', price: 3.99, qty: 1 },
    { id: 'milk', name: 'Fresh Milk', unit: '1 litre', price: 4.5, qty: 1 },
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = subtotal > 25 ? 0 : 4.99;
  const total = subtotal + deliveryFee;

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const renderHomeScreen = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greeting}>Good morning</Text>
          <Text style={styles.userName}>Nia Johnson</Text>
        </View>
        <TouchableOpacity style={styles.cartButton}>
          <Ionicons name="cart-outline" size={22} color={colors.text} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartItems.length}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.locationBar}>
        <Ionicons name="location" size={16} color={colors.primary} />
        <Text style={styles.locationText}>Deliver to 17 Opebi Road, Ikeja</Text>
      </View>

      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color={colors.muted} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search groceries"
          placeholderTextColor={colors.muted}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.promoCard}>
        <View style={styles.promoTextWrap}>
          <Text style={styles.promoTitle}>Fresh picks for your weekly shop</Text>
          <Text style={styles.promoSubtitle}>Save up to 30% on organic essentials</Text>
          <TouchableOpacity style={styles.promoButton}>
            <Text style={styles.promoButtonText}>Shop now</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80' }}
          style={styles.promoImage}
        />
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <Text style={styles.linkText}>See all</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
        {categories.map((category) => (
          <TouchableOpacity key={category.id} style={styles.categoryChip}>
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Hot deals</Text>
        <Text style={styles.linkText}>View more</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.offerRow}>
        {offers.map((offer) => (
          <View key={offer.id} style={[styles.offerCard, { backgroundColor: offer.color }]}>
            <Text style={styles.offerBadge}>{offer.badge}</Text>
            <Text style={styles.offerTitle}>{offer.title}</Text>
            <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Popular picks</Text>
        <Text style={styles.linkText}>Nearby</Text>
      </View>

      <View style={styles.productGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={addToCart} />
        ))}
      </View>
    </ScrollView>
  );

  const renderCartScreen = () => (
    <View style={styles.cartScreen}>
      <Text style={styles.sectionTitle}>Your basket</Text>
      {cartItems.map((item) => (
        <View key={item.id} style={styles.cartItem}>
          <Image
            source={{ uri: products.find((p) => p.id === item.id)?.image }}
            style={styles.cartItemImage}
          />
          <View style={styles.cartItemMeta}>
            <Text style={styles.cartItemTitle}>{item.name}</Text>
            <Text style={styles.cartItemUnit}>{item.unit}</Text>
          </View>
          <Text style={styles.cartItemPrice}>${(item.price * item.qty).toFixed(2)}</Text>
        </View>
      ))}

      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery</Text>
          <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDealsScreen = () => (
    <View style={styles.screenContainer}>
      <Text style={styles.sectionTitle}>Deals & offers</Text>
      <View style={styles.dealsCard}>
        <Text style={styles.dealBig}>Up to 40% off</Text>
        <Text style={styles.dealText}>Fresh produce, dairy and pantry staples this week.</Text>
      </View>
    </View>
  );

  const renderProfileScreen = () => (
    <View style={styles.screenContainer}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80' }}
          style={styles.profileImage}
        />
        <Text style={styles.sectionTitle}>Nia Johnson</Text>
        <Text style={styles.profileMeta}>Premium member • 12 deliveries</Text>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return renderHomeScreen();
      case 'Deals':
        return renderDealsScreen();
      case 'Cart':
        return renderCartScreen();
      case 'Profile':
        return renderProfileScreen();
      default:
        return renderHomeScreen();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.appShell}>{renderContent()}</View>

      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              onPress={() => setActiveTab(tab.key)}
            >
              <Ionicons
                name={tab.icon}
                size={22}
                color={isActive ? colors.primary : colors.muted}
              />
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab.key}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  appShell: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
    backgroundColor: colors.background,
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
    color: colors.muted,
  },
  userName: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
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
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  locationText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 8,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 18,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    marginLeft: 10,
    fontSize: 15,
  },
  promoCard: {
    backgroundColor: '#EAF9EB',
    borderRadius: 22,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  promoTextWrap: {
    flex: 1,
    paddingRight: 8,
  },
  promoTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  promoSubtitle: {
    color: colors.muted,
    fontSize: 13,
    marginBottom: 14,
  },
  promoButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  promoButtonText: {
    color: colors.white,
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
    color: colors.text,
  },
  linkText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  categoryRow: {
    marginBottom: 8,
  },
  categoryChip: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: 6,
  },
  categoryText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 12,
  },
  offerRow: {
    marginBottom: 8,
  },
  offerCard: {
    width: 180,
    padding: 16,
    borderRadius: 18,
    marginRight: 12,
  },
  offerBadge: {
    fontSize: 10,
    color: colors.text,
    fontWeight: '700',
    backgroundColor: colors.surface,
    borderRadius: 999,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginBottom: 18,
  },
  offerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  offerSubtitle: {
    fontSize: 12,
    color: colors.muted,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  cartScreen: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
    backgroundColor: colors.background,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 12,
  },
  cartItemImage: {
    width: 54,
    height: 54,
    borderRadius: 12,
  },
  cartItemMeta: {
    flex: 1,
    marginLeft: 12,
  },
  cartItemTitle: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 15,
  },
  cartItemUnit: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 4,
  },
  cartItemPrice: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 15,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginTop: 22,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    color: colors.muted,
    fontSize: 14,
  },
  summaryValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  totalRow: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
    marginBottom: 0,
  },
  totalLabel: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  totalValue: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 22,
  },
  checkoutButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  screenContainer: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
    backgroundColor: colors.background,
  },
  dealsCard: {
    marginTop: 12,
    backgroundColor: '#EAF8ED',
    borderRadius: 18,
    padding: 18,
  },
  dealBig: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
  dealText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  profileImage: {
    width: 92,
    height: 92,
    borderRadius: 46,
    marginBottom: 12,
  },
  profileMeta: {
    color: colors.muted,
    fontSize: 13,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 10,
    paddingBottom: 18,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  tabText: {
    marginTop: 4,
    fontSize: 11,
    color: colors.muted,
    fontWeight: '600',
  },
  tabTextActive: {
    color: colors.primary,
  },
});
