import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { spacing, borderRadius } from '../../theme/utils';
import QuickActions from './RightRail/QuickActions';
import ChefSummary from './RightRail/ChefSummary';
import Recommendations from './RightRail/Recommendations';
import BookingInfo from './RightRail/BookingInfo';
import Notifications from './RightRail/Notifications';
import SocialFeatures from './RightRail/SocialFeatures';

interface RightRailProps {
  chef: Chef;
  onBook: () => void;
  onChat: () => void;
  onFavorite: () => void;
}

export default function RightRail({ chef, onBook, onChat, onFavorite }: RightRailProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundSecondary }]}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <QuickActions
          onBook={onBook}
          onChat={onChat}
          onFavorite={onFavorite}
          isFavorited={chef.isFavorited}
        />

        <ChefSummary chef={chef} />

        <Recommendations chefId={chef.id} />

        <BookingInfo />

        <Notifications />

        <SocialFeatures chefId={chef.id} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
  },
  scroll: {
    flex: 1,
    padding: spacing.md,
  },
});
