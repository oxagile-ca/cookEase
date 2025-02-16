import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { borderRadius } from '../../theme/utils';

export function HomeSidebar() {
  return (
    <View style={styles.container}>
      {/* Quick Filters Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Filters</Text>
        <View style={styles.filterButtons}>
          <TouchableOpacity style={styles.filterButton}>
            <MaterialIcons name="star" size={20} color={colors.primary} />
            <Text style={styles.filterText}>Top Rated</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <MaterialIcons name="trending-up" size={20} color={colors.primary} />
            <Text style={styles.filterText}>Most Popular</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <MaterialIcons name="local-offer" size={20} color={colors.primary} />
            <Text style={styles.filterText}>Best Price</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Cuisine Types Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cuisine Types</Text>
        <View style={styles.cuisineList}>
          {['Italian', 'French', 'Japanese', 'Indian', 'Mediterranean', 'Mexican'].map(cuisine => (
            <TouchableOpacity key={cuisine} style={styles.cuisineItem}>
              <Text style={styles.cuisineText}>{cuisine}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Price Range Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Price Range</Text>
        <View style={styles.priceRanges}>
          {['$', '$$', '$$$', '$$$$'].map(range => (
            <TouchableOpacity key={range} style={styles.priceButton}>
              <Text style={styles.priceText}>{range}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Bookings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Recent Bookings</Text>
        <View style={styles.bookingsList}>
          <Text style={styles.emptyText}>No recent bookings</Text>
        </View>
      </View>

      {/* Saved Chefs Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Saved Chefs</Text>
        <View style={styles.savedChefsList}>
          <Text style={styles.emptyText}>No saved chefs yet</Text>
        </View>
      </View>

      {/* Help Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Need Help?</Text>
        <TouchableOpacity style={styles.helpButton}>
          <MaterialIcons name="help-outline" size={20} color={colors.primary} />
          <Text style={styles.helpText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    backgroundColor: colors.backgroundElevated,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
    height: '100%',
  },
  section: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  filterButtons: {
    gap: spacing.sm,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: borderRadius.sm,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  filterText: {
    marginLeft: spacing.sm,
    color: colors.text,
    fontSize: 14,
  },
  cuisineList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  cuisineItem: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  cuisineText: {
    color: colors.primary,
    fontSize: 12,
  },
  priceRanges: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  priceButton: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: borderRadius.sm,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  priceText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  bookingsList: {
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  savedChefsList: {
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  helpText: {
    marginLeft: spacing.sm,
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
});
