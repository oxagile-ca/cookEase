import { Stack } from 'expo-router';
import { useAuth } from '../src/hooks/useAuth';
import { View, ActivityIndicator } from 'react-native';
import { ThemeProvider } from '../src/providers/ThemeProvider';

export default function RootLayout() {
  const { loading } = useAuth();

  return (
    <ThemeProvider>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#2B2B2B',
          }}>
          <ActivityIndicator size="large" color="#E0C385" />
        </View>
      ) : (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
        </Stack>
      )}
    </ThemeProvider>
  );
}
