import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ChefCard } from './ChefCard';
import { useChefs } from '@/hooks/useChefs';
import { router } from 'expo-router';
import { responsive } from '@/theme/responsive';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';

export function ChefList() {
  const { chefs, loading, error } = useChefs();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const handleChefPress = (chefId: string) => {
    router.push(`/chef/${chefId}`);
  };

  return (
    <FlatList
      data={chefs}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <ChefCard chef={item} onPress={() => handleChefPress(item.id)} style={styles.card} />
      )}
      numColumns={responsive.isSmallScreen ? 1 : 2}
      contentContainerStyle={styles.container}
      columnWrapperStyle={!responsive.isSmallScreen ? styles.row : undefined}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: responsive.spacing.sm,
    gap: responsive.spacing.md,
  },
  row: {
    gap: responsive.spacing.md,
    justifyContent: 'flex-start',
  },
  card: {
    flex: 1,
    maxWidth: responsive.isSmallScreen ? '100%' : 400,
    minWidth: 280,
  },
});
