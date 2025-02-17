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
  ViewStyle,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { borderRadius } from '../../theme/utils';
import { responsive } from '../../theme/responsive';

interface Chef {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  // Add other chef properties as needed
}

interface ChefCardProps {
  chef: Chef;
  onPress: () => void;
  style?: ViewStyle;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

export function ChefCard({ chef, onPress, style }: ChefCardProps) {
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
    <Animated.View style={[styles.cardWrapper, { transform: [{ scale }] }, style]}>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
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
              <Text style={styles.cuisine}>{chef.cuisine}</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <MaterialIcons name="star" size={16} color="#FFD700" />
              <Text style={styles.statValue}>{chef.rating.toFixed(1)}</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={16} color="#95A5A6" />
              <Text style={styles.location}>{chef.location}</Text>
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
  cuisine: {
    ...typography.body2,
    color: '#95A5A6',
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
});
