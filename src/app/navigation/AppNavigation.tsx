import { memo } from 'react';
import type { NavigatorScreenParams } from '@react-navigation/native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import {
  ConfirmationEmailScreen,
  ForgotPasswordScreen,
  LoginScreen,
  RegisterScreen,
} from '../../screens';
import { useAuthFlow } from '../../features/auth';
import { AuthGuardHoc, StackHeader, useAppTheme } from '../../shared';
import { MainTabsNavigator } from './MainTabsNavigator';
import { DevicesScreen } from '../../screens/devices-screen/ui/DevicesScreen.tsx';

export type MainTabParamList = {
  blogs: undefined;
  quizGame: undefined;
  profile: undefined;
};

export type RootStackParamList = {
  login: undefined;
  register: undefined;
  forgotPassword: undefined;
  mainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  confirmationEmail: undefined;
  devices: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const createAppNavigationStyles = (backgroundColor: string) =>
  StyleSheet.create({
    loadingContainer: {
      alignItems: 'center',
      backgroundColor,
      flex: 1,
      justifyContent: 'center',
    },
  });

export const AppNavigation = memo(() => {
  const { colors, mode } = useAppTheme();
  const { initialRouteName, isBootstrapping } = useAuthFlow();
  const styles = createAppNavigationStyles(colors.screenBackground);

  const navigationTheme = mode === 'dark' ? DarkTheme : DefaultTheme;

  if (isBootstrapping) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.accentContrast} size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer
      theme={{
        ...navigationTheme,
        colors: {
          ...navigationTheme.colors,
          background: colors.screenBackground,
          border: colors.cardBorder,
          card: colors.tabBarBackground,
          primary: colors.accentContrast,
          text: colors.textPrimary,
        },
      }}
    >
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen
          component={LoginScreen}
          key={'login'}
          name={'login'}
          options={{
            title: 'Login',
            headerShown: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          component={RegisterScreen}
          key={'register'}
          name={'register'}
          options={{
            title: 'Sign Up',
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          component={ForgotPasswordScreen}
          key={'forgotPassword'}
          name={'forgotPassword'}
          options={{
            title: 'Forgot password',
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          component={AuthGuardHoc(MainTabsNavigator)}
          key={'mainTabs'}
          name={'mainTabs'}
          options={{ headerShown: false, animation: 'fade' }}
        />
        <Stack.Screen
          component={AuthGuardHoc(ConfirmationEmailScreen)}
          key={'confirmationEmail'}
          name={'confirmationEmail'}
          options={{
            title: 'Confirm email',
            animation: 'slide_from_right',
            header: StackHeader,
          }}
        />
        <Stack.Screen
          component={AuthGuardHoc(DevicesScreen)}
          key={'devices'}
          name={'devices'}
          options={{
            title: 'Devices',
            animation: 'slide_from_right',
            header: StackHeader,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
});
