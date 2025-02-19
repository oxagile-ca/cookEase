import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/common/Button';
import { RadioGroup } from '@/components/common/RadioGroup';
import { Checkbox } from '@/components/common/Checkbox';
import { DocumentUploader } from '@/components/common/DocumentUploader';
import { spacing } from '@/theme/utils';

const PAYOUT_METHODS = [
  { label: 'Stripe', value: 'stripe' },
  { label: 'PayPal', value: 'paypal' },
  { label: 'Direct Bank Transfer', value: 'bank' },
];

interface Step4Props {
  data: {
    payout_method: string;
    government_id: string;
    terms_accepted: boolean;
  };
  onUpdate: (data: Partial<Step4Props['data']>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export function Step4Verification({ data, onUpdate, onSubmit, onBack }: Step4Props) {
  const { colors } = useTheme();

  const isFormValid = data.payout_method && data.government_id && data.terms_accepted;

  const handleCompleteProfile = () => {
    if (isFormValid) {
      onSubmit();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Payout Method</Text>
        <RadioGroup
          options={PAYOUT_METHODS}
          selected={data.payout_method}
          onChange={value => onUpdate({ payout_method: value })}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Identity Verification</Text>
        <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
          Please upload a clear photo of your government-issued ID
        </Text>
        <DocumentUploader
          document={data.government_id}
          onDocumentChange={uri => onUpdate({ government_id: uri })}
          title="Upload Government ID"
        />
      </View>

      <View style={[styles.section, styles.termsSection]}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            checked={data.terms_accepted}
            onChange={checked => onUpdate({ terms_accepted: checked })}
          />
          <Text style={[styles.termsText, { color: colors.text }]}>
            I agree to the CookEase Terms of Service and Privacy Policy
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={onBack} variant="secondary" style={styles.button} />
        <Button
          title="Complete Profile"
          onPress={handleCompleteProfile}
          disabled={!isFormValid}
          style={styles.button}
        />
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
  termsSection: {
    paddingTop: spacing.xl,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  termsText: {
    flex: 1,
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
