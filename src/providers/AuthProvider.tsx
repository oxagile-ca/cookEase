import React, { createContext, useContext, useEffect, useState } from 'react';
import { router, useRouter } from 'expo-router';
import { supabase, supabaseApi } from '@/lib/supabase';
import type { Session, User } from '@supabase/supabase-js';
import { Alert } from 'react-native';
import { Button } from 'react-native';

// Define types based on your actual database schema
type UserProfile = {
  id: string;
  full_name: string;
  email: string;
  phone_number?: string;
  profile_image?: string;
  user_role: 'client' | 'chef';
  created_at?: string;
};

type ChefProfile = {
  id: string;
  bio?: string;
  specialties?: string[];
  experience?: number;
  hourly_rate?: number;
  location?: string;
  profile_video?: string;
  created_at?: string;
};

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  chefProfile: ChefProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  signUp: (email: string, password: string, fullName: string, userRole: 'client' | 'chef') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [chefProfile, setChefProfile] = useState<ChefProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Function to handle routing based on user role
  const handleAuthRouting = async (userId: string) => {
    try {
      // Fetch user profile from the correct 'users' table
      const { data: profileData, error: profileError } = await supabase
        .from('users')  // Changed from 'user_profiles' to 'users'
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;

      setUserProfile(profileData);
      console.log("User profile loaded:", profileData);
      console.log("User role:", profileData.user_role);

      // Route based on user role
      if (profileData.user_role === 'chef') {
        // If chef, also fetch chef profile
        const { data: chefData, error: chefError } = await supabase
          .from('chef_profiles')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (!chefError) {
          setChefProfile(chefData);
        }
        
        router.replace('/chef/dashboard');
      } else if (profileData.user_role === 'client') {
        // If the file is @dashboard.tsx, use this path:
        router.replace('/user/dashboard');
      }

      setLoading(false);
    } catch (error) {
      console.error('Error in handleAuthRouting:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        handleAuthRouting(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);
      
      setSession(session);
      setUser(session?.user ?? null);

      if (event === 'SIGNED_IN' && session?.user) {
        await handleAuthRouting(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        console.log("AuthProvider: SIGNED_OUT event detected");
        setUserProfile(null);
        setChefProfile(null);
        router.replace('/login');
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      // Get user profile
      const { data: userData, error: userError } = await supabaseApi.getUserProfile(userId);
      
      if (userError) throw userError;
      
      setUserProfile(userData);
      
      // If user is a chef, get chef profile
      if (userData.user_role === 'chef') {
        const { data: chefData, error: chefError } = await supabaseApi.getChefProfile(userId);
        
        if (!chefError) {
          setChefProfile(chefData);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.id);
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
      console.log("AuthProvider: Starting signOut process");
      
      // Call Supabase signOut
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("AuthProvider: Supabase signOut error", error);
        throw error;
      }
      
      console.log("AuthProvider: Supabase signOut successful");
      
      // Clear local state
      setUser(null);
      setSession(null);
      setUserProfile(null);
      setChefProfile(null);
      
      console.log("AuthProvider: Local state cleared");
      
      // Force navigation to login
      router.replace('/login');
      
      console.log("AuthProvider: Navigation to login triggered");
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  const signUp = async (email: string, password: string, fullName: string, userRole: 'client' | 'chef') => {
    try {
      console.log(`Signing up with role: ${userRole}`); // Debug log
      
      // First, create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            user_role: userRole,
          }
        }
      });

      if (authError) throw authError;

      // Then create the user profile in the correct 'users' table
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('users')  // Changed from 'user_profiles' to 'users'
          .insert({
            id: authData.user.id,
            full_name: fullName,
            email: email,
            user_role: userRole,
          });

        if (profileError) throw profileError;
      }

      return { success: true };
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        session, 
        userProfile,
        chefProfile,
        loading, 
        signIn, 
        signOut,
        refreshProfile,
        signUp
      }}
    >
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
