import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/common/Button';
import { spacing } from '@/theme/utils';

export default function VerifySuccess() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Email Verified! 🎉</Text>
        <Text style={[styles.message, { color: colors.textSecondary }]}>
          Thank you for verifying your email address. Your account is now activated.
        </Text>
        <Link href="/login" asChild>
          <Button title="Login to Continue" style={styles.button} />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  content: {
    alignItems: 'center',
    gap: spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  button: {
    minWidth: 200,
  },
});
