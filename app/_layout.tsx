import { Stack } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { AuthProvider } from '@/providers/AuthProvider';

export default function RootLayout() {
  const { colors } = useTheme();

  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.backgroundElevated,
          },
          headerTintColor: colors.text,
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
    </AuthProvider>
  );
}
