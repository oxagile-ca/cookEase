import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export default function BottomTabs() {
  const [active, setActive] = React.useState('home');

  const tabs = [
    { key: 'home', icon: 'home', label: 'Home' },
    { key: 'bookings', icon: 'event', label: 'Bookings' },
    { key: 'favorites', icon: 'favorite', label: 'Favorites' },
    { key: 'profile', icon: 'person', label: 'Profile' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <TouchableOpacity key={tab.key} style={styles.tab} onPress={() => setActive(tab.key)}>
          <MaterialIcons
            name={tab.icon as any}
            size={24}
            color={active === tab.key ? colors.primary : colors.gray}
          />
          <Text style={[styles.label, active === tab.key && styles.activeLabel]}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    paddingBottom: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray + '20',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 4,
  },
  activeLabel: {
    color: colors.primary,
  },
});
