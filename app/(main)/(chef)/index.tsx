import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/providers/AuthProvider';
import { Card } from '@/components/common/Card';
import { spacing } from '@/theme/utils';
import { router } from 'expo-router';

export default function ChefDashboard() {
  const { colors } = useTheme();
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.welcomeText, { color: colors.text }]}>
          Welcome back, {user?.full_name}
        </Text>
      </View>

      <View style={styles.grid}>
        <Card
          title="Orders"
          subtitle="View and manage orders"
          onPress={() => router.push('/(main)/(chef)/orders')}
          style={styles.card}
        />

        <Card
          title="Menu"
          subtitle="Manage your menu"
          onPress={() => router.push('/(main)/(chef)/menu')}
          style={styles.card}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
  },
  grid: {
    padding: spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  card: {
    flex: 1,
    minWidth: 150,
  },
});
