import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { spacing } from '@/theme/utils';

// Temporary mock data
const mockOrders = [
  { id: '1', status: 'pending', customerName: 'John Doe', items: ['Pasta', 'Salad'] },
  { id: '2', status: 'confirmed', customerName: 'Jane Smith', items: ['Pizza'] },
];

export default function OrdersScreen() {
  const { colors } = useTheme();

  const renderOrder = ({ item }) => (
    <View style={[styles.orderCard, { backgroundColor: colors.backgroundSecondary }]}>
      <Text style={[styles.customerName, { color: colors.text }]}>{item.customerName}</Text>
      <Text style={[styles.items, { color: colors.textSecondary }]}>{item.items.join(', ')}</Text>
      <Text style={[styles.status, { color: colors.primary }]}>{item.status.toUpperCase()}</Text>
    </View>
  );

  return (
    <FlatList
      data={mockOrders}
      renderItem={renderOrder}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    gap: spacing.md,
  },
  orderCard: {
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  items: {
    fontSize: 16,
    marginBottom: spacing.xs,
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
  },
});
