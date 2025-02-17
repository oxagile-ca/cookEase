import React from 'react';
import { View, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { ChefCard } from './ChefCard';
import { responsive } from '../../theme/responsive';

interface Chef {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  // Add other chef properties as needed
}

interface ChefListProps {
  chefs: Chef[];
  onChefPress: (chef: Chef) => void;
}

export function ChefList({ chefs, onChefPress }: ChefListProps) {
  const { width } = useWindowDimensions();

  // Calculate number of columns based on screen width
  const getNumColumns = () => {
    if (width < responsive.sm) return 1;
    if (width < responsive.md) return 2;
    return 3;
  };

  return (
    <FlatList
      data={chefs}
      renderItem={({ item }) => (
        <ChefCard chef={item} onPress={() => onChefPress(item)} style={styles.card} />
      )}
      numColumns={getNumColumns()}
      key={getNumColumns()} // Force re-render when columns change
      contentContainerStyle={styles.container}
      columnWrapperStyle={getNumColumns() > 1 ? styles.row : undefined}
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
