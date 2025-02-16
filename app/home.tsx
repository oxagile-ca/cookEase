import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../src/hooks/useAuth';
import { useTheme } from '../src/hooks/useTheme';
import { Redirect } from 'expo-router';

export default function HomeScreen() {
  const { user, session } = useAuth();
  const { colors } = useTheme();

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: colors.background }}>
      <Text style={{ fontSize: 24, color: colors.text }}>Welcome, {user?.email}</Text>
    </View>
  );
}
