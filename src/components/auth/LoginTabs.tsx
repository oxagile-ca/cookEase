import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface LoginTabsProps {
  activeTab: 'user' | 'chef';
  onTabChange: (tab: 'user' | 'chef') => void;
}

const LoginTabs = ({ activeTab, onTabChange }: LoginTabsProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'user' && styles.activeTab]}
        onPress={() => onTabChange('user')}>
        <Text style={[styles.tabText, activeTab === 'user' && styles.activeTabText]}>
          User Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'chef' && styles.activeTab]}
        onPress={() => onTabChange('chef')}>
        <Text style={[styles.tabText, activeTab === 'chef' && styles.activeTabText]}>
          Chef Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.lightGray + '20',
    borderRadius: 12,
    padding: 4,
    marginBottom: 30,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.gray,
    fontWeight: '600',
  },
  activeTabText: {
    color: colors.background,
  },
});

export default LoginTabs;
