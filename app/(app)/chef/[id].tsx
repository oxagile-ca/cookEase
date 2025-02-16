import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { chefService, Chef } from '../../../src/services/chefService';
import { colors } from '../../../src/theme/colors';
import { spacing } from '../../../src/theme/spacing';
import { borderRadius } from '../../../src/theme/utils';
import { ChefSidebar } from '../../../src/components/chef/ChefSidebar';

export default function ChefDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [chef, setChef] = useState<Chef | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadChefDetails();
  }, [id]);

  const loadChefDetails = async () => {
    try {
      setLoading(true);
      const data = await chefService.getChefById(id as string);
      setChef(data);
    } catch (err) {
      setError('Failed to load chef details');
      console.error('Error loading chef:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error || !chef) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>{error || 'Chef not found'}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadChefDetails}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.pageContainer}>
      <ScrollView style={styles.mainContent}>
        <Stack.Screen
          options={{
            title: chef.name,
            headerBackTitle: 'Back',
          }}
        />
        <Image source={{ uri: chef.image }} style={styles.chefImage} resizeMode="cover" />

        <View style={styles.content}>
          {/* Chef Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <MaterialIcons name="star" size={24} color="#F1C40F" />
              <Text style={styles.statValue}>{chef.rating.toFixed(1)}</Text>
              <Text style={styles.statLabel}>({chef.total_ratings})</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <MaterialIcons name="trending-up" size={24} color="#2ECC71" />
              <Text style={styles.statValue}>{chef.pick_rate}%</Text>
              <Text style={styles.statLabel}>Pick Rate</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <MaterialIcons name="emoji-events" size={24} color="#E74C3C" />
              <Text style={styles.statValue}>{chef.win_rate}%</Text>
              <Text style={styles.statLabel}>Success Rate</Text>
            </View>
          </View>

          {/* Specialties */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Specialties</Text>
            <View style={styles.specialtiesContainer}>
              {chef.specialties.map((specialty, index) => (
                <View key={index} style={styles.specialtyTag}>
                  <Text style={styles.specialtyText}>{specialty}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Location */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={20} color={colors.textSecondary} />
              <Text style={styles.locationText}>{chef.location}</Text>
            </View>
          </View>

          {/* Pricing */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pricing</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${chef.price_per_hour}</Text>
              <Text style={styles.priceLabel}>/hour</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {chef && (
        <ChefSidebar
          chef={chef}
          onBook={() => {
            // Handle booking
            console.log('Book chef:', chef.id);
          }}
          onChat={() => {
            // Handle chat
            console.log('Chat with chef:', chef.id);
          }}
          onCheckAvailability={() => {
            // Handle availability check
            console.log('Check availability:', chef.id);
          }}
          onToggleFavorite={() => {
            // Handle favorite toggle
            console.log('Toggle favorite:', chef.id);
          }}
          isFavorite={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContent: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chefImage: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.backgroundElevated,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.xxs,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: colors.border,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  specialtyTag: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  specialtyText: {
    color: colors.primary,
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: colors.textSecondary,
    marginLeft: spacing.xs,
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
  errorText: {
    color: colors.error,
    marginBottom: spacing.md,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  retryText: {
    color: colors.white,
    fontWeight: '600',
  },
});
