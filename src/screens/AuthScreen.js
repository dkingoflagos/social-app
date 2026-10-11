import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export function AuthScreen({ onAuthSuccess }) {
  const { theme } = useTheme();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }

    if (isSignUp) {
      if (!fullName.trim()) {
        Alert.alert('Error', 'Please enter your full name');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
      if (password.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters');
        return;
      }
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      const userData = isSignUp
        ? { email, name: fullName, method: 'email' }
        : { email, method: 'email' };
      onAuthSuccess(userData);
    }, 1500);
  };

  const handleSocialAuth = (provider) => {
    Alert.alert('Success', `Logged in with ${provider}`);
    onAuthSuccess({ email: `user@${provider}.com`, method: provider });
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 24,
    },
    logoWrap: {
      alignItems: 'center',
      marginTop: 40,
      marginBottom: 32,
    },
    logoBadge: {
      width: 72,
      height: 72,
      borderRadius: 24,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },
    logoText: {
      fontSize: 28,
      fontWeight: '800',
      color: theme.colors.text,
    },
    title: {
      fontSize: 32,
      fontWeight: '800',
      color: theme.colors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 15,
      color: theme.colors.textSecondary,
      marginBottom: 32,
      textAlign: 'center',
      lineHeight: 22,
    },
    inputGroup: {
      marginBottom: 16,
    },
    label: {
      color: theme.colors.text,
      marginBottom: 8,
      fontWeight: '600',
      fontSize: 14,
    },
    input: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 14,
      paddingHorizontal: 14,
      paddingVertical: 14,
      color: theme.colors.text,
      fontSize: 16,
    },
    passwordWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 14,
      paddingHorizontal: 14,
    },
    passwordInput: {
      flex: 1,
      color: theme.colors.text,
      fontSize: 16,
      paddingVertical: 14,
    },
    passwordToggle: {
      padding: 4,
    },
    primaryButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 14,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 8,
      marginBottom: 16,
    },
    primaryButtonText: {
      color: theme.colors.white,
      fontSize: 16,
      fontWeight: '700',
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.border,
    },
    dividerText: {
      color: theme.colors.textSecondary,
      marginHorizontal: 12,
      fontSize: 13,
      fontWeight: '600',
    },
    socialRow: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 20,
    },
    socialButton: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: 'center',
    },
    socialText: {
      color: theme.colors.text,
      fontWeight: '600',
      fontSize: 14,
      marginTop: 6,
    },
    toggleWrap: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 16,
      marginBottom: 24,
    },
    toggleText: {
      color: theme.colors.textSecondary,
      fontSize: 14,
    },
    toggleLink: {
      color: theme.colors.primary,
      fontWeight: '700',
      marginLeft: 4,
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <StatusBar barStyle={theme.name === 'light' ? 'dark-content' : 'light-content'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={dynamicStyles.logoWrap}>
          <View style={dynamicStyles.logoBadge}>
            <Ionicons name="cart" size={32} color={theme.colors.white} />
          </View>
          <Text style={dynamicStyles.logoText}>FreshCart</Text>
        </View>

        <Text style={dynamicStyles.title}>{isSignUp ? 'Create Account' : 'Welcome Back'}</Text>
        <Text style={dynamicStyles.subtitle}>
          {isSignUp
            ? 'Sign up to start ordering fresh groceries delivered to your door'
            : 'Log in to your account to continue shopping'}
        </Text>

        {isSignUp && (
          <View style={dynamicStyles.inputGroup}>
            <Text style={dynamicStyles.label}>Full Name</Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="John Doe"
              placeholderTextColor={theme.colors.muted}
              style={dynamicStyles.input}
            />
          </View>
        )}

        <View style={dynamicStyles.inputGroup}>
          <Text style={dynamicStyles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor={theme.colors.muted}
            keyboardType="email-address"
            autoCapitalize="none"
            style={dynamicStyles.input}
          />
        </View>

        <View style={dynamicStyles.inputGroup}>
          <Text style={dynamicStyles.label}>Password</Text>
          <View style={dynamicStyles.passwordWrap}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor={theme.colors.muted}
              secureTextEntry={!showPassword}
              style={dynamicStyles.passwordInput}
            />
            <TouchableOpacity
              style={dynamicStyles.passwordToggle}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={18}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {isSignUp && (
          <View style={dynamicStyles.inputGroup}>
            <Text style={dynamicStyles.label}>Confirm Password</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="••••••••"
              placeholderTextColor={theme.colors.muted}
              secureTextEntry
              style={dynamicStyles.input}
            />
          </View>
        )}

        <TouchableOpacity
          style={dynamicStyles.primaryButton}
          onPress={handleAuth}
          disabled={loading}
        >
          <Text style={dynamicStyles.primaryButtonText}>
            {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Log In'}
          </Text>
        </TouchableOpacity>

        <View style={dynamicStyles.divider}>
          <View style={dynamicStyles.dividerLine} />
          <Text style={dynamicStyles.dividerText}>Or continue with</Text>
          <View style={dynamicStyles.dividerLine} />
        </View>

        <View style={dynamicStyles.socialRow}>
          <TouchableOpacity
            style={dynamicStyles.socialButton}
            onPress={() => handleSocialAuth('Google')}
          >
            <Ionicons name="logo-google" size={20} color={theme.colors.primary} />
            <Text style={dynamicStyles.socialText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={dynamicStyles.socialButton}
            onPress={() => handleSocialAuth('Apple')}
          >
            <Ionicons name="logo-apple" size={20} color={theme.colors.primary} />
            <Text style={dynamicStyles.socialText}>Apple</Text>
          </TouchableOpacity>
        </View>

        <View style={dynamicStyles.toggleWrap}>
          <Text style={dynamicStyles.toggleText}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          </Text>
          <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
            <Text style={dynamicStyles.toggleLink}>{isSignUp ? 'Log In' : 'Sign Up'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
