import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView, useWindowDimensions } from 'react-native';
import { Stack } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/hooks/useTheme';
import { SearchBar } from '@/components/common/SearchBar';
import { ChefCard } from '@/components/chef/ChefCard';
import { HomeSidebar } from '@/components/home/HomeSidebar';
import { BrandHeader } from '@/components/header/BrandHeader';
import { spacing } from '@/theme/utils';
import { responsive } from '@/theme/responsive';
import { colors } from '@/theme/colors';

interface Chef {
  id: string;
  name: string;
  image: string;
  specialties: string[];
  rating: number;
  price_per_hour: number;
  location: string;
}

export default function HomeScreen() {
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { width } = useWindowDimensions();
  //const { colors } = useTheme();
  const isSmallScreen = width < responsive.sm;

  const loadChefs = async (query: string = '') => {
    try {
      setLoading(true);
      let chefQuery = supabase.from('chefs').select('*');

      if (query) {
        chefQuery = chefQuery.or(`name.ilike.%${query}%,specialties.cs.{${query}}`);
      }

      const { data, error } = await chefQuery;

      if (error) throw error;
      setChefs(data || []);
    } catch (error) {
      console.error('Error loading chefs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChefs();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    loadChefs(query);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <BrandHeader />,
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
          <SearchBar
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Search chefs or cuisines..."
          />

          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
          ) : (
            <ScrollView
              contentContainerStyle={styles.chefGrid}
              showsVerticalScrollIndicator={false}>
              {chefs.map(chef => (
                <ChefCard key={chef.id} chef={chef} style={styles.chefCard} />
              ))}
            </ScrollView>
          )}
        </View>

        {(!isSmallScreen || isSidebarOpen) && (
          <HomeSidebar
            style={[
              styles.sidebar,
              isSmallScreen && styles.mobileSidebar,
              isSmallScreen && {
                transform: [{ translateX: isSidebarOpen ? 0 : responsive.getSidebarWidth() }],
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
    padding: spacing.md,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chefGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  chefCard: {
    flex: 1,
    minWidth: 280,
    maxWidth: 400,
  },
  sidebar: {
    width: responsive.getSidebarWidth(),
    backgroundColor: colors.backgroundElevated,
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
});
