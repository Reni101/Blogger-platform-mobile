import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import {
  EyeIcon,
  EyeOffIcon,
  UserIcon,
  PasswordIcon,
  getDomainException,
  useAppTheme,
  useThemedStyles,
} from '../../../../shared';
import { useRegistrationMutation } from '../../hooks/useRegistrationMutation.ts';
import {
  registrationSchema,
  type RegistrationFormValues,
} from '../../model/schemas/registrationSchema.ts';
import { createRegistrationFormStyles } from './RegistrationForm.styles.ts';

type RegistrationFormProps = {
  onSignInPress: () => void;
};

const FORM_FIELDS: (keyof RegistrationFormValues)[] = [
  'login',
  'email',
  'password',
];

function isFormField(field: string): field is keyof RegistrationFormValues {
  return (FORM_FIELDS as string[]).includes(field);
}

export const RegistrationForm = ({ onSignInPress }: RegistrationFormProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { colors } = useAppTheme();
  const styles = useThemedStyles(createRegistrationFormStyles);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: '',
      login: '',
      password: '',
    },
  });

  const { mutate, isPending } = useRegistrationMutation({
    onError: error => {
      const domainException = getDomainException(error);

      if (!domainException) {
        setError('root', {
          type: 'server',
          message: 'Registration failed. Please try again later',
        });
        return;
      }

      const { errorsMessages } = domainException;

      if (errorsMessages.length === 0) {
        setError('root', {
          type: 'server',
          message:
            domainException.message ?? 'Registration failed. Please try again',
        });
        return;
      }

      errorsMessages.forEach(({ field, message }) => {
        if (isFormField(field)) {
          setError(field, { type: 'server', message });
        }
      });
    },
  });

  const onSubmit = handleSubmit(values => {
    mutate(values);
  });

  return (
    <View style={styles.container}>
      <View>
        <Controller
          control={control}
          name="login"
          render={({ field: { value, onChange, onBlur } }) => (
            <View style={styles.inputRow}>
              <UserIcon color={colors.iconPrimary} size={22} strokeWidth={2} />
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Username"
                placeholderTextColor={colors.textMuted}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />
            </View>
          )}
        />
        <View style={styles.errorSlot}>
          {errors.login ? (
            <Text style={styles.errorText}>{errors.login.message}</Text>
          ) : null}
        </View>
      </View>

      <View>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange, onBlur } }) => (
            <View style={styles.inputRow}>
              <Text style={styles.iconText}>@</Text>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Email"
                placeholderTextColor={colors.textMuted}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                style={styles.input}
              />
            </View>
          )}
        />
        <View style={styles.errorSlot}>
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          ) : null}
        </View>
      </View>

      <View>
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange, onBlur } }) => (
            <View style={styles.inputRow}>
              <PasswordIcon color={colors.iconPrimary} size={22} strokeWidth={2} />
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Password"
                placeholderTextColor={colors.textMuted}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={!isPasswordVisible}
                style={styles.input}
              />
              <Pressable
                accessibilityLabel={
                  isPasswordVisible ? 'Hide password' : 'Show password'
                }
                onPress={() => setIsPasswordVisible(prev => !prev)}
                style={styles.passwordToggle}
              >
                {isPasswordVisible ? (
                  <EyeOffIcon color={colors.iconPrimary} size={22} strokeWidth={2} />
                ) : (
                  <EyeIcon color={colors.iconPrimary} size={22} strokeWidth={2} />
                )}
              </Pressable>
            </View>
          )}
        />
        <View style={styles.errorSlot}>
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          ) : null}
        </View>
      </View>

      {errors.root ? (
        <View style={styles.errorSlot}>
          <Text style={styles.errorText}>{errors.root.message}</Text>
        </View>
      ) : null}

      <Pressable
        disabled={isPending}
        onPress={onSubmit}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
      >
        <Text style={styles.buttonText}>
          {isPending ? 'LOADING...' : 'SIGN UP'}
        </Text>
      </Pressable>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account ?</Text>
        <Pressable onPress={onSignInPress}>
          <Text style={styles.footerLink}>Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
};
