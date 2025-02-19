import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { spacing } from '@/theme/utils';
import * as ImagePicker from 'expo-image-picker';

interface Step1Props {
  data: {
    profile_picture: string;
    full_name: string;
    phone_number: string;
    business_name: string;
    location: string;
  };
  onUpdate: (data: Partial<Step1Props['data']>) => void;
  onNext: () => void;
}

export function Step1BasicInfo({ data, onUpdate, onNext }: Step1Props) {
  const { colors } = useTheme();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      onUpdate({ profile_picture: result.assets[0].uri });
    }
  };

  const isFormValid =
    data.full_name.trim() !== '' && data.phone_number.trim() !== '' && data.location.trim() !== '';

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        {data.profile_picture ? (
          <Image source={{ uri: data.profile_picture }} style={styles.profileImage} />
        ) : (
          <View style={[styles.imagePlaceholder, { backgroundColor: colors.backgroundElevated }]}>
            <Text style={[styles.imagePlaceholderText, { color: colors.textSecondary }]}>
              Tap to add profile photo
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <Input
        label="Full Name"
        value={data.full_name}
        onChangeText={text => onUpdate({ full_name: text })}
        placeholder="Enter your full name"
        autoCapitalize="words"
      />

      <Input
        label="Phone Number"
        value={data.phone_number}
        onChangeText={text => onUpdate({ phone_number: text })}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
      />

      <Input
        label="Business Name (Optional)"
        value={data.business_name}
        onChangeText={text => onUpdate({ business_name: text })}
        placeholder="Enter your business name"
      />

      <Input
        label="Location"
        value={data.location}
        onChangeText={text => onUpdate({ location: text })}
        placeholder="Enter your location"
      />

      <Button title="Continue" onPress={onNext} disabled={!isFormValid} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  imageContainer: {
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  imagePlaceholderText: {
    fontSize: 14,
    textAlign: 'center',
    padding: spacing.sm,
  },
  button: {
    marginTop: spacing.md,
  },
});
