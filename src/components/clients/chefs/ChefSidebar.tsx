import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { borderRadius } from '../../../theme/utils';
import { Chef } from '../../../services/chefService';

interface ChefSidebarProps {
  chef: Chef;
  onBook: () => void;
  onChat: () => void;
  onCheckAvailability: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
}

export function ChefSidebar({
  chef,
  onBook,
  onChat,
  onCheckAvailability,
  onToggleFavorite,
  isFavorite,
}: ChefSidebarProps) {
  return (
    <View style={styles.container}>
      {/* Section 1: Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.bookButton} onPress={onBook}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={onCheckAvailability}>
            <MaterialIcons name="calendar-today" size={24} color={colors.primary} />
            <Text style={styles.actionButtonText}>Check Availability</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={onChat}>
            <MaterialIcons name="chat" size={24} color={colors.primary} />
            <Text style={styles.actionButtonText}>Chat with Chef</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={onToggleFavorite}>
            <MaterialIcons
              name={isFavorite ? 'favorite' : 'favorite-border'}
              size={24}
              color={isFavorite ? colors.error : colors.primary}
            />
            <Text style={styles.actionButtonText}>
              {isFavorite ? 'Saved' : 'Save to Favorites'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Section 2: Chef's Profile Summary */}
      <View style={styles.profileSummary}>
        <Image source={{ uri: chef.image }} style={styles.profileImage} />
        <Text style={styles.chefName}>{chef.name}</Text>

        <View style={styles.locationContainer}>
          <MaterialIcons name="location-on" size={20} color={colors.textSecondary} />
          <Text style={styles.locationText}>{chef.location}</Text>
        </View>

        <View style={styles.specialtiesContainer}>
          {chef.specialties.map((specialty, index) => (
            <View key={index} style={styles.specialtyTag}>
              <Text style={styles.specialtyText}>{specialty}</Text>
            </View>
          ))}
        </View>

        <View style={styles.ratingContainer}>
          <MaterialIcons name="star" size={24} color="#F1C40F" />
          <Text style={styles.rating}>{chef.rating.toFixed(1)}</Text>
          <Text style={styles.ratingCount}>({chef.total_ratings} reviews)</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>${chef.price_per_hour}</Text>
          <Text style={styles.priceLabel}>/hour</Text>
        </View>
      </View>

      {/* Section 3: Recommendations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Similar Chefs</Text>
        {/* Add recommendation cards here */}
      </View>

      {/* Section 4: Bookings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Bookings</Text>
        {/* Add booking timeline here */}
      </View>

      {/* Section 5: Notifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Updates</Text>
        {/* Add notification items here */}
      </View>

      {/* Section 6: Social */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Community</Text>
        {/* Add social features here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    backgroundColor: colors.backgroundElevated,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
    height: '100%',
  },
  quickActions: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  bookButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  bookButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtons: {
    gap: spacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.backgroundElevated,
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
  actionButtonText: {
    marginLeft: spacing.sm,
    color: colors.text,
    fontSize: 14,
  },
  profileSummary: {
    padding: spacing.md,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: spacing.sm,
  },
  chefName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  locationText: {
    marginLeft: spacing.xs,
    color: colors.textSecondary,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  specialtyTag: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  specialtyText: {
    color: colors.primary,
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  rating: {
    marginLeft: spacing.xs,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  ratingCount: {
    marginLeft: spacing.xs,
    color: colors.textSecondary,
    fontSize: 14,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  priceLabel: {
    marginLeft: spacing.xs,
    color: colors.textSecondary,
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
});
