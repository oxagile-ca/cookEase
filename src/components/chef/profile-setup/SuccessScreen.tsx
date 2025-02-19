import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '@/theme/utils';

export function SuccessScreen() {
  const { colors } = useTheme();
  const scaleValue = new Animated.Value(0);

  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, []);

  const nextSteps = [
    {
      icon: 'grid-outline',
      title: 'Explore Your Dashboard',
      description: 'Get familiar with your profile settings and booking management',
    },
    {
      icon: 'images-outline',
      title: 'Upload More Portfolio Images',
      description: 'Add high-quality food images to attract more customers',
    },
    {
      icon: 'wallet-outline',
      title: 'Set Up Payment Details',
      description: 'Connect your payment method to receive earnings',
    },
    {
      icon: 'calendar-outline',
      title: 'Adjust Availability',
      description: 'Fine-tune your working hours before going live',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Success Icon */}
      <Animated.View style={[styles.successIcon, { transform: [{ scale: scaleValue }] }]}>
        <View style={[styles.checkmarkCircle, { backgroundColor: colors.primary }]}>
          <Ionicons name="checkmark" size={48} color={colors.white} />
        </View>
      </Animated.View>

      {/* Success Message */}
      <Text style={[styles.title, { color: colors.text }]}>Congratulations! 🎉</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Your profile is now under review
      </Text>

      {/* Estimated Time */}
      <Card style={styles.estimateCard}>
        <Ionicons name="time-outline" size={24} color={colors.primary} />
        <Text style={[styles.estimateText, { color: colors.text }]}>
          Profile verification typically takes 24-48 hours.{'\n'}
          You'll receive an email when it's approved.
        </Text>
      </Card>

      {/* Next Steps */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>What happens now?</Text>
      <View style={styles.nextStepsContainer}>
        {nextSteps.map((step, index) => (
          <Card key={index} style={styles.stepCard}>
            <Ionicons name={step.icon as any} size={24} color={colors.primary} />
            <View style={styles.stepContent}>
              <Text style={[styles.stepTitle, { color: colors.text }]}>{step.title}</Text>
              <Text style={[styles.stepDescription, { color: colors.textSecondary }]}>
                {step.description}
              </Text>
            </View>
          </Card>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Dashboard"
          onPress={() => router.replace('/(main)/(chef)')}
          style={styles.button}
        />
        <Button
          title="View My Profile"
          onPress={() => router.push('/(main)/(chef)/profile')}
          variant="secondary"
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    alignItems: 'center',
  },
  successIcon: {
    marginVertical: spacing.xl,
  },
  checkmarkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  estimateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  estimateText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  nextStepsContainer: {
    width: '100%',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  stepCard: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.md,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  stepDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  buttonContainer: {
    width: '100%',
    gap: spacing.md,
  },
  button: {
    width: '100%',
  },
});
