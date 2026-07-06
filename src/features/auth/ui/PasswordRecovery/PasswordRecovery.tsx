import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import {
  type NewPasswordFormValues,
  newPasswordSchema,
  type PasswordRecoveryFormValues,
  passwordRecoverySchema,
} from '../../model/schemas/passwordRecoverySchema.ts';
import { usePasswordRecoveryMutation } from '../../hooks/usePasswordRecoveryMutation.ts';
import { useNewPasswordMutation } from '../../hooks/useNewPasswordMutation.ts';
import { PasswordIcon, getDomainException } from '../../../../shared';
import { styles } from './PasswordRecovery.styles.ts';

type PasswordRecoveryProps = {
  onSignInPress: () => void;
};

const PASSWORD_RECOVERY_FIELDS: (keyof PasswordRecoveryFormValues)[] = ['email'];
const NEW_PASSWORD_FIELDS: (keyof NewPasswordFormValues)[] = [
  'recoveryCode',
  'newPassword',
];

function isPasswordRecoveryField(
  field: string,
): field is keyof PasswordRecoveryFormValues {
  return (PASSWORD_RECOVERY_FIELDS as string[]).includes(field);
}

function isNewPasswordField(field: string): field is keyof NewPasswordFormValues {
  return (NEW_PASSWORD_FIELDS as string[]).includes(field);
}

export function PasswordRecovery({ onSignInPress }: PasswordRecoveryProps) {
  const [isRecoveryStepVisible, setIsRecoveryStepVisible] = useState(false);

  const {
    control: passwordRecoveryControl,
    handleSubmit: handlePasswordRecoverySubmit,
    setError: setPasswordRecoveryError,
    formState: { errors: passwordRecoveryErrors },
  } = useForm<PasswordRecoveryFormValues>({
    resolver: zodResolver(passwordRecoverySchema),
    defaultValues: {
      email: '',
    },
  });

  const {
    control: newPasswordControl,
    handleSubmit: handleNewPasswordSubmit,
    setError: setNewPasswordError,
    formState: { errors: newPasswordErrors },
    reset: resetNewPasswordForm,
  } = useForm<NewPasswordFormValues>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      recoveryCode: '',
      newPassword: '',
    },
  });

  const {
    mutate: sendPasswordRecoveryCode,
    isPending: isPasswordRecoveryPending,
    variables: passwordRecoveryVariables,
  } = usePasswordRecoveryMutation({
    onSuccess: () => {
      setIsRecoveryStepVisible(true);
    },
    onError: error => {
      const domainException = getDomainException(error);

      if (!domainException) {
        setPasswordRecoveryError('root', {
          type: 'server',
          message: 'Failed to send recovery code. Please try again',
        });
        return;
      }

      if (domainException.errorsMessages.length === 0) {
        setPasswordRecoveryError('root', {
          type: 'server',
          message:
            domainException.message ??
            'Failed to send recovery code. Please try again',
        });
        return;
      }

      domainException.errorsMessages.forEach(({ field, message }) => {
        if (isPasswordRecoveryField(field)) {
          setPasswordRecoveryError(field, {
            type: 'server',
            message,
          });
        }
      });
    },
  });

  const {
    mutate: updatePassword,
    isPending: isUpdatePasswordPending,
  } = useNewPasswordMutation({
    onSuccess: () => {
      resetNewPasswordForm();
      onSignInPress();
    },
    onError: error => {
      const domainException = getDomainException(error);

      if (!domainException) {
        setNewPasswordError('root', {
          type: 'server',
          message: 'Failed to change password. Please try again',
        });
        return;
      }

      if (domainException.errorsMessages.length === 0) {
        setNewPasswordError('root', {
          type: 'server',
          message:
            domainException.message ?? 'Failed to change password. Please try again',
        });
        return;
      }

      domainException.errorsMessages.forEach(({ field, message }) => {
        if (isNewPasswordField(field)) {
          setNewPasswordError(field, {
            type: 'server',
            message,
          });
        }
      });
    },
  });

  const onSendRecoveryCode = handlePasswordRecoverySubmit(values => {
    sendPasswordRecoveryCode(values);
  });

  const onChangePassword = handleNewPasswordSubmit(values => {
    updatePassword(values);
  });

  return (
    <View style={styles.container}>
      <View>
        <Controller
          control={passwordRecoveryControl}
          name="email"
          render={({ field: { value, onChange, onBlur } }) => (
            <View style={styles.inputRow}>
              <Text style={styles.iconText}>@</Text>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Email"
                placeholderTextColor="#9a9da6"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                style={styles.input}
              />
            </View>
          )}
        />
        <View style={styles.errorSlot}>
          {passwordRecoveryErrors.email ? (
            <Text style={styles.errorText}>{passwordRecoveryErrors.email.message}</Text>
          ) : null}
        </View>
      </View>

      {isRecoveryStepVisible ? (
        <Text style={styles.infoText}>
          Код восстановления отправлен на {passwordRecoveryVariables?.email}
        </Text>
      ) : null}

      {passwordRecoveryErrors.root ? (
        <View style={styles.errorSlot}>
          <Text style={styles.errorText}>{passwordRecoveryErrors.root.message}</Text>
        </View>
      ) : null}

      <Pressable
        disabled={isPasswordRecoveryPending}
        onPress={onSendRecoveryCode}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
      >
        <Text style={styles.buttonText}>
          {isPasswordRecoveryPending ? 'ЗАГРУЗКА...' : 'ОТПРАВИТЬ'}
        </Text>
      </Pressable>

      {isRecoveryStepVisible ? (
        <View>
          <Controller
            control={newPasswordControl}
            name="recoveryCode"
            render={({ field: { value, onChange, onBlur } }) => (
              <View style={styles.inputRow}>
                <Text style={styles.iconText}>#</Text>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Код восстановления"
                  placeholderTextColor="#9a9da6"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                />
              </View>
            )}
          />
          <View style={styles.errorSlot}>
            {newPasswordErrors.recoveryCode ? (
              <Text style={styles.errorText}>
                {newPasswordErrors.recoveryCode.message}
              </Text>
            ) : null}
          </View>
        </View>
      ) : null}

      {isRecoveryStepVisible ? (
        <View>
          <Controller
            control={newPasswordControl}
            name="newPassword"
            render={({ field: { value, onChange, onBlur } }) => (
              <View style={styles.inputRow}>
                <PasswordIcon color="#1c1f2e" size={22} strokeWidth={2} />
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Новый пароль"
                  placeholderTextColor="#9a9da6"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                />
              </View>
            )}
          />
          <View style={styles.errorSlot}>
            {newPasswordErrors.newPassword ? (
              <Text style={styles.errorText}>
                {newPasswordErrors.newPassword.message}
              </Text>
            ) : null}
          </View>
        </View>
      ) : null}

      {newPasswordErrors.root ? (
        <View style={styles.errorSlot}>
          <Text style={styles.errorText}>{newPasswordErrors.root.message}</Text>
        </View>
      ) : null}

      {isRecoveryStepVisible ? (
        <Pressable
          disabled={isUpdatePasswordPending}
          onPress={onChangePassword}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ]}
        >
          <Text style={styles.buttonText}>
            {isUpdatePasswordPending ? 'ЗАГРУЗКА...' : 'СМЕНИТЬ ПАРОЛЬ'}
          </Text>
        </Pressable>
      ) : null}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Remember your password ?</Text>
        <Pressable onPress={onSignInPress}>
          <Text style={styles.footerLink}>Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
}
