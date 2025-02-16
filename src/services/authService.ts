import { supabase } from '../lib/supabase';
import { Alert } from 'react-native';

export type UserType = 'user' | 'chef';

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  userType: UserType;
}

export interface AuthResponse {
  user: any | null;
  error: Error | null;
}

export const authService = {
  async signUp({ email, password, fullName, phone, userType }: SignUpData): Promise<AuthResponse> {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone,
            user_type: userType,
          },
        },
      });

      if (error) throw error;

      if (user) {
        // Create profile in profiles table
        const { error: profileError } = await supabase.from('profiles').insert([
          {
            id: user.id,
            full_name: fullName,
            phone,
            user_type: userType,
          },
        ]);

        if (profileError) throw profileError;
      }

      return { user, error: null };
    } catch (error: any) {
      console.error('Sign up error:', error);
      return { user: null, error };
    }
  },

  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return { user, error: null };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { user: null, error };
    }
  },

  async signInWithGoogle(): Promise<void> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'yourapp://auth/callback',
        },
      });

      if (error) throw error;
    } catch (error: any) {
      Alert.alert('Error', 'Failed to sign in with Google');
    }
  },

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Error', error.message);
    }
  },

  async resendVerificationEmail(email: string) {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });

    if (error) throw error;
    return { success: true };
  },
};
