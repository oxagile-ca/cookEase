import React from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';
import CategorySelector from '../../src/components/user/CategorySelector';
import ChefCard from '../../src/components/chef/ChefCard';
import { chefService, type Chef } from '../../src/services/chefService';
import { useRouter } from 'expo-router';

export default function UserHome() {
  const router = useRouter();
  const [chefs, setChefs] = React.useState<Chef[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const loadChefs = React.useCallback(async (category?: string) => {
    try {
      setLoading(true);
      const data = category
        ? await chefService.getChefsByCategory(category)
        : await chefService.getAllChefs();
      setChefs(data);
    } catch (error) {
      console.error('Error loading chefs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadChefs(selectedCategory || undefined);
  }, [loadChefs, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color={colors.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search chefs, cuisines..."
            placeholderTextColor={colors.gray}
          />
          <TouchableOpacity>
            <MaterialIcons name="tune" size={24} color={colors.gray} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <CategorySelector onSelectCategory={handleCategoryChange} />

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
        ) : (
          chefs.map(chef => (
            <ChefCard key={chef.id} chef={chef} onPress={() => router.push(`/chef/${chef.id}`)} />
          ))
        )}
      </ScrollView>

      <TouchableOpacity style={styles.floatingButton}>
        <MaterialIcons name="restaurant-menu" size={24} color={colors.background} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray + '20',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray + '20',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: colors.text,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  loader: {
    marginTop: 40,
  },
});
