import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, AppTracking } from '../constants';

interface Props {
  onGuardar: (numero: string) => void;
  onClose: () => void;
}

export default function TarjetaFormSheet({ onGuardar, onClose }: Props) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardholder, setCardholder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const formValido =
    cardNumber.replace(/\D/g, '').length === 16 &&
    cardholder.trim().length > 0 &&
    expiry.replace(/\D/g, '').length === 4 &&
    cvv.replace(/\D/g, '').length >= 3;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
      <View style={[styles.sheet, { backgroundColor: Colors.surfaceContainerLowest }]}>
        <View style={{ alignItems: 'center', paddingTop: 8 }}>
          <View style={[styles.iconCircle, { backgroundColor: Colors.secondary + '1A' }]}>
            <Ionicons name="card" size={28} color={Colors.secondary} />
          </View>
        </View>
        <Text style={[styles.sheetTitle, { color: Colors.onSurface }]}>Agregar método de pago</Text>
        <Text style={[styles.label, { color: Colors.onSurfaceVariant }]}>Número de tarjeta</Text>
        <TextInput
          style={[styles.input, { backgroundColor: Colors.surfaceContainerLow, color: Colors.onSurface }]}
          placeholder="0000 0000 0000 0000"
          placeholderTextColor={Colors.onSurfaceVariant}
          keyboardType="number-pad"
          value={cardNumber}
          onChangeText={(text) => {
            const digits = text.replace(/\D/g, '').slice(0, 16);
            const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
            setCardNumber(formatted);
          }}
        />
        <Text style={[styles.label, { color: Colors.onSurfaceVariant }]}>Titular de la tarjeta</Text>
        <TextInput
          style={[styles.input, { backgroundColor: Colors.surfaceContainerLow, color: Colors.onSurface }]}
          placeholder="Nombre como aparece en la tarjeta"
          placeholderTextColor={Colors.onSurfaceVariant}
          value={cardholder}
          onChangeText={setCardholder}
          autoCapitalize="words"
        />
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.label, { color: Colors.onSurfaceVariant }]}>Vencimiento</Text>
            <TextInput
              style={[styles.input, { backgroundColor: Colors.surfaceContainerLow, color: Colors.onSurface }]}
              placeholder="MM/AA"
              placeholderTextColor={Colors.onSurfaceVariant}
              keyboardType="number-pad"
              value={expiry}
              onChangeText={(text) => {
                const digits = text.replace(/\D/g, '').slice(0, 4);
                if (digits.length >= 3) {
                  setExpiry(`${digits.slice(0, 2)}/${digits.slice(2)}`);
                } else {
                  setExpiry(digits);
                }
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.label, { color: Colors.onSurfaceVariant }]}>CVV</Text>
            <TextInput
              style={[styles.input, { backgroundColor: Colors.surfaceContainerLow, color: Colors.onSurface }]}
              placeholder="123"
              placeholderTextColor={Colors.onSurfaceVariant}
              keyboardType="number-pad"
              secureTextEntry
              value={cvv}
              onChangeText={(text) => setCvv(text.replace(/\D/g, '').slice(0, 4))}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => formValido && onGuardar(cardNumber)}
          style={[styles.saveButton, { backgroundColor: formValido ? Colors.appPrimary : Colors.appPrimary + '66' }]}
          disabled={!formValido}
        >
          <Text style={[styles.saveText, { color: Colors.onPrimary }]}>Guardar tarjeta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
          <Text style={[styles.cancelText, { color: Colors.onSurfaceVariant }]}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000AA',
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    gap: 12,
    maxHeight: '70%',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetTitle: {
    fontSize: Typography.headlineMd.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineMd.fontWeight,
    textAlign: 'center',
  },
  label: {
    fontSize: Typography.labelCapsMd.fontSize,
    fontFamily: Typography.fontJetBrainsMono,
    fontWeight: Typography.labelCapsMd.fontWeight,
    letterSpacing: AppTracking.wideLabel,
  },
  input: {
    borderRadius: 12,
    padding: 14,
    fontSize: Typography.bodyLg.fontSize,
    fontFamily: Typography.fontBeVietnam,
  },
  saveButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  saveText: {
    fontSize: Typography.headlineSm.fontSize,
    fontFamily: Typography.fontHankenGrotesk,
    fontWeight: Typography.headlineSm.fontWeight,
  },
  cancelButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: Typography.bodyMdMedium.fontSize,
    fontFamily: Typography.fontBeVietnam,
    fontWeight: Typography.bodyMdMedium.fontWeight,
  },
});
