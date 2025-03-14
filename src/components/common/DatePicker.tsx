import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@/hooks/useTheme';
import { spacing } from '@/theme/utils';

interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  placeholder?: string;
}

export function DatePicker({
  value,
  onChange,
  minimumDate,
  maximumDate,
  placeholder = 'Select date',
}: DatePickerProps) {
  const { colors } = useTheme();
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || value;

    // Hide the picker on iOS
    if (Platform.OS === 'ios') {
      setShowPicker(false);
    }

    onChange(currentDate || null);
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={showDatepicker}
        style={[
          styles.button,
          { backgroundColor: colors.backgroundElevated, borderColor: colors.border },
        ]}>
        <Text style={[styles.buttonText, { color: value ? colors.text : colors.textSecondary }]}>
          {value ? formatDate(value) : placeholder}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          testID="datePicker"
          value={value || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'flex-start',
  },
  buttonText: {
    fontSize: 16,
  },
});
