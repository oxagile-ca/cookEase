import { Stack } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';

export default function MainLayout() {
  const { user } = useAuth();
  const userRole = user?.user_role || 'client';

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      {userRole === 'chef' ? <Stack.Screen name="(chef)" /> : <Stack.Screen name="(user)" />}
    </Stack>
  );
}
