import { Stack } from 'expo-router';
import { ThemeProvider } from '../src/providers/ThemeProvider';
import { AuthProvider } from '../src/providers/AuthProvider';
import { useAuth } from '@/providers/AuthProvider';

function RootLayoutNav() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      {!isAuthenticated ? (
        <Stack.Screen name="login" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RootLayoutNav />
      </ThemeProvider>
    </AuthProvider>
  );
}
