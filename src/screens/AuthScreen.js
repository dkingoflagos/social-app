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

const palette = {
  background: '#F5F9F4',
  surface: '#FFFFFF',
  surfaceAlt: '#EDF7EA',
  primary: '#2F9E44',
  primaryDark: '#1E7A34',
  text: '#1D2A21',
  textSecondary: '#6C7B6F',
  muted: '#A8B4AA',
  border: '#DDE9DE',
  white: '#FFFFFF',
};

export function AuthScreen({ onAuthSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleAuth = () => {
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
      if (password.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuthSuccess({
        email,
        name: fullName || 'FreshCart User',
        method: 'email',
      });
    }, 1200);
  };

  const handleSocialAuth = (provider) => {
    Alert.alert('Success', `Logged in with ${provider}`);
    onAuthSuccess({ email: `user@${provider.toLowerCase()}.com`, name: provider, method: provider });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.logoWrap}>
          <View style={styles.logoBadge}>
            <Ionicons name="cart" size={32} color={palette.white} />
          </View>
          <Text style={styles.logoText}>FreshCart</Text>
        </View>

        <Text style={styles.title}>{isSignUp ? 'Create Account' : 'Welcome Back'}</Text>
        <Text style={styles.subtitle}>
          {isSignUp
            ? 'Sign up to start ordering fresh groceries delivered to your door'
            : 'Log in to your account to continue shopping'}
        </Text>

        {isSignUp && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="John Doe"
              placeholderTextColor={palette.muted}
              style={styles.input}
            />
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor={palette.muted}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordWrap}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor={palette.muted}
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
            />
            <TouchableOpacity style={styles.passwordToggle} onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={18} color={palette.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {isSignUp && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="••••••••"
              placeholderTextColor={palette.muted}
              secureTextEntry
              style={styles.input}
            />
          </View>
        )}

        <TouchableOpacity style={styles.primaryButton} onPress={handleAuth} disabled={loading}>
          <Text style={styles.primaryButtonText}>{loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Log In'}</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialAuth('Google')}>
            <Ionicons name="logo-google" size={20} color={palette.primary} />
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialAuth('Apple')}>
            <Ionicons name="logo-apple" size={20} color={palette.primary} />
            <Text style={styles.socialText}>Apple</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.toggleWrap}>
          <Text style={styles.toggleText}>{isSignUp ? 'Already have an account?' : "Don't have an account?"}</Text>
          <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
            <Text style={styles.toggleLink}>{isSignUp ? 'Log In' : 'Sign Up'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
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
    backgroundColor: palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '800',
    color: palette.text,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: palette.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: palette.textSecondary,
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 22,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: palette.text,
    marginBottom: 8,
    fontWeight: '600',
    fontSize: 14,
  },
  input: {
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: palette.text,
    fontSize: 16,
  },
  passwordWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
  },
  passwordInput: {
    flex: 1,
    color: palette.text,
    fontSize: 16,
    paddingVertical: 14,
  },
  passwordToggle: {
    padding: 4,
  },
  primaryButton: {
    backgroundColor: palette.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  primaryButtonText: {
    color: palette.white,
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
    backgroundColor: palette.border,
  },
  dividerText: {
    color: palette.textSecondary,
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
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  socialText: {
    color: palette.text,
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
    color: palette.textSecondary,
    fontSize: 14,
  },
  toggleLink: {
    color: palette.primary,
    fontWeight: '700',
    marginLeft: 4,
  },
});
