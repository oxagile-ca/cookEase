import { Stack } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';

export default function MainLayout() {
  const { user } = useAuth();
  const isChef = user?.user_type === 'chef';

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      {isChef ? <Stack.Screen name="(chef)" /> : <Stack.Screen name="(tabs)" />}
    </Stack>
  );
}
