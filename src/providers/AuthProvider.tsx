import React, { createContext, useContext, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import type { Session, User } from '@supabase/supabase-js';
import { Alert } from 'react-native';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      handleInitialRoute(session?.user);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      handleInitialRoute(session?.user);
    });
  }, []);

  const handleInitialRoute = async (user: User | null) => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Check if user is a chef
      const { data: chefData } = await supabase
        .from('chefs')
        .select('is_profile_complete')
        .eq('user_id', user.id)
        .single();

      if (chefData) {
        // User is a chef
        if (!chefData.is_profile_complete) {
          router.replace('/(main)/(chef)/profile-setup');
        } else {
          router.replace('/(main)/(chef)/dashboard');
        }
      } else {
        // User is a regular user
        router.replace('/(main)/(user)/dashboard');
      }
    } catch (error) {
      console.error('Error checking user role:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Clear any stored state/data if needed
      setUser(null);
      setSession(null);

      // Navigate to login screen with correct path
      router.replace('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
