import React, { ReactNode } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { spacing } from '@/theme/utils';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  containerStyle?: ViewStyle;
}

export function Input({
  label,
  error,
  value,
  onChangeText,
  placeholder,
  leftComponent,
  rightComponent,
  containerStyle,
  style,
  ...props
}: InputProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error ? colors.error : colors.border,
            backgroundColor: colors.backgroundElevated,
          },
        ]}>
        {leftComponent && <View style={styles.leftComponent}>{leftComponent}</View>}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          style={[
            styles.input,
            {
              color: colors.text,
            },
            style,
          ]}
          {...props}
        />

        {rightComponent && <View style={styles.rightComponent}>{rightComponent}</View>}
      </View>

      {error && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 48,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: spacing.md,
  },
  leftComponent: {
    paddingLeft: spacing.md,
  },
  rightComponent: {
    paddingRight: spacing.md,
  },
  error: {
    fontSize: 14,
  },
});
