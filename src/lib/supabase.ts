import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Get environment variables from .env.dev
const supabaseUrl = 'https://lzsxdjugyqkjkyqxnycj.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6c3hkanVneXFramt5cXhueWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxMjc0ODAsImV4cCI6MjA1NDcwMzQ4MH0.NvgHTNoTTN-JW5gORMDnlVGALEgneuNHflgjOwdhY7c';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
