import { Stack } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { NavigationHeaderLeft } from '@components/NavigationHeaderLeft/NavigationHeaderLeft';
import { NavigationHeaderTitle } from '@components/NavigationHeaderTitle/NavigationHeaderTitle';
import useColorScheme from '@hooks/useColorScheme';
import { useNavigation } from 'expo-router';
import { colors } from '@colors';

export default function ProfileStackLayout() {
  const navigation = useNavigation();
  const { isDark } = useColorScheme();
  const toggleDrawer = () => navigation.dispatch(DrawerActions.toggleDrawer());
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.white,
        headerStyle: { backgroundColor: isDark ? colors.blackGray : colors.darkPurple },
        headerTitleStyle: { fontSize: 18 },
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Profile',
          headerTitle: () => <NavigationHeaderTitle />,
          headerLeft: () => <NavigationHeaderLeft onPress={toggleDrawer} />,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen name="details" options={{ title: 'Details' }} />
    </Stack>
  );
}
