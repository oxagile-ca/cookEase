import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../../src/hooks/useAuth';
import { useTheme } from '../../src/hooks/useTheme';

export default function HomeScreen() {
  const { user } = useAuth();
  const { colors, typography } = useTheme();

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: colors.background }}>
      <Text style={{ ...typography.h1, color: colors.text }}>Welcome, {user?.email}</Text>
    </View>
  );
}
