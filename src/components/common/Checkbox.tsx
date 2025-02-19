import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  style?: ViewStyle;
}

export function Checkbox({ checked, onChange, style }: CheckboxProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: checked ? colors.primary : 'transparent',
          borderColor: checked ? colors.primary : colors.border,
        },
        style,
      ]}
      onPress={() => onChange(!checked)}>
      {checked && <Ionicons name="checkmark" size={16} color={colors.white} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
