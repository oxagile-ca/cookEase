import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { ChipSelect } from '@/components/common/ChipSelect';
import { WeeklyScheduler } from '@/components/common/WeeklyScheduler';
import { spacing } from '@/theme/utils';

const SERVICE_TYPES = ['In-Home Cooking', 'Catering', 'Meal Prep', 'Virtual Sessions'];

const SERVICE_RADIUS = ['5 km', '10 km', '20 km', '30 km', '50 km'];

interface Step3Props {
  data: {
    availability: Record<string, string[]>;
    hourly_rate: number;
    service_types: string[];
    service_radius: string;
  };
  onUpdate: (data: Partial<Step3Props['data']>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step3Availability({ data, onUpdate, onNext, onBack }: Step3Props) {
  const { colors } = useTheme();

  const isFormValid =
    Object.keys(data.availability).length > 0 &&
    data.hourly_rate > 0 &&
    data.service_types.length > 0 &&
    data.service_radius;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Weekly Availability</Text>
        <WeeklyScheduler
          schedule={data.availability}
          onChange={schedule => onUpdate({ availability: schedule })}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Hourly Rate</Text>
        <Input
          value={data.hourly_rate.toString()}
          onChangeText={text => onUpdate({ hourly_rate: parseFloat(text) || 0 })}
          placeholder="Enter your hourly rate"
          keyboardType="numeric"
          leftComponent={<Text style={{ color: colors.text }}>$</Text>}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Service Types</Text>
        <ChipSelect
          options={SERVICE_TYPES}
          selected={data.service_types}
          onChange={selected => onUpdate({ service_types: selected })}
          multiple
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Service Radius</Text>
        <ChipSelect
          options={SERVICE_RADIUS}
          selected={[data.service_radius]}
          onChange={selected => onUpdate({ service_radius: selected[0] })}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={onBack} variant="secondary" style={styles.button} />
        <Button title="Next" onPress={onNext} disabled={!isFormValid} style={styles.button} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.lg,
    gap: spacing.md,
  },
  button: {
    flex: 1,
  },
});
