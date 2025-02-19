import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Alert, Animated } from 'react-native';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { colors } from '../../src/theme/colors';
import InputField from '../../src/components/common/InputField';
import CustomButton from '../../src/components/common/CustomButton';
import LoginTabs from '../../src/components/auth/LoginTabs';
import { authService } from '../../src/services/authService';
import { useTheme } from '../../src/hooks/useTheme';
import { supabase } from '@/lib/supabase';

// Define spacing constants
const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

type UserType = 'user' | 'chef';

const registerSchema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits')
    .required('Phone number is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

type RegisterFormData = yup.InferType<typeof registerSchema>;

export default function RegisterScreen() {
  const router = useRouter();
  const { type = 'user' } = useLocalSearchParams<{ type: UserType }>();
  const [activeTab, setActiveTab] = React.useState<UserType>(type);
  const [loading, setLoading] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const { colors } = useTheme();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const [resendCooldown, setResendCooldown] = React.useState(0);
  const [userEmail, setUserEmail] = React.useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  React.useEffect(() => {
    if (isRegistered) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isRegistered]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);

      // 1. Sign up with Supabase auth
      const { data: authData, error } = await authService.signUp({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        phone: data.phone,
        userType: activeTab, // 'user' or 'chef'
      });

      if (error) throw error;

      const userId = authData.user?.id;
      if (!userId) throw new Error('User ID not found');

      // 2. Create profile entry
      const { error: profileError } = await supabase.from('profiles').insert({
        id: userId,
        email: data.email,
        full_name: data.fullName,
        phone: data.phone,
        user_type: activeTab,
      });

      if (profileError) throw profileError;

      // 3. If registering as chef, create chef entry
      if (activeTab === 'chef') {
        const { error: chefError } = await supabase.from('chefs').insert({
          id: userId,
          rating: 0,
          total_ratings: 0,
          availability: true,
          specialties: [],
          location: '',
          price: 0,
        });

        if (chefError) throw chefError;
      }

      setIsRegistered(true);
      setUserEmail(data.email);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (resendCooldown > 0) return;

    try {
      await authService.resendVerificationEmail(userEmail);
      setResendCooldown(60);
      Alert.alert('Success', 'Verification email has been resent');

      // Start countdown
      const interval = setInterval(() => {
        setResendCooldown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      Alert.alert('Error', 'Failed to resend verification email');
    }
  };

  if (isRegistered) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Animated.View style={[styles.successContainer, { opacity: fadeAnim }]}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="mark-email-read" size={64} color={colors.primary} />
          </View>

          <Text style={[styles.successTitle, { color: colors.text }]}>Verify Your Email</Text>

          <Text style={[styles.successMessage, { color: colors.textSecondary }]}>
            We've sent a verification link to{' '}
            <Text style={{ fontWeight: 'bold' }}>{userEmail}</Text>. Please check your inbox and
            verify your email to continue.
          </Text>

          <View style={styles.buttonContainer}>
            <CustomButton
              label={resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Email'}
              onPress={handleResendEmail}
              disabled={resendCooldown > 0}
              style={[styles.resendButton, { backgroundColor: colors.backgroundSecondary }]}
              textStyle={{ color: colors.primary }}
            />

            <Link href="/login" asChild>
              <CustomButton
                label="Go to Login"
                onPress={() => {}}
                style={{ backgroundColor: colors.primary }}
              />
            </Link>
          </View>

          <Text style={[styles.tip, { color: colors.textTertiary }]}>
            Tip: Check your spam folder if you don't see the email
          </Text>
        </Animated.View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>
        </View>

        <LoginTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Full Name"
              icon={<FontAwesome name="user" size={20} color={colors.gray} />}
              value={value}
              onChangeText={onChange}
              error={errors.fullName?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Email"
              icon={<MaterialIcons name="alternate-email" size={20} color={colors.gray} />}
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Phone Number"
              icon={<FontAwesome name="phone" size={20} color={colors.gray} />}
              keyboardType="phone-pad"
              value={value}
              onChangeText={onChange}
              error={errors.phone?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Password"
              icon={<Ionicons name="ios-lock-closed-outline" size={20} color={colors.gray} />}
              inputType="password"
              value={value}
              onChangeText={onChange}
              error={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Confirm Password"
              icon={<Ionicons name="ios-lock-closed-outline" size={20} color={colors.gray} />}
              inputType="password"
              value={value}
              onChangeText={onChange}
              error={errors.confirmPassword?.message}
            />
          )}
        />

        <CustomButton
          label={`Sign Up as ${activeTab === 'user' ? 'User' : 'Chef'}`}
          onPress={handleSubmit(onSubmit)}
          loading={loading}
        />

        <View style={styles.navigationLinks}>
          <Text style={styles.navigationText}>
            Already have an account?{' '}
            <Link href="/(auth)/login" asChild>
              <Text style={styles.navigationLink}>Login here</Text>
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  footerText: {
    color: colors.gray,
  },
  footerLink: {
    color: colors.primary,
    fontWeight: '700',
  },
  navigationLinks: {
    marginTop: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  navigationText: {
    color: colors.gray,
    fontSize: 14,
  },
  navigationLink: {
    color: colors.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  iconContainer: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)', // Light primary color
    padding: SPACING.xl,
    borderRadius: 50,
    marginBottom: SPACING.xl,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.xl,
  },
  buttonContainer: {
    width: '100%',
    gap: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  resendButton: {
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  tip: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: SPACING.md,
  },
});
