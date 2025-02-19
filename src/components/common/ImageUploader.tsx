import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '@/hooks/useTheme';
import { spacing } from '@/theme/utils';

interface ImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  title?: string;
}

export function ImageUploader({
  images,
  onImagesChange,
  maxImages = 5,
  title = 'Add Images',
}: ImageUploaderProps) {
  const { colors } = useTheme();

  const pickImage = async () => {
    if (images.length >= maxImages) {
      Alert.alert('Maximum Images', `You can only upload up to ${maxImages} images`);
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
        allowsMultipleSelection: true,
        selectionLimit: maxImages - images.length,
      });

      if (!result.canceled) {
        const newImages = result.assets.map(asset => asset.uri);
        onImagesChange([...images, ...newImages]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onImagesChange(newImages);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {images.map((uri, index) => (
          <View key={uri} style={styles.imageContainer}>
            <Image source={{ uri }} style={styles.image} />
            <TouchableOpacity
              style={[styles.removeButton, { backgroundColor: colors.error }]}
              onPress={() => removeImage(index)}>
              <Ionicons name="close" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
        ))}

        {images.length < maxImages && (
          <TouchableOpacity
            style={[
              styles.addButton,
              {
                backgroundColor: colors.backgroundElevated,
                borderColor: colors.border,
              },
            ]}
            onPress={pickImage}>
            <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
            <Text style={[styles.addButtonText, { color: colors.text }]}>{title}</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {images.length}/{maxImages}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
  },
  scrollContent: {
    gap: spacing.sm,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButton: {
    width: 120,
    height: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.sm,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    marginTop: spacing.xs,
  },
});
