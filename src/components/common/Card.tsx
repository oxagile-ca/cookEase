import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { spacing } from '@/theme/utils';

interface CardProps {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

export function Card({ title, subtitle, children, onPress, style }: CardProps) {
  const { colors } = useTheme();

  const CardContainer = onPress ? TouchableOpacity : View;

  return (
    <CardContainer
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundElevated,
          borderColor: colors.border,
        },
        style,
      ]}
      onPress={onPress}>
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && <Text style={[styles.title, { color: colors.text }]}>{title}</Text>}
          {subtitle && (
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
          )}
        </View>
      )}
      {children}
    </CardContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  header: {
    padding: spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
  },
});
