import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import { Step1BasicInfo } from '@/components/chef/profile-setup/Step1BasicInfo';
import { Step2Specialization } from '@/components/chef/profile-setup/Step2Specialization';
import { Step3Availability } from '@/components/chef/profile-setup/Step3Availability';
import { Step4Verification } from '@/components/chef/profile-setup/Step4Verification';
import { ProgressBar } from '@/components/common/ProgressBar';
import { spacing } from '@/theme/utils';
import { SuccessScreen } from '@/components/chef/profile-setup/SuccessScreen';

export default function ChefProfileSetup() {
  const { colors } = useTheme();
  const { user, session } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Info
    profile_picture: '',
    full_name: '',
    phone_number: '',
    business_name: '',
    location: '',

    // Specialization
    specialties: [],
    experience_level: '',
    certifications: [],
    dish_images: [],
    bio: '',

    // Availability
    availability: {},
    hourly_rate: 0,
    service_types: [],
    service_radius: '',

    // Verification
    payout_method: '',
    government_id: '',
    terms_accepted: false,
  });

  useEffect(() => {
    if (!session) {
      router.replace('/auth/login');
    }
  }, [session]);

  const handleSubmit = async () => {
    try {
      if (!session?.user?.id) {
        throw new Error('User not found');
      }

      // Save to Supabase
      const { error } = await supabase
        .from('chefs')
        .update({
          ...formData,
          user_id: session.user.id,
          is_profile_complete: true,
          profile_status: 'pending_review',
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', session.user.id);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      // Show success screen
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save profile. Please try again.', [{ text: 'OK' }]);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1BasicInfo
            data={formData}
            onUpdate={data => setFormData({ ...formData, ...data })}
            onNext={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <Step2Specialization
            data={formData}
            onUpdate={data => setFormData({ ...formData, ...data })}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <Step3Availability
            data={formData}
            onUpdate={data => setFormData({ ...formData, ...data })}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        );
      case 4:
        return (
          <Step4Verification
            data={formData}
            onUpdate={data => setFormData({ ...formData, ...data })}
            onSubmit={handleSubmit}
            onBack={() => setCurrentStep(3)}
          />
        );
    }
  };

  if (!session) {
    return null;
  }

  if (isSubmitted) {
    return <SuccessScreen />;
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Complete Your Profile</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Step {currentStep} of 4
        </Text>
      </View>

      <ProgressBar progress={currentStep / 4} />

      {renderStep()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
  },
});
