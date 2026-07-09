import type { NavigatorScreenParams } from '@react-navigation/native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import {
  ForgotPasswordScreen,
  LoginScreen,
  RegisterScreen,
} from '../../screens';
import { useAuthFlow } from '../../features/auth';
import { useAppTheme } from '../../shared';
import { MainTabsNavigator } from './MainTabsNavigator';
import type { ProfileStackParamList } from './ProfileStackNavigator';

export type MainTabParamList = {
  blogs: undefined;
  quizGame: undefined;
  profile: NavigatorScreenParams<ProfileStackParamList> | undefined;
};

export type RootStackParamList = {
  login: undefined;
  register: undefined;
  forgotPassword: undefined;
  mainTabs: undefined;
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

export function AppNavigation() {
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
          options={{ title: 'Login', headerShown: false }}
        />
        <Stack.Screen
          component={RegisterScreen}
          key={'register'}
          name={'register'}
          options={{ title: 'Sign Up', headerShown: false }}
        />
        <Stack.Screen
          component={ForgotPasswordScreen}
          key={'forgotPassword'}
          name={'forgotPassword'}
          options={{ title: 'Forgot password', headerShown: false }}
        />
        <Stack.Screen
          component={MainTabsNavigator}
          key={'mainTabs'}
          name={'mainTabs'}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
