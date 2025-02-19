import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Card } from '@/components/common/Card';
import { spacing } from '@/theme/utils';
import { useAuth } from '@/providers/AuthProvider';

export default function ChefDashboard() {
  const { colors } = useTheme();
  const { user } = useAuth();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Chef Dashboard</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Welcome back, {user?.email}
        </Text>
      </View>

      <View style={styles.grid}>
        {/* Stats Cards */}
        <Card style={styles.card}>
          <Text style={[styles.statNumber, { color: colors.text }]}>0</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Pending Orders</Text>
        </Card>

        <Card style={styles.card}>
          <Text style={[styles.statNumber, { color: colors.text }]}>$0</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Earnings</Text>
        </Card>

        {/* Add more dashboard cards here */}
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
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
  },
  grid: {
    padding: spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  card: {
    flex: 1,
    minWidth: 150,
    padding: spacing.lg,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: 14,
  },
});
