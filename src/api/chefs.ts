import { supabase } from '@/lib/supabase';

export interface Chef {
  id: string;
  name: string;
  image_url: string;
  cuisine: string;
  rating: number;
  specialties: string[];
  experience: string;
  location: string;
  availability: boolean;
}

export const chefApi = {
  // Get all chefs
  getAllChefs: async () => {
    const { data, error } = await supabase
      .from('chefs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Chef[];
  },

  // Get chef by ID
  getChefById: async (id: string) => {
    const { data, error } = await supabase.from('chefs').select('*').eq('id', id).single();

    if (error) throw error;
    return data as Chef;
  },

  // Search chefs
  searchChefs: async (query: string) => {
    const { data, error } = await supabase
      .from('chefs')
      .select('*')
      .or(`name.ilike.%${query}%,cuisine.ilike.%${query}%`)
      .order('rating', { ascending: false });

    if (error) throw error;
    return data as Chef[];
  },

  // Get chefs by cuisine
  getChefsByCuisine: async (cuisine: string) => {
    const { data, error } = await supabase
      .from('chefs')
      .select('*')
      .eq('cuisine', cuisine)
      .order('rating', { ascending: false });

    if (error) throw error;
    return data as Chef[];
  },
};
