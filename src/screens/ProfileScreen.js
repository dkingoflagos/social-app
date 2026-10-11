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
import { themes } from '../theme/themes';

export function ProfileScreen() {
  const { theme, currentTheme, switchTheme } = useTheme();
  const themeNames = Object.keys(themes);

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          paddingHorizontal: 18,
          paddingTop: 18,
          backgroundColor: theme.colors.background,
        },
        header: {
          alignItems: 'center',
          marginBottom: 24,
        },
        avatar: { width: 92, height: 92, borderRadius: 46, marginBottom: 12 },
        name: { fontSize: 28, fontWeight: '800', color: theme.colors.text },
        meta: { color: theme.colors.textSecondary, fontSize: 13, marginTop: 4 },
        section: { marginBottom: 24 },
        sectionTitle: { fontSize: 16, fontWeight: '800', color: theme.colors.text, marginBottom: 12 },
        infoCard: {
          backgroundColor: theme.colors.surface,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: theme.colors.border,
          padding: 16,
          marginBottom: 12,
        },
        label: { color: theme.colors.textSecondary, fontSize: 13, marginBottom: 6 },
        value: { color: theme.colors.text, fontSize: 16, fontWeight: '700' },
        themeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
        themeButton: {
          flex: 1,
          minWidth: '47%',
          borderRadius: 16,
          borderWidth: 2,
          padding: 14,
          alignItems: 'center',
        },
        themeName: { fontSize: 14, fontWeight: '700', marginTop: 8 },
        menuItem: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colors.surface,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: theme.colors.border,
          padding: 14,
          marginBottom: 10,
        },
        menuText: { flex: 1, marginLeft: 12, color: theme.colors.text, fontWeight: '600' },
      }),
    [theme]
  );

  return (
    <ScrollView style={dynamicStyles.container} showsVerticalScrollIndicator={false}>
      <View style={dynamicStyles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80' }}
          style={dynamicStyles.avatar}
        />
        <Text style={dynamicStyles.name}>Nia Johnson</Text>
        <Text style={dynamicStyles.meta}>Premium member • 12 deliveries</Text>
      </View>

      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>App Theme</Text>
        <View style={dynamicStyles.themeGrid}>
          {themeNames.map((themeName) => {
            const isActive = themeName === currentTheme;
            const themeObj = themes[themeName];
            return (
              <TouchableOpacity
                key={themeName}
                style={[
                  dynamicStyles.themeButton,
                  {
                    borderColor: isActive ? themeObj.colors.primary : themeObj.colors.border,
                    backgroundColor: themeObj.colors.background,
                  },
                ]}
                onPress={() => switchTheme(themeName)}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: themeObj.colors.primary,
                  }}
                />
                <Text
                  style={[
                    dynamicStyles.themeName,
                    { color: themeObj.colors.text },
                  ]}
                >
                  {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                </Text>
                {isActive && (
                  <View style={{ position: 'absolute', top: 8, right: 8 }}>
                    <Ionicons name="checkmark-circle" size={20} color={themeObj.colors.primary} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>Account</Text>
        <View style={dynamicStyles.infoCard}>
          <Text style={dynamicStyles.label}>Email</Text>
          <Text style={dynamicStyles.value}>nia.johnson@email.com</Text>
        </View>
        <View style={dynamicStyles.infoCard}>
          <Text style={dynamicStyles.label}>Phone</Text>
          <Text style={dynamicStyles.value}>+234 803 123 4567</Text>
        </View>
      </View>

      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>Delivery</Text>
        <View style={dynamicStyles.infoCard}>
          <Text style={dynamicStyles.label}>Default Address</Text>
          <Text style={dynamicStyles.value}>17 Opebi Road, Ikeja, Lagos</Text>
        </View>
        <View style={dynamicStyles.infoCard}>
          <Text style={dynamicStyles.label}>Preferred Time</Text>
          <Text style={dynamicStyles.value}>Today, 6:30 PM</Text>
        </View>
      </View>

      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>More</Text>
        <TouchableOpacity style={dynamicStyles.menuItem}>
          <Ionicons name="help-circle-outline" size={20} color={theme.colors.primary} />
          <Text style={dynamicStyles.menuText}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={dynamicStyles.menuItem}>
          <Ionicons name="shield-checkmark-outline" size={20} color={theme.colors.primary} />
          <Text style={dynamicStyles.menuText}>Privacy & Security</Text>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={dynamicStyles.menuItem}>
          <Ionicons name="log-out-outline" size={20} color={theme.colors.error} />
          <Text style={[dynamicStyles.menuText, { color: theme.colors.error }]}>Log out</Text>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
