import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../lib/supabase';
import InputField from '../common/InputField';
import CustomButton from '../common/CustomButton';
import { colors } from '../../theme/colors';
import { ProfileAvatar } from './ProfileAvatar';

type ProfileFormData = {
  fullName: string;
  phone: string;
  bio?: string;
};

export default function ProfileForm({ profile, onUpdate }: any) {
  const [loading, setLoading] = React.useState(false);

  const { control, handleSubmit } = useForm<ProfileFormData>({
    defaultValues: {
      fullName: profile?.full_name || '',
      phone: profile?.phone || '',
      bio: profile?.bio || '',
    },
  });

  const uploadAvatar = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setLoading(true);
        const file = result.assets[0];
        const fileExt = file.uri.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${profile.id}/${fileName}`;

        // Upload image
        const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, {
          uri: file.uri,
          type: file.type || 'image/jpeg',
          name: fileName,
        });

        if (uploadError) throw uploadError;

        // Update profile
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ avatar_url: filePath })
          .eq('id', profile.id);

        if (updateError) throw updateError;

        onUpdate();
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: data.fullName,
          phone: data.phone,
          bio: data.bio,
          updated_at: new Date(),
        })
        .eq('id', profile.id);

      if (error) throw error;
      Alert.alert('Success', 'Profile updated successfully');
      onUpdate();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ProfileAvatar url={profile?.avatar_url} onPress={uploadAvatar} loading={loading} />

      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, value } }) => (
          <InputField label="Full Name" value={value} onChangeText={onChange} />
        )}
      />

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <InputField
            label="Phone Number"
            value={value}
            onChangeText={onChange}
            keyboardType="phone-pad"
          />
        )}
      />

      <Controller
        control={control}
        name="bio"
        render={({ field: { onChange, value } }) => (
          <InputField label="Bio" value={value} onChangeText={onChange} multiline />
        )}
      />

      <CustomButton label="Update Profile" onPress={handleSubmit(onSubmit)} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
