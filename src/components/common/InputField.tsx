import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface InputFieldProps {
  label: string;
  icon?: React.ReactNode;
  inputType?: string;
  keyboardType?: 'email-address' | 'default' | 'numeric' | 'phone-pad';
  fieldButtonLabel?: string;
  fieldButtonFunction?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
}

const InputField = ({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  value,
  onChangeText,
  error,
}: InputFieldProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {icon}
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={styles.input}
          secureTextEntry={inputType === 'password'}
          value={value}
          onChangeText={onChangeText}
        />
        {fieldButtonLabel && (
          <TouchableOpacity onPress={fieldButtonFunction}>
            <Text style={styles.fieldButtonText}>{fieldButtonLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    paddingBottom: 8,
    alignItems: 'center',
  },
  inputError: {
    borderBottomColor: colors.error,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    marginLeft: 10,
    color: colors.text,
  },
  fieldButtonText: {
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 10,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 10,
  },
});

export default InputField;
