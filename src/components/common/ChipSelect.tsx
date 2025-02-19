import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ViewStyle } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { spacing } from '@/theme/utils';

interface ChipSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  multiple?: boolean;
  style?: ViewStyle;
}

export function ChipSelect({
  options,
  selected,
  onChange,
  multiple = false,
  style,
}: ChipSelectProps) {
  const { colors } = useTheme();

  const handlePress = (option: string) => {
    if (multiple) {
      const isSelected = selected.includes(option);
      if (isSelected) {
        onChange(selected.filter(item => item !== option));
      } else {
        onChange([...selected, option]);
      }
    } else {
      onChange([option]);
    }
  };

  return (
    <ScrollView horizontal={false} showsVerticalScrollIndicator={false} style={style}>
      <View style={styles.container}>
        {options.map(option => {
          const isSelected = selected.includes(option);
          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.chip,
                {
                  backgroundColor: isSelected ? colors.primary : colors.backgroundElevated,
                  borderColor: isSelected ? colors.primary : colors.border,
                },
              ]}
              onPress={() => handlePress(option)}>
              <Text
                style={[
                  styles.chipText,
                  {
                    color: isSelected ? colors.white : colors.text,
                  },
                ]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
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
    borderWidth: 1,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
