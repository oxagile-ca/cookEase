import { supabase } from './supabase';

export type UserType = 'chef' | 'user';

export const checkUserType = async (userId: string): Promise<UserType | null> => {
  try {
    // Check chef_profiles first
    const { data: chefProfile } = await supabase
      .from('chef_profiles')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (chefProfile) return 'chef';

    // Check user_profiles
    const { data: userProfile } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (userProfile) return 'user';

    // Check pending_profiles if no active profile found
    const { data: pendingProfile } = await supabase
      .from('pending_profiles')
      .select('user_type')
      .eq('user_id', userId)
      .single();

    return pendingProfile?.user_type || null;
  } catch (error) {
    console.error('Error checking user type:', error);
    return null;
  }
};

export const handleAuthRouting = async (userId: string, router: any) => {
  const userType = await checkUserType(userId);

  if (!userType) {
    router.replace('/login');
    return;
  }

  // Get user metadata for onboarding status
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const onboardingCompleted = user?.user_metadata?.onboarding_completed;

  if (userType === 'chef') {
    if (!onboardingCompleted) {
      router.replace('/onboarding/chef');
    } else {
      router.replace('/chef/dashboard');
    }
  } else {
    router.replace('/'); // Customer home
  }
};
