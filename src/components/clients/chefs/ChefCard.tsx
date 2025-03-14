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
  Pressable,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import { borderRadius } from '../../../theme/utils';
import { responsive } from '@/theme/responsive';
import { Chef } from '@/api/chefs';
import { useTheme } from '@/hooks/useTheme';
import { router } from 'expo-router';

interface ChefCardProps {
  chef: Chef;
  style?: ViewStyle;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

export function ChefCard({ chef, style }: ChefCardProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors.backgroundElevated }, style]}
      onPress={() => router.push(`/chef/${chef.id}`)}>
      <Image
        source={chef.image || 'https://via.placeholder.com/150'}
        style={styles.image}
        contentFit="cover"
      />
      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text }]}>{chef.name}</Text>
        <Text style={[styles.specialties, { color: colors.textSecondary }]}>
          {chef.specialties.join(', ')}
        </Text>
        <View style={styles.footer}>
          <Text style={[styles.price, { color: colors.primary }]}>${chef.price_per_hour}/hr</Text>
          <Text style={[styles.rating, { color: colors.textSecondary }]}>
            ⭐️ {chef.rating.toFixed(1)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: spacing.md,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  specialties: {
    fontSize: 14,
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
  },
  rating: {
    fontSize: 14,
  },
});
