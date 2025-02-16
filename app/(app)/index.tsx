import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { chefService, Chef } from '../../src/services/chefService';
import ChefCard from '../../src/components/chef/ChefCard';
import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';
import { borderRadius } from '../../src/theme/utils';
import { router, Stack } from 'expo-router';
import { HomeSidebar } from '../../src/components/home/HomeSidebar';
import { BrandHeader } from '../../src/components/header/BrandHeader';

export default function HomeScreen() {
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const loadChefs = async (query: string = '') => {
    try {
      setError(null);
      const data = query ? await chefService.searchChefs(query) : await chefService.getAllChefs();
      setChefs(data);
    } catch (err) {
      setError('Failed to load chefs. Please try again.');
      console.error('Error loading chefs:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadChefs();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadChefs();
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setLoading(true);
    loadChefs(query);
  };

  if (loading && !refreshing) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <BrandHeader />,
        }}
      />
      <View style={styles.pageContainer}>
        <View style={styles.mainContent}>
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={24} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={handleSearch}
              placeholder="Search chefs or cuisines..."
              placeholderTextColor={colors.textSecondary}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch('')}>
                <MaterialIcons name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>

          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={() => loadChefs()}>
                <Text style={styles.retryText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={chefs}
              renderItem={({ item }) => (
                <ChefCard
                  chef={item}
                  onPress={() => {
                    router.push(`/chef/${item.id}`);
                  }}
                />
              )}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  colors={[colors.primary]}
                />
              }
              ListEmptyComponent={() => (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    {searchQuery
                      ? 'No chefs found matching your search'
                      : 'No chefs available at the moment'}
                  </Text>
                </View>
              )}
            />
          )}
        </View>

        <HomeSidebar />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContent: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundElevated,
    margin: spacing.md,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  searchInput: {
    flex: 1,
    marginHorizontal: spacing.sm,
    fontSize: 16,
    color: colors.text,
  },
  listContainer: {
    padding: spacing.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  retryText: {
    color: colors.white,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    fontSize: 16,
  },
});
