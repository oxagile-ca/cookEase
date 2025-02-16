import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

interface Category {
  id: string;
  name: string;
  icon: string;
  items: number;
}

const categories: Category[] = [
  { id: '1', name: 'Italian', icon: 'pasta', items: 24 },
  { id: '2', name: 'Indian', icon: 'food-curry', items: 18 },
  { id: '3', name: 'BBQ', icon: 'grill', items: 12 },
  { id: '4', name: 'Vegan', icon: 'leaf', items: 15 },
  { id: '5', name: 'Asian', icon: 'noodles', items: 20 },
  { id: '6', name: 'Desserts', icon: 'cake', items: 10 },
];

export default function CategorySelector() {
  const [selected, setSelected] = React.useState('1');

  const renderIcon = (iconName: string) => {
    // Icons that are in MaterialCommunityIcons
    const communityIcons = ['pasta', 'food-curry', 'noodles', 'leaf'];

    if (communityIcons.includes(iconName)) {
      return <MaterialCommunityIcons name={iconName as any} size={24} color={colors.primary} />;
    }

    // Icons that are in MaterialIcons
    return <MaterialIcons name={iconName as any} size={24} color={colors.primary} />;
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {categories.map(category => (
        <TouchableOpacity
          key={category.id}
          style={[styles.category, selected === category.id && styles.selectedCategory]}
          onPress={() => setSelected(category.id)}>
          {renderIcon(category.icon)}
          <Text style={[styles.name, selected === category.id && styles.selectedText]}>
            {category.name}
          </Text>
          <Text style={[styles.items, selected === category.id && styles.selectedText]}>
            {category.items} Chefs
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  category: {
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginRight: 12,
  },
  selectedCategory: {
    backgroundColor: colors.primary,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
  },
  items: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 4,
  },
  selectedText: {
    color: colors.background,
  },
});
