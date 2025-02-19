import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { spacing } from '@/theme/utils';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  const { colors } = useTheme();

  const buttonStyles = [
    styles.button,
    {
      backgroundColor: variant === 'primary' ? colors.primary : 'transparent',
      borderColor: colors.primary,
      borderWidth: variant === 'secondary' ? 1 : 0,
      opacity: disabled ? 0.5 : 1,
    },
    style,
  ];

  const textColor = variant === 'primary' ? colors.white : colors.primary;

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress} disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
