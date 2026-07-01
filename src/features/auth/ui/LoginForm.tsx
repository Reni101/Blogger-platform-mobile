import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../app/navigation/AppNavigation.tsx';
import { useLoginMutation } from '../hooks/useLoginMutation.ts';
import { type LoginFormValues, loginSchema } from '../model/loginSchema.ts';
import { UserIcon } from '../../../shared/ui/svg/user-icon.tsx';
import { PasswordIcon } from '../../../shared/ui/svg/password-icon.tsx';
import { styles } from './LoginForm.styles.ts';

import { LOGIN, PASSWORD } from '@env';

type LoginNavigation = NativeStackNavigationProp<RootStackParamList, 'login'>;

export const LoginForm = () => {
  const navigation = useNavigation<LoginNavigation>();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: LOGIN ?? '',
      password: PASSWORD ?? '',
    },
  });

  const { mutate, isPending } = useLoginMutation({
    onSuccess: () => {
      navigation.replace('mainTabs');
    },
    onError: () => {
      setError('password', {
        type: 'server',
        message: 'Incorrect login or password',
      });
    },
  });

  const onSubmit = handleSubmit(values => {
    mutate({ ...values, rememberMe: true });
  });

  return (
    <View style={styles.container}>
      <View>
        <Controller
          control={control}
          name="login"
          render={({ field: { value, onChange, onBlur } }) => (
            <View style={styles.inputRow}>
              <UserIcon color="#1c1f2e" size={22} strokeWidth={2} />
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Username"
                placeholderTextColor="#9a9da6"
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

      <Pressable onPress={() => {}}>
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
        <Pressable onPress={() => {}}>
          <Text style={styles.footerLink}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};
