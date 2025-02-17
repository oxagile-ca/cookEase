import { useColorScheme as useNativeColorScheme } from 'react-native';

export default function useColorScheme() {
  const colorScheme = useNativeColorScheme();
  return colorScheme ?? 'light';
}
