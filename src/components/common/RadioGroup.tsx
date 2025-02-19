import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { spacing } from '@/theme/utils';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  selected: string;
  onChange: (value: string) => void;
}

export function RadioGroup({ options, selected, onChange }: RadioGroupProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {options.map(option => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.option,
            {
              borderColor: colors.border,
              backgroundColor: colors.backgroundElevated,
            },
          ]}
          onPress={() => onChange(option.value)}>
          <View
            style={[
              styles.radio,
              {
                borderColor: selected === option.value ? colors.primary : colors.border,
              },
            ]}>
            {selected === option.value && (
              <View style={[styles.radioInner, { backgroundColor: colors.primary }]} />
            )}
          </View>
          <Text style={[styles.label, { color: colors.text }]}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
  },
});
