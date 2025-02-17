import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { responsive } from '../../theme/responsive';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search chefs or cuisines...',
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={24} color="#666" style={styles.searchIcon} />

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#666"
        returnKeyType="search"
        clearButtonMode="while-editing"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')} style={styles.clearButton}>
          <MaterialIcons name="close" size={20} color="#666" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: responsive.spacing.sm,
    marginBottom: responsive.spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  searchIcon: {
    marginRight: responsive.spacing.xs,
  },
  input: {
    flex: 1,
    fontSize: responsive.isSmallScreen ? 16 : 18,
    color: '#000',
    height: '100%',
  },
  clearButton: {
    padding: responsive.spacing.xs,
    marginLeft: responsive.spacing.xs,
  },
});
