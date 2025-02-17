import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '../../src/hooks/useTheme';
import { supabase } from '../../src/lib/supabase';
import { spacing, typography, borderRadius } from '../../src/theme/utils';
import { useAuth } from '@/providers/AuthProvider';

export default function LoginScreen() {
  const { colors } = useTheme();
  const { signIn } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Call signIn from AuthProvider after successful Supabase auth
      await signIn(email, password);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Welcome Back</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Sign in to continue</Text>

        {error && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>}

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.backgroundSecondary,
              borderColor: colors.border,
              color: colors.text,
            },
          ]}
          placeholder="Email"
          placeholderTextColor={colors.textTertiary}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.backgroundSecondary,
              borderColor: colors.border,
              color: colors.text,
            },
          ]}
          placeholder="Password"
          placeholderTextColor={colors.textTertiary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleLogin}
          disabled={loading}>
          <Text style={[styles.buttonText, { color: colors.white }]}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        <Link href="/forgot-password" style={[styles.link, { color: colors.primary }]}>
          Forgot Password?
        </Link>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Don't have an account?{' '}
          </Text>
          <Link href="/(auth)/register" style={[styles.link, { color: colors.primary }]}>
            Register
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'center',
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body1,
    marginBottom: spacing.xl,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  button: {
    height: 48,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  buttonText: {
    ...typography.body1,
    fontWeight: '600',
  },
  error: {
    ...typography.body2,
    marginBottom: spacing.md,
  },
  link: {
    ...typography.body2,
    fontWeight: '600',
    marginTop: spacing.md,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    ...typography.body2,
  },
});
