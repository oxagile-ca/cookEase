import { Stack } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import NavigationHeaderLeft from '@/components/NavigationHeaderLeft/NavigationHeaderLeft';
import NavigationHeaderTitle from '@/components/NavigationHeaderTitle/NavigationHeaderTitle';
import { useTheme } from '@/hooks/useTheme';
import { useNavigation } from 'expo-router';

export default function ChefLayout() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const toggleDrawer = () => navigation.dispatch(DrawerActions.toggleDrawer());

  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.backgroundElevated,
        },
        headerTitleStyle: { fontSize: 18 },
        headerShown: true,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Chef Dashboard',
          headerTitle: () => <NavigationHeaderTitle />,
          headerLeft: () => <NavigationHeaderLeft onPress={toggleDrawer} />,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen name="orders" options={{ title: 'Orders' }} />
      <Stack.Screen name="menu" options={{ title: 'Menu' }} />
    </Stack>
  );
}
