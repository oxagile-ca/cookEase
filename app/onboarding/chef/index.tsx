import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { RadioButton, Checkbox } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';

export default function ChefOnboarding() {
  const { userProfile, refreshProfile } = useAuth();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [idUploaded, setIdUploaded] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if all required fields are completed
  const isFormComplete = paymentMethod && idUploaded && termsAgreed;

  const handleUploadID = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'You need to grant permission to access your photos');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        // Here you would normally upload the image to storage
        // For now, we'll just mark it as uploaded
        setIdUploaded(true);
        Alert.alert('Success', 'ID uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading ID:', error);
      Alert.alert('Error', 'Failed to upload ID');
    }
  };

  const handleCompleteProfile = async () => {
    if (!isFormComplete) {
      Alert.alert('Incomplete Form', 'Please complete all required fields');
      return;
    }

    try {
      setIsLoading(true);

      // Update chef profile with payment method
      if (userProfile?.id) {
        // First check if a chef record already exists
        const { data: existingChef, error: fetchError } = await supabase
          .from('chefs')
          .select('id')
          .eq('id', userProfile.id)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
          throw fetchError;
        }

        // Create or update chef record
        const { error } = await supabase.from('chefs').upsert({
          id: userProfile.id,
          bio: '', // Default empty bio
          specialties: [], // Default empty specialties array
          experience: 0, // Default experience
          hourly_rate: 0, // Default hourly rate
          location: '', // Default empty location
          // Store payment method in metadata or another field if needed
          // You might need to add a payment_method column to your chefs table
        });

        if (error) {
          throw error;
        }

        // Also update user_metadata in the auth.users table to store onboarding completion
        const { error: updateError } = await supabase.auth.updateUser({
          data: {
            payment_method: paymentMethod,
            id_verified: idUploaded,
            terms_accepted: termsAgreed,
            onboarding_completed: true,
          },
        });

        if (updateError) {
          throw updateError;
        }

        // Refresh the profile to get updated data
        await refreshProfile();

        // Navigate to the chef dashboard
        router.replace('/(chef)/dashboard');
      }
    } catch (error) {
      console.error('Error completing profile:', error);
      Alert.alert('Error', 'Failed to complete profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Complete Your Chef Profile</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payout Method</Text>
        <View style={styles.radioGroup}>
          <View style={styles.radioOption}>
            <RadioButton
              value="stripe"
              status={paymentMethod === 'stripe' ? 'checked' : 'unchecked'}
              onPress={() => setPaymentMethod('stripe')}
              color="#FF6B6B"
            />
            <Text style={styles.radioLabel}>Stripe</Text>
          </View>

          <View style={styles.radioOption}>
            <RadioButton
              value="paypal"
              status={paymentMethod === 'paypal' ? 'checked' : 'unchecked'}
              onPress={() => setPaymentMethod('paypal')}
              color="#FF6B6B"
            />
            <Text style={styles.radioLabel}>PayPal</Text>
          </View>

          <View style={styles.radioOption}>
            <RadioButton
              value="bank_transfer"
              status={paymentMethod === 'bank_transfer' ? 'checked' : 'unchecked'}
              onPress={() => setPaymentMethod('bank_transfer')}
              color="#FF6B6B"
            />
            <Text style={styles.radioLabel}>Direct Bank Transfer</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Identity Verification</Text>
        <Text style={styles.sectionDescription}>
          Please upload a clear photo of your government-issued ID
        </Text>

        <TouchableOpacity style={styles.uploadButton} onPress={handleUploadID}>
          <MaterialIcons name="cloud-upload" size={24} color="#FF6B6B" />
          <Text style={styles.uploadButtonText}>
            {idUploaded ? 'ID Uploaded Successfully' : 'Upload Government ID'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.termsContainer}>
        <Checkbox
          status={termsAgreed ? 'checked' : 'unchecked'}
          onPress={() => setTermsAgreed(!termsAgreed)}
          color="#FF6B6B"
        />
        <Text style={styles.termsText}>
          I agree to the CookEase Terms of Service and Privacy Policy
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.completeButton, (!isFormComplete || isLoading) && styles.disabledButton]}
          onPress={handleCompleteProfile}
          disabled={!isFormComplete || isLoading}>
          <Text style={styles.completeButtonText}>
            {isLoading ? 'Completing...' : 'Complete Profile'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  radioGroup: {
    marginTop: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#FF6B6B',
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  uploadButtonText: {
    marginLeft: 8,
    color: '#FF6B6B',
    fontWeight: '500',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  termsText: {
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#FF6B6B',
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
  completeButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#FFADAD',
  },
  completeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
