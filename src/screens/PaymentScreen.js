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

export function PaymentScreen({ cartTotal, onPaymentSuccess, onCancel }) {
  const { theme } = useTheme();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 16);
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const formatExpiry = (text) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 2) {
      setExpiryMonth(cleaned.slice(0, 2));
      setExpiryYear(cleaned.slice(2, 4));
    } else {
      setExpiryMonth(cleaned);
    }
  };

  const validateCard = () => {
    if (!cardholderName.trim()) {
      Alert.alert('Error', 'Please enter cardholder name');
      return false;
    }
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      Alert.alert('Error', 'Please enter a valid 16-digit card number');
      return false;
    }
    if (!expiryMonth || !expiryYear || expiryMonth.length !== 2 || expiryYear.length !== 2) {
      Alert.alert('Error', 'Please enter valid expiry date (MM/YY)');
      return false;
    }
    if (cvv.length !== 3 && cvv.length !== 4) {
      Alert.alert('Error', 'Please enter a valid CVV');
      return false;
    }
    if (!billingAddress.trim()) {
      Alert.alert('Error', 'Please enter your billing address');
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateCard()) return;

    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Payment processed successfully!', [
        {
          text: 'OK',
          onPress: () => {
            onPaymentSuccess({
              method: paymentMethod,
              last4: cardNumber.slice(-4),
              amount: cartTotal,
            });
          },
        },
      ]);
    }, 2000);
  };

  const dynamicStyles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      paddingHorizontal: 18,
      paddingTop: 18,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
    },
    headerTitle: {
      fontSize: 26,
      fontWeight: '800',
      color: theme.colors.text,
      marginLeft: 12,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '800',
      color: theme.colors.text,
      marginBottom: 12,
    },
    methodRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: 14,
      borderWidth: 2,
      borderColor: theme.colors.border,
      padding: 14,
      marginBottom: 10,
    },
    methodRowActive: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primary + '10',
    },
    methodRadio: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    methodRadioActive: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primary,
    },
    methodText: {
      color: theme.colors.text,
      fontWeight: '600',
      fontSize: 15,
    },
    inputGroup: {
      marginBottom: 14,
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
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      color: theme.colors.text,
      fontSize: 15,
    },
    rowInputs: {
      flexDirection: 'row',
      gap: 10,
    },
    halfInput: {
      flex: 1,
    },
    summaryCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: 16,
      marginBottom: 20,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    summaryLabel: {
      color: theme.colors.textSecondary,
      fontSize: 14,
    },
    summaryValue: {
      color: theme.colors.text,
      fontSize: 15,
      fontWeight: '700',
    },
    totalRow: {
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      paddingTop: 12,
      marginTop: 12,
    },
    totalLabel: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: '800',
    },
    totalValue: {
      color: theme.colors.primary,
      fontSize: 18,
      fontWeight: '800',
    },
    buttonRow: {
      flexDirection: 'row',
      gap: 12,
      paddingBottom: 24,
    },
    cancelButton: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: 'center',
    },
    cancelButtonText: {
      color: theme.colors.text,
      fontSize: 15,
      fontWeight: '700',
    },
    payButton: {
      flex: 2,
      backgroundColor: theme.colors.primary,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: 'center',
    },
    payButtonText: {
      color: theme.colors.white,
      fontSize: 16,
      fontWeight: '800',
    },
    securityNote: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.primary + '10',
      borderRadius: 10,
      padding: 10,
      marginBottom: 16,
    },
    securityText: {
      color: theme.colors.primary,
      fontSize: 12,
      marginLeft: 8,
      fontWeight: '600',
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.safeArea}>
      <StatusBar barStyle={theme.name === 'light' ? 'dark-content' : 'light-content'} />
      <ScrollView style={dynamicStyles.container} showsVerticalScrollIndicator={false}>
        <View style={dynamicStyles.header}>
          <TouchableOpacity onPress={onCancel}>
            <Ionicons name="chevron-back" size={28} color={theme.colors.primary} />
          </TouchableOpacity>
          <Text style={dynamicStyles.headerTitle}>Payment</Text>
        </View>

        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>Payment Method</Text>
          {['card', 'wallet'].map((method) => (
            <TouchableOpacity
              key={method}
              style={[
                dynamicStyles.methodRow,
                paymentMethod === method && dynamicStyles.methodRowActive,
              ]}
              onPress={() => setPaymentMethod(method)}
            >
              <View
                style={[
                  dynamicStyles.methodRadio,
                  paymentMethod === method && dynamicStyles.methodRadioActive,
                ]}
              >
                {paymentMethod === method && (
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: theme.colors.white }} />
                )}
              </View>
              <Ionicons
                name={method === 'card' ? 'card-outline' : 'wallet-outline'}
                size={20}
                color={theme.colors.primary}
                style={{ marginRight: 10 }}
              />
              <Text style={dynamicStyles.methodText}>
                {method === 'card' ? 'Credit/Debit Card' : 'Digital Wallet'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {paymentMethod === 'card' && (
          <>
            <View style={dynamicStyles.section}>
              <Text style={dynamicStyles.sectionTitle}>Card Details</Text>

              <View style={dynamicStyles.securityNote}>
                <Ionicons name="shield-checkmark" size={16} color={theme.colors.primary} />
                <Text style={dynamicStyles.securityText}>Your card details are secure and encrypted</Text>
              </View>

              <View style={dynamicStyles.inputGroup}>
                <Text style={dynamicStyles.label}>Cardholder Name</Text>
                <TextInput
                  value={cardholderName}
                  onChangeText={setCardholderName}
                  placeholder="John Doe"
                  placeholderTextColor={theme.colors.muted}
                  style={dynamicStyles.input}
                />
              </View>

              <View style={dynamicStyles.inputGroup}>
                <Text style={dynamicStyles.label}>Card Number</Text>
                <TextInput
                  value={cardNumber}
                  onChangeText={formatCardNumber}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor={theme.colors.muted}
                  keyboardType="numeric"
                  maxLength={19}
                  style={dynamicStyles.input}
                />
              </View>

              <View style={dynamicStyles.inputGroup}>
                <Text style={dynamicStyles.label}>Expiry Date & CVV</Text>
                <View style={dynamicStyles.rowInputs}>
                  <View style={dynamicStyles.halfInput}>
                    <TextInput
                      value={
                        expiryMonth && expiryYear
                          ? `${expiryMonth}/${expiryYear}`
                          : expiryMonth
                      }
                      onChangeText={formatExpiry}
                      placeholder="MM/YY"
                      placeholderTextColor={theme.colors.muted}
                      keyboardType="numeric"
                      maxLength={5}
                      style={dynamicStyles.input}
                    />
                  </View>
                  <View style={dynamicStyles.halfInput}>
                    <TextInput
                      value={cvv}
                      onChangeText={(text) => setCvv(text.replace(/\D/g, '').slice(0, 4))}
                      placeholder="CVV"
                      placeholderTextColor={theme.colors.muted}
                      keyboardType="numeric"
                      maxLength={4}
                      secureTextEntry
                      style={dynamicStyles.input}
                    />
                  </View>
                </View>
              </View>

              <View style={dynamicStyles.inputGroup}>
                <Text style={dynamicStyles.label}>Billing Address</Text>
                <TextInput
                  value={billingAddress}
                  onChangeText={setBillingAddress}
                  placeholder="123 Main St, City, State 12345"
                  placeholderTextColor={theme.colors.muted}
                  style={dynamicStyles.input}
                  multiline
                  numberOfLines={2}
                />
              </View>
            </View>
          </>
        )}

        <View style={dynamicStyles.summaryCard}>
          <View style={dynamicStyles.summaryRow}>
            <Text style={dynamicStyles.summaryLabel}>Subtotal</Text>
            <Text style={dynamicStyles.summaryValue}>${(cartTotal * 0.95).toFixed(2)}</Text>
          </View>
          <View style={dynamicStyles.summaryRow}>
            <Text style={dynamicStyles.summaryLabel}>Delivery Fee</Text>
            <Text style={dynamicStyles.summaryValue}>$4.99</Text>
          </View>
          <View style={dynamicStyles.summaryRow}>
            <Text style={dynamicStyles.summaryLabel}>Tax</Text>
            <Text style={dynamicStyles.summaryValue}>${(cartTotal * 0.05).toFixed(2)}</Text>
          </View>
          <View style={[dynamicStyles.summaryRow, dynamicStyles.totalRow]}>
            <Text style={dynamicStyles.totalLabel}>Total Amount</Text>
            <Text style={dynamicStyles.totalValue}>${cartTotal.toFixed(2)}</Text>
          </View>
        </View>

        <View style={dynamicStyles.buttonRow}>
          <TouchableOpacity style={dynamicStyles.cancelButton} onPress={onCancel}>
            <Text style={dynamicStyles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={dynamicStyles.payButton}
            onPress={handlePayment}
            disabled={loading}
          >
            <Text style={dynamicStyles.payButtonText}>
              {loading ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
