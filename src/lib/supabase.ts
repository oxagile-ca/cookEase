import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Get environment variables from .env.dev
const supabaseUrl = 'https://lzsxdjugyqkjkyqxnycj.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6c3hkanVneXFramt5cXhueWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxMjc0ODAsImV4cCI6MjA1NDcwMzQ4MH0.NvgHTNoTTN-JW5gORMDnlVGALEgneuNHflgjOwdhY7c';

// Create the base client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
  },
});

// API wrapper for your actual database schema
export const supabaseApi = {
  // User operations
  async getUserProfile(userId: string) {
    return await supabase.from('users').select('*').eq('id', userId).single();
  },

  async updateUserProfile(userId: string, data: any) {
    return await supabase.from('users').update(data).eq('id', userId).select().single();
  },

  // Chef operations
  async getChefProfile(chefId: string) {
    return await supabase
      .from('chefs')
      .select(
        `
        *,
        users!inner(*)
      `,
      )
      .eq('id', chefId)
      .single();
  },

  async updateChefProfile(chefId: string, data: any) {
    return await supabase.from('chefs').update(data).eq('id', chefId).select().single();
  },

  async getAllChefs(filters = {}) {
    let query = supabase.from('chefs').select(`
        *,
        users!inner(*)
      `);

    // Apply filters if provided
    if (filters.specialties) {
      query = query.contains('specialties', filters.specialties);
    }

    if (filters.minRate) {
      query = query.gte('hourly_rate', filters.minRate);
    }

    if (filters.maxRate) {
      query = query.lte('hourly_rate', filters.maxRate);
    }

    return await query;
  },

  // Booking operations
  async createBooking(data: any) {
    return await supabase.from('bookings').insert(data).select().single();
  },

  async getUserBookings(userId: string) {
    return await supabase
      .from('bookings')
      .select(
        `
        *,
        chefs(*, users(*))
      `,
      )
      .eq('user_id', userId)
      .order('booking_date', { ascending: false });
  },

  async getChefBookings(chefId: string) {
    return await supabase
      .from('bookings')
      .select(
        `
        *,
        users(*)
      `,
      )
      .eq('chef_id', chefId)
      .order('booking_date', { ascending: false });
  },

  async updateBookingStatus(bookingId: string, status: string) {
    return await supabase.from('bookings').update({ status }).eq('id', bookingId).select().single();
  },

  // Payment operations
  async createPayment(data: any) {
    return await supabase.from('payments').insert(data).select().single();
  },

  async getPaymentByBooking(bookingId: string) {
    return await supabase.from('payments').select('*').eq('booking_id', bookingId).single();
  },

  // Review operations
  async createReview(data: any) {
    return await supabase.from('reviews').insert(data).select().single();
  },

  async getChefReviews(chefId: string) {
    return await supabase
      .from('reviews')
      .select(
        `
        *,
        users(*)
      `,
      )
      .eq('chef_id', chefId)
      .order('created_at', { ascending: false });
  },

  // Availability operations
  async getChefAvailability(chefId: string) {
    return await supabase
      .from('availability')
      .select('*')
      .eq('chef_id', chefId)
      .order('available_date', { ascending: true });
  },

  async addAvailabilitySlot(data: any) {
    return await supabase.from('availability').insert(data).select().single();
  },

  async removeAvailabilitySlot(slotId: string) {
    return await supabase.from('availability').delete().eq('id', slotId);
  },

  // Saved chefs operations
  async saveChef(userId: string, chefId: string) {
    return await supabase
      .from('saved_chefs')
      .insert({
        user_id: userId,
        chef_id: chefId,
      })
      .select()
      .single();
  },

  async unsaveChef(userId: string, chefId: string) {
    return await supabase.from('saved_chefs').delete().match({
      user_id: userId,
      chef_id: chefId,
    });
  },

  async getSavedChefs(userId: string) {
    return await supabase
      .from('saved_chefs')
      .select(
        `
        *,
        chefs!inner(*),
        chefs!inner(users(*))
      `,
      )
      .eq('user_id', userId);
  },

  // Chat operations
  async sendMessage(data: any) {
    return await supabase.from('chat_messages').insert(data);
  },

  async getConversation(senderId: string, receiverId: string) {
    return await supabase
      .from('chat_messages')
      .select('*')
      .or(`sender_id.eq.${senderId},sender_id.eq.${receiverId}`)
      .or(`receiver_id.eq.${senderId},receiver_id.eq.${receiverId}`)
      .order('sent_at', { ascending: true });
  },

  // Notifications
  async getUserNotifications(userId: string) {
    return await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
  },

  async markNotificationAsRead(notificationId: string) {
    return await supabase.from('notifications').update({ is_read: true }).eq('id', notificationId);
  },
};
