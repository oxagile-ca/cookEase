import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { spacing } from '@/theme/utils';
import { Ionicons } from '@expo/vector-icons';

// Temporary mock data
const mockMenuItems = [
  { id: '1', name: 'Margherita Pizza', price: 12.99, available: true },
  { id: '2', name: 'Pasta Carbonara', price: 14.99, available: true },
];

export default function MenuScreen() {
  const { colors } = useTheme();

  const renderMenuItem = ({ item }) => (
    <View style={[styles.menuCard, { backgroundColor: colors.backgroundSecondary }]}>
      <View style={styles.menuInfo}>
        <Text style={[styles.menuName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.menuPrice, { color: colors.textSecondary }]}>
          ${item.price.toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity style={styles.editButton}>
        <Ionicons name="pencil" size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.primary }]}>
        <Text style={[styles.addButtonText, { color: colors.white }]}>Add New Item</Text>
      </TouchableOpacity>

      <FlatList
        data={mockMenuItems}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: spacing.md,
    gap: spacing.md,
  },
  menuCard: {
    padding: spacing.md,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuInfo: {
    flex: 1,
  },
  menuName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  menuPrice: {
    fontSize: 14,
  },
  editButton: {
    padding: spacing.sm,
  },
  addButton: {
    margin: spacing.md,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
