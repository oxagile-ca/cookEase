import { Stack } from 'expo-router';
import { useAuth } from '../../../src/hooks/useAuth';

export default function ChefLayout() {
  const { session } = useAuth();

  if (!session) return null;

  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Chef Details',
        }}
      />
    </Stack>
  );
}
