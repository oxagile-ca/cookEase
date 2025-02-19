import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
  },
});

export default function NavigationHeaderTitle() {
  return <Text style={styles.title}>COOKEASE</Text>;
}
