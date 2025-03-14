import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../../hooks/useTheme';
import { spacing, borderRadius, typography } from '../../../theme/utils';

interface QuickActionsProps {
  onBook: () => void;
  onChat: () => void;
  onFavorite: () => void;
  isFavorited: boolean;
}

export default function QuickActions({
  onBook,
  onChat,
  onFavorite,
  isFavorited,
}: QuickActionsProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.bookButton, { backgroundColor: colors.primary }]}
        onPress={onBook}>
        <MaterialIcons name="restaurant" size={24} color={colors.white} />
        <Text style={[styles.bookButtonText, { color: colors.white }]}>Book Now</Text>
      </TouchableOpacity>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.backgroundElevated }]}
          onPress={onChat}>
          <MaterialIcons name="chat" size={24} color={colors.text} />
          <Text style={[styles.actionButtonText, { color: colors.text }]}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.backgroundElevated }]}
          onPress={onFavorite}>
          <MaterialIcons
            name={isFavorited ? 'favorite' : 'favorite-border'}
            size={24}
            color={isFavorited ? colors.error : colors.text}
          />
          <Text style={[styles.actionButtonText, { color: colors.text }]}>
            {isFavorited ? 'Saved' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  bookButtonText: {
    ...typography.body1,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionButtonText: {
    ...typography.body2,
    marginLeft: spacing.xs,
  },
});
