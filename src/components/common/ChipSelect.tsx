import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { spacing } from '@/theme/utils';

interface ChipSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  multiple?: boolean;
  renderLabel?: (value: string) => string;
}

export function ChipSelect({
  options,
  selected,
  onChange,
  multiple = false,
  renderLabel = value => value,
}: ChipSelectProps) {
  const { colors } = useTheme();

  const handlePress = (option: string) => {
    if (multiple) {
      const newSelected = selected.includes(option)
        ? selected.filter(item => item !== option)
        : [...selected, option];
      onChange(newSelected);
    } else {
      onChange([option]);
    }
  };

  return (
    <View style={styles.container}>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          style={[
            styles.chip,
            {
              backgroundColor: selected.includes(option)
                ? colors.primary
                : colors.backgroundElevated,
            },
          ]}
          onPress={() => handlePress(option)}>
          <Text
            style={[
              styles.chipText,
              {
                color: selected.includes(option) ? colors.primaryContrast : colors.text,
              },
            ]}>
            {renderLabel(option)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  chipText: {
    fontSize: 14,
  },
});
