import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabaseApi } from '@/lib/supabase';
import { DatePicker } from '@/components/common/DatePicker';
import { TimePicker } from '@/components/common/TimePicker';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { useTheme } from '@/hooks/useTheme';
import { spacing } from '@/theme/utils';

interface BookingFormProps {
  chefId: string;
  userId: string;
  hourlyRate: number;
}

export function BookingForm({ chefId, userId, hourlyRate }: BookingFormProps) {
  const { colors } = useTheme();
  const router = useRouter();

  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>('');
  const [duration, setDuration] = useState<number>(2);
  const [location, setLocation] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const totalAmount = hourlyRate * duration;

  const handleSubmit = async () => {
    if (!date || !startTime || !location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);

      // 1. Check chef availability
      const { data: availabilityData, error: availabilityError } =
        await supabaseApi.getChefAvailability(chefId);

      if (availabilityError) throw availabilityError;

      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      const isAvailable = availabilityData.some(
        slot => slot.day_of_week === dayOfWeek && slot.time_slot === startTime && slot.is_available,
      );

      if (!isAvailable) {
        Alert.alert(
          'Not Available',
          'The chef is not available at this time. Please select another time.',
        );
        return;
      }

      // 2. Create booking
      const bookingDate = new Date(date);
      const [hours, minutes] = startTime.split(':').map(Number);
      bookingDate.setHours(hours, minutes);

      const { data: bookingData, error: bookingError } = await supabaseApi.createBooking({
        user_id: userId,
        chef_id: chefId,
        status: 'pending',
        booking_date: bookingDate.toISOString(),
        duration,
        total_amount: totalAmount,
        special_requests: specialRequests,
        location: { address: location },
      });

      if (bookingError) throw bookingError;

      // 3. Create payment intent (placeholder for Stripe integration)
      const { data: paymentData, error: paymentError } = await supabaseApi.createPayment({
        booking_id: bookingData.id,
        amount: totalAmount,
        status: 'pending',
        payment_method: 'card',
      });

      if (paymentError) throw paymentError;

      // 4. Create notification for chef
      await supabase.from('notifications').insert({
        user_id: chefId,
        type: 'new_booking',
        message: `You have a new booking request for ${date.toLocaleDateString()}`,
        related_id: bookingData.id,
      });

      // Navigate to payment screen
      router.push({
        pathname: '/payment',
        params: { bookingId: bookingData.id },
      });
    } catch (error) {
      console.error('Booking error:', error);
      Alert.alert('Error', 'Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Book This Chef</Text>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Date</Text>
        <DatePicker value={date} onChange={setDate} minimumDate={new Date()} />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Start Time</Text>
        <TimePicker value={startTime} onChange={setStartTime} />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Duration (hours)</Text>
        <Input
          value={duration.toString()}
          onChangeText={text => setDuration(parseInt(text) || 1)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Location</Text>
        <Input value={location} onChangeText={setLocation} placeholder="Enter your address" />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Special Requests</Text>
        <Input
          value={specialRequests}
          onChangeText={setSpecialRequests}
          multiline
          numberOfLines={3}
          placeholder="Any dietary restrictions or special requests?"
        />
      </View>

      <View style={styles.summary}>
        <Text style={[styles.summaryText, { color: colors.text }]}>
          Total: ${totalAmount.toFixed(2)}
        </Text>
      </View>

      <Button
        title={loading ? 'Processing...' : 'Book Now'}
        onPress={handleSubmit}
        disabled={loading || !date || !startTime || !location}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: spacing.lg,
  },
  formGroup: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 16,
    marginBottom: spacing.xs,
  },
  summary: {
    marginVertical: spacing.lg,
    padding: spacing.md,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
