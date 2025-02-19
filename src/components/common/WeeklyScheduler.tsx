import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { spacing } from '@/theme/utils';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_SLOTS = [
  '6:00 AM',
  '7:00 AM',
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM',
  '9:00 PM',
  '10:00 PM',
];

interface WeeklySchedulerProps {
  schedule: Record<string, string[]>;
  onChange: (schedule: Record<string, string[]>) => void;
}

export function WeeklyScheduler({ schedule, onChange }: WeeklySchedulerProps) {
  const { colors } = useTheme();
  const [selectedDay, setSelectedDay] = useState(DAYS[0]);

  const toggleTimeSlot = (time: string) => {
    const currentDaySlots = schedule[selectedDay] || [];
    const newDaySlots = currentDaySlots.includes(time)
      ? currentDaySlots.filter(slot => slot !== time)
      : [...currentDaySlots, time].sort();

    onChange({
      ...schedule,
      [selectedDay]: newDaySlots,
    });
  };

  const copyToPreviousDay = () => {
    const currentIndex = DAYS.indexOf(selectedDay);
    if (currentIndex > 0) {
      const previousDay = DAYS[currentIndex - 1];
      onChange({
        ...schedule,
        [selectedDay]: [...(schedule[previousDay] || [])],
      });
    }
  };

  const copyToAllDays = () => {
    const currentSlots = schedule[selectedDay] || [];
    const newSchedule = DAYS.reduce(
      (acc, day) => ({
        ...acc,
        [day]: [...currentSlots],
      }),
      {},
    );
    onChange(newSchedule);
  };

  return (
    <View style={styles.container}>
      {/* Days selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysContainer}>
        {DAYS.map(day => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              {
                backgroundColor: day === selectedDay ? colors.primary : colors.backgroundElevated,
                borderColor: colors.border,
              },
            ]}
            onPress={() => setSelectedDay(day)}>
            <Text
              style={[styles.dayText, { color: day === selectedDay ? colors.white : colors.text }]}>
              {day.slice(0, 3)}
            </Text>
            <Text
              style={[
                styles.slotCount,
                { color: day === selectedDay ? colors.white : colors.textSecondary },
              ]}>
              {(schedule[day] || []).length} slots
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Copy buttons */}
      <View style={styles.copyButtons}>
        <TouchableOpacity
          style={[styles.copyButton, { borderColor: colors.border }]}
          onPress={copyToPreviousDay}
          disabled={selectedDay === DAYS[0]}>
          <Text style={[styles.copyButtonText, { color: colors.text }]}>
            Copy from Previous Day
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.copyButton, { borderColor: colors.border }]}
          onPress={copyToAllDays}>
          <Text style={[styles.copyButtonText, { color: colors.text }]}>Copy to All Days</Text>
        </TouchableOpacity>
      </View>

      {/* Time slots */}
      <ScrollView style={styles.timeSlotsContainer}>
        {TIME_SLOTS.map(time => {
          const isSelected = (schedule[selectedDay] || []).includes(time);
          return (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeSlot,
                {
                  backgroundColor: isSelected ? colors.primary : colors.backgroundElevated,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => toggleTimeSlot(time)}>
              <Text style={[styles.timeText, { color: isSelected ? colors.white : colors.text }]}>
                {time}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  daysContainer: {
    flexDirection: 'row',
  },
  dayButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: spacing.sm,
    minWidth: 80,
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
    fontWeight: '600',
  },
  slotCount: {
    fontSize: 12,
    marginTop: spacing.xs,
  },
  copyButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  copyButton: {
    flex: 1,
    padding: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  copyButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  timeSlotsContainer: {
    maxHeight: 300,
  },
  timeSlot: {
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
  timeText: {
    fontSize: 16,
  },
});
