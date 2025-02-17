import { Tabs } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '@/theme/colors';

export default function TabsLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: colors.gray,
        tabBarInactiveBackgroundColor: colorScheme.isDark ? colors.blackGray : colors.white,
        tabBarActiveTintColor: colors.lightPurple,
        tabBarActiveBackgroundColor: colorScheme.isDark ? colors.blackGray : colors.white,
      }}>
      {/* Tab screens will be automatically added based on the file structure */}
    </Tabs>
  );
}
