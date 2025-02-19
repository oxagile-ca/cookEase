import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { ChipSelect } from '@/components/common/ChipSelect';
import { ImageUploader } from '@/components/common/ImageUploader';
import { spacing } from '@/theme/utils';

const CUISINE_OPTIONS = [
  'Italian',
  'Indian',
  'Chinese',
  'Japanese',
  'Mexican',
  'French',
  'Thai',
  'Mediterranean',
  'American',
  'BBQ',
  'Vegan',
  'Vegetarian',
  'Seafood',
  'Desserts',
  'Fusion',
];

const EXPERIENCE_OPTIONS = ['1-3 years', '3-5 years', '5-10 years', '10+ years'];

interface Step2Props {
  data: {
    specialties: string[];
    experience_level: string;
    certifications: string[];
    dish_images: string[];
    bio: string;
  };
  onUpdate: (data: Partial<Step2Props['data']>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step2Specialization({ data, onUpdate, onNext, onBack }: Step2Props) {
  const { colors } = useTheme();

  const isFormValid =
    data.specialties.length > 0 &&
    data.experience_level &&
    data.bio.trim() !== '' &&
    data.dish_images.length > 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Cuisine Specialties</Text>
        <ChipSelect
          options={CUISINE_OPTIONS}
          selected={data.specialties}
          onChange={selected => onUpdate({ specialties: selected })}
          multiple
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Experience Level</Text>
        <ChipSelect
          options={EXPERIENCE_OPTIONS}
          selected={[data.experience_level]}
          onChange={selected => onUpdate({ experience_level: selected[0] })}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Showcase Your Dishes</Text>
        <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
          Upload 3-5 photos of your signature dishes
        </Text>
        <ImageUploader
          images={data.dish_images}
          onImagesChange={images => onUpdate({ dish_images: images })}
          maxImages={5}
          title="Add dish photos"
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Professional Bio</Text>
        <Input
          multiline
          numberOfLines={4}
          value={data.bio}
          onChangeText={text => onUpdate({ bio: text })}
          placeholder="Tell us about your culinary journey and expertise (150-300 words)"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={onBack} variant="secondary" style={styles.button} />
        <Button title="Next" onPress={onNext} disabled={!isFormValid} style={styles.button} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionSubtitle: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.lg,
    gap: spacing.md,
  },
  button: {
    flex: 1,
  },
});
