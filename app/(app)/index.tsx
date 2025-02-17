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
  useWindowDimensions,
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
import { SearchBar } from '../../src/components/common/SearchBar';
import useColorScheme from '../../src/hooks/useColorScheme';
import { responsive } from '../../src/theme/responsive';
import { ChefList } from '../../src/components/chef/ChefList';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { width } = useWindowDimensions();
  const isSmallScreen = width < responsive.sm;

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChefPress = chef => {
    router.push(`/chef/${chef.id}`);
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
      <View
        style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
        <View style={styles.content}>
          {isSmallScreen && (
            <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
              <MaterialIcons
                name={isSidebarOpen ? 'close' : 'menu'}
                size={24}
                color={colorScheme === 'dark' ? '#fff' : '#000'}
              />
            </TouchableOpacity>
          )}

          <SearchBar
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Search chefs or cuisines..."
          />

          <ChefList chefs={chefs} onChefPress={handleChefPress} />
        </View>

        {/* Responsive Sidebar */}
        {(!isSmallScreen || isSidebarOpen) && (
          <HomeSidebar
            style={[
              styles.sidebar,
              isSmallScreen && styles.mobileSidebar,
              isSmallScreen && {
                transform: [
                  {
                    translateX: isSidebarOpen ? 0 : responsive.getSidebarWidth(),
                  },
                ],
              },
            ]}
            onClose={isSmallScreen ? toggleSidebar : undefined}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    padding: responsive.spacing.md,
  },
  mainContent: {
    flex: 1,
    marginRight: responsive.isSmallScreen ? 0 : responsive.spacing.md,
  },
  sidebar: {
    width: responsive.getSidebarWidth(),
    backgroundColor: '#f5f5f5',
  },
  mobileSidebar: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  menuButton: {
    padding: responsive.spacing.sm,
    marginBottom: responsive.spacing.sm,
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
  listContainer: {
    padding: spacing.md,
  },
});
