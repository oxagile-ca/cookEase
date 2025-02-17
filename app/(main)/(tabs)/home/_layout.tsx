import { Stack } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { NavigationHeaderLeft } from '@components/NavigationHeaderLeft/NavigationHeaderLeft';
import { NavigationHeaderTitle } from '@components/NavigationHeaderTitle/NavigationHeaderTitle';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useNavigation } from 'expo-router';
import { colors } from '@/theme/colors';

export default function HomeStackLayout() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const toggleDrawer = () => navigation.dispatch(DrawerActions.toggleDrawer());
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? colors.blackGray : colors.darkPurple,
        },
        headerTitleStyle: { fontSize: 18 },
        headerShown: true,
        contentStyle: {
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
        },
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitle: () => <NavigationHeaderTitle />,
          headerLeft: () => <NavigationHeaderLeft onPress={toggleDrawer} />,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen name="details" options={{ title: 'Details' }} />
    </Stack>
  );
}
