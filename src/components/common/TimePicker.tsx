import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@/hooks/useTheme';
import { spacing } from '@/theme/utils';

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  placeholder?: string;
}

export function TimePicker({ value, onChange, placeholder = 'Select time' }: TimePickerProps) {
  const { colors } = useTheme();
  const [showPicker, setShowPicker] = useState(false);

  // Convert string time to Date object
  const getTimeAsDate = () => {
    const date = new Date();
    if (value) {
      const [hours, minutes] = value.split(':').map(Number);
      date.setHours(hours, minutes, 0, 0);
    }
    return date;
  };

  const handleChange = (event: any, selectedDate?: Date) => {
    // Hide the picker on iOS
    if (Platform.OS === 'ios') {
      setShowPicker(false);
    }

    if (selectedDate && event.type !== 'dismissed') {
      const hours = selectedDate.getHours().toString().padStart(2, '0');
      const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
      onChange(`${hours}:${minutes}`);
    }
  };

  const showTimepicker = () => {
    setShowPicker(true);
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '';

    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={showTimepicker}
        style={[
          styles.button,
          { backgroundColor: colors.backgroundElevated, borderColor: colors.border },
        ]}>
        <Text style={[styles.buttonText, { color: value ? colors.text : colors.textSecondary }]}>
          {value ? formatTime(value) : placeholder}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          testID="timePicker"
          value={getTimeAsDate()}
          mode="time"
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
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
