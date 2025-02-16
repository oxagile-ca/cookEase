import { supabase } from '../lib/supabase';

export interface Chef {
  id: string;
  name: string;
  image: string;
  specialties: string[];
  rating: number;
  total_ratings: number;
  location: string;
  price_per_hour: number;
  pick_rate: number;
  win_rate: number;
  is_available: boolean;
}

export const chefService = {
  async getAllChefs(): Promise<Chef[]> {
    const { data, error } = await supabase
      .from('chefs')
      .select('*')
      .order('rating', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getChefById(id: string): Promise<Chef | null> {
    const { data, error } = await supabase
      .from('chefs')
      .select(
        `
        *,
        reviews(*),
        chef_availability(*)
      `,
      )
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async searchChefs(query: string): Promise<Chef[]> {
    const { data, error } = await supabase
      .from('chefs')
      .select('*')
      .or(
        `
        name.ilike.%${query}%,
        specialties.cs.{${query}}
      `,
      )
      .order('rating', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getChefsBySpecialty(specialty: string): Promise<Chef[]> {
    const { data, error } = await supabase
      .from('chefs')
      .select('*')
      .contains('specialties', [specialty])
      .order('rating', { ascending: false });

    if (error) throw error;
    return data || [];
  },
};
