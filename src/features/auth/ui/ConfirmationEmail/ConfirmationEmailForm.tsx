import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, Text, TextInput, View } from 'react-native';
import {
  getDomainException,
  useAppTheme,
  useThemedStyles,
} from '../../../../shared';
import { useMeQuery } from '../../../../entities/user';
import { useRegistrationConfirmationMutation } from '../../hooks/useRegistrationConfirmationMutation.ts';
import { useRegistrationEmailResendingMutation } from '../../hooks/useRegistrationEmailResendingMutation.ts';
import {
  type ConfirmationEmailFormValues,
  confirmationEmailSchema,
} from '../../model/schemas/confirmationEmailSchema.ts';
import { createConfirmationEmailStyles } from './ConfirmationEmailForm.styles.ts';
import { getConfirmationCodeErrorMessage } from '../../lib/getConfirmationCodeErrorMessage.ts';

export const ConfirmationEmailForm = () => {
  const { colors } = useAppTheme();
  const styles = useThemedStyles(createConfirmationEmailStyles);
  const { data: me } = useMeQuery();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ConfirmationEmailFormValues>({
    resolver: zodResolver(confirmationEmailSchema),
    defaultValues: {
      code: '',
    },
  });

  const {
    mutate: resendCode,
    isPending: isResendingPending,
    isSuccess: isResendingSuccess,
  } = useRegistrationEmailResendingMutation({
    onError: error => {
      const domainException = getDomainException(error);

      setError('root', {
        type: 'server',
        message:
          domainException?.message ??
          'Failed to resend the confirmation code. Please try again',
      });
    },
  });

  const { mutate: confirmEmail, isPending: isConfirmationPending } =
    useRegistrationConfirmationMutation({
      onError: error => {
        setError('code', {
          type: 'server',
          message: getConfirmationCodeErrorMessage(error),
        });
      },
    });

  const onResendCode = () => {
    if (!me?.data.email) {
      setError('root', {
        type: 'server',
        message: 'Email is unavailable. Please try again later',
      });
      return;
    }

    resendCode({ email: me.data.email });
  };

  const onConfirmEmail = handleSubmit(values => {
    confirmEmail(values);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        A confirmation code was sent to your email {me?.data.email ?? ''}.
      </Text>

      <Pressable
        disabled={isResendingPending}
        onPress={onResendCode}
        style={({ pressed }) => [
          styles.secondaryButton,
          pressed ? styles.buttonPressed : null,
        ]}
      >
        <Text style={styles.secondaryButtonText}>
          {isResendingPending ? 'Resending...' : 'Resend code'}
        </Text>
      </Pressable>

      {isResendingSuccess ? (
        <Text style={styles.successText}>
          A new confirmation code has been sent to your email.
        </Text>
      ) : null}

      <View>
        <Controller
          control={control}
          name="code"
          render={({ field: { value, onChange, onBlur } }) => (
            <View style={styles.inputRow}>
              <Text style={styles.iconText}>#</Text>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Confirmation code"
                placeholderTextColor={colors.textMuted}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />
            </View>
          )}
        />
        <View style={styles.errorSlot}>
          {errors.code ? (
            <Text style={styles.errorText}>{errors.code.message}</Text>
          ) : null}
        </View>
      </View>

      {errors.root ? (
        <View style={styles.errorSlot}>
          <Text style={styles.errorText}>{errors.root.message}</Text>
        </View>
      ) : null}

      <Pressable
        disabled={isConfirmationPending}
        onPress={onConfirmEmail}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
      >
        <Text style={styles.buttonText}>
          {isConfirmationPending ? 'Submitting...' : 'Submit'}
        </Text>
      </Pressable>
    </View>
  );
};
