import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { spacing } from '@/theme/utils';
import * as ImagePicker from 'expo-image-picker';

interface DocumentUploaderProps {
  document: string;
  onDocumentChange: (uri: string) => void;
  title: string;
  subtitle?: string;
}

export function DocumentUploader({
  document,
  onDocumentChange,
  title,
  subtitle,
}: DocumentUploaderProps) {
  const { colors } = useTheme();

  const pickDocument = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      onDocumentChange(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundElevated,
          borderColor: colors.border,
        },
      ]}
      onPress={pickDocument}>
      {document ? (
        <Image source={{ uri: document }} style={styles.preview} />
      ) : (
        <View style={styles.placeholder}>
          <Ionicons name="cloud-upload-outline" size={32} color={colors.primary} />
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  placeholder: {
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  preview: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
});
