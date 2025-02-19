import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../src/hooks/useTheme';
import { supabase } from '../../src/lib/supabase';
import { spacing, typography, borderRadius } from '../../src/theme/utils';
import { useAuth } from '@/providers/AuthProvider';
import LoginTabs from '@/components/auth/LoginTabs';

type UserType = 'user' | 'chef';

export default function LoginScreen() {
  const { colors } = useTheme();
  const { signIn } = useAuth();
  const { type = 'user' } = useLocalSearchParams<{ type: UserType }>();
  const [activeTab, setActiveTab] = React.useState<UserType>(type);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Sign in with Supabase auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // 2. Get user profile from user_profiles table
      const { data: userProfiles, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', authData.user.id);

      if (profileError) throw profileError;

      // Check if profile exists
      if (!userProfiles || userProfiles.length === 0) {
        // Create profile if it doesn't exist
        const { error: createProfileError } = await supabase.from('user_profiles').insert({
          id: authData.user.id,
          email: email,
          user_type: activeTab,
          created_at: new Date().toISOString(),
        });

        if (createProfileError) throw createProfileError;
      } else {
        const userProfile = userProfiles[0];

        // If user_type doesn't exist, update it
        if (!userProfile.user_type) {
          const { error: updateError } = await supabase
            .from('user_profiles')
            .update({ user_type: activeTab })
            .eq('id', authData.user.id);

          if (updateError) throw updateError;
        } else if (userProfile.user_type !== activeTab) {
          throw new Error(
            `This account is registered as a ${userProfile.user_type || 'user'}. Please use the correct login tab.`,
          );
        }
      }

      // 3. If chef, ensure chef profile exists
      if (activeTab === 'chef') {
        const { data: chefData, error: chefError } = await supabase
          .from('chefs')
          .select('*')
          .eq('id', authData.user.id);

        if (chefError) throw chefError;

        if (!chefData || chefData.length === 0) {
          const { error: createChefError } = await supabase.from('chefs').insert({
            id: authData.user.id,
            name: userProfiles[0].first_name + ' ' + userProfiles[0].last_name,
            image: '',
            specialties: [],
            rating: 0,
            total_ratings: 0,
            location: '',
            price_per_hour: 0,
            pick_rate: 0,
            win_rate: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });

          if (createChefError) throw createChefError;
        }
      }

      // 4. Call signIn from AuthProvider
      await signIn(email, password, activeTab);
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
      Alert.alert('Error', error.message);
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

        <LoginTabs activeTab={activeTab} onTabChange={setActiveTab} />

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
            {loading ? 'Signing in...' : `Sign In as ${activeTab === 'user' ? 'User' : 'Chef'}`}
          </Text>
        </TouchableOpacity>

        <Link href="/forgot-password" style={[styles.link, { color: colors.primary }]}>
          Forgot Password?
        </Link>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Don't have an account?{' '}
          </Text>
          <Link
            href={`/(auth)/register?type=${activeTab}`}
            style={[styles.link, { color: colors.primary }]}>
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
