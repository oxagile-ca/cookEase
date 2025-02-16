import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  Animated,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { borderRadius } from '../../theme/utils';

interface ChefCardProps {
  chef: {
    id: string;
    name: string;
    image: string;
    specialties: string[];
    rating: number;
    totalRatings: number;
    location: string;
    pricePerHour: number;
    pickRate: number;
    winRate: number;
  };
  onPress: () => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

export default function ChefCard({ chef, onPress }: ChefCardProps) {
  const scale = React.useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.cardWrapper, { transform: [{ scale }] }]}>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}sub
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={1}>
        <LinearGradient
          colors={['#F9F9F9', '#F0F0F0', '#E8E8E8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}>
          <View style={styles.header}>
            <Image source={{ uri: chef.image }} style={styles.chefImage} resizeMode="cover" />
            <View style={styles.headerInfo}>
              <Text style={styles.name}>{chef.name}</Text>
              <View style={styles.specialtiesContainer}>
                {chef.specialties.map((specialty, index) => (
                  <View key={index} style={styles.specialtyTag}>
                    <Text style={styles.specialtyText}>{specialty}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <MaterialIcons name="star" size={16} color="#F1C40F" />
              <Text style={styles.statValue}>{chef.rating.toFixed(1)}</Text>
              <Text style={styles.statLabel}>({chef.totalRatings})</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <MaterialIcons name="trending-up" size={16} color="#2ECC71" />
              <Text style={styles.statValue}>{chef.pickRate}%</Text>
              <Text style={styles.statLabel}>Pick Rate</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <MaterialIcons name="emoji-events" size={16} color="#FF6B6B" />
              <Text style={styles.statValue}>{chef.winRate}%</Text>
              <Text style={styles.statLabel}>Success Rate</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={16} color="#95A5A6" />
              <Text style={styles.location}>{chef.location}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${chef.pricePerHour}</Text>
              <Text style={styles.priceLabel}>/hour</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: CARD_WIDTH,
    marginBottom: spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#34495E',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  container: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  gradient: {
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  chefImage: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.round,
    marginRight: spacing.md,
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    ...typography.h3,
    color: '#34495E',
    marginBottom: spacing.xs,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  specialtyTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    backgroundColor: '#FF6B6B',
  },
  specialtyText: {
    ...typography.caption,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: '#FFFFFF',
    marginBottom: spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#34495E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statValue: {
    ...typography.body2,
    fontWeight: '600',
    color: '#34495E',
  },
  statLabel: {
    ...typography.caption,
    color: '#95A5A6',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E0E0E0',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  location: {
    ...typography.body2,
    color: '#95A5A6',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
  },
  price: {
    ...typography.h3,
    color: '#2ECC71',
    fontWeight: '700',
  },
  priceLabel: {
    ...typography.caption,
    color: '#95A5A6',
  },
});
