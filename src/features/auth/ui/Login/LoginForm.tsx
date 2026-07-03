import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useLoginMutation } from '../../hooks/useLoginMutation.ts';
import { type LoginFormValues, loginSchema } from '../../model/schemas/loginSchema.ts';
import {
  DomainExceptionCode,
  getDomainException,
  PasswordIcon,
  UserIcon,
} from '../../../../shared';
import { styles } from './LoginForm.styles.ts';
import { LOGIN, PASSWORD } from '@env';

type LoginFormProps = {
  onForgotPasswordPress: () => void;
  onSignUpPress: () => void;
};

export const LoginForm = ({
  onForgotPasswordPress,
  onSignUpPress,
}: LoginFormProps) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      loginOrEmail: LOGIN ?? '',
      password: PASSWORD ?? '',
    },
  });

  const { mutate, isPending } = useLoginMutation({
    onError: error => {
      const domainException = getDomainException(error);

      if (domainException?.code !== DomainExceptionCode.Unauthorized) {
        return;
      }

      setError('password', {
        type: 'server',
        message: domainException.message ?? 'Invalid loginOrEmail or password',
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
          name="loginOrEmail"
          render={({ field: { value, onChange, onBlur } }) => (
            <View style={styles.inputRow}>
              <UserIcon color="#1c1f2e" size={22} strokeWidth={2} />
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Login or email"
                placeholderTextColor="#9a9da6"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />
            </View>
          )}
        />
        <View style={styles.errorSlot}>
          {errors.loginOrEmail ? (
            <Text style={styles.errorText}>{errors.loginOrEmail.message}</Text>
          ) : null}
        </View>
      </View>

      <View>
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange, onBlur } }) => (
            <View style={styles.inputRow}>
              <PasswordIcon color="#1c1f2e" size={22} strokeWidth={2} />
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Password"
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
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          ) : null}
        </View>
      </View>

      <Pressable onPress={onForgotPasswordPress}>
        <Text style={styles.forgotPassword}>Forgot password</Text>
      </Pressable>

      <Pressable
        disabled={isPending}
        onPress={onSubmit}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
      >
        <Text style={styles.buttonText}>
          {isPending ? 'LOADING...' : 'LOGIN'}
        </Text>
      </Pressable>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account ?</Text>
        <Pressable onPress={onSignUpPress}>
          <Text style={styles.footerLink}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};
