import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { spacing, borderRadius } from '../../../theme/utils';
import QuickActions from './QuickActions';
import ChefSummary from './ChefSummary';
import Recommendations from './Recommendations';
import BookingInfo from './BookingInfo';
import Notifications from './Notifications';
import SocialFeatures from './SocialFeatures';

interface Chef {
  id: string;
  isFavorited: boolean;
  // Add other chef properties as needed
}

interface RightRailProps {
  chef: Chef;
  onBook: () => void;
  onChat: () => void;
  onFavorite: () => void;
}

export default function RightRail({ chef, onBook, onChat, onFavorite }: RightRailProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.backgroundSecondary, borderLeftColor: colors.border },
      ]}>
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
  },
  scroll: {
    flex: 1,
    padding: spacing.md,
  },
});
