import type { NavigatorScreenParams } from '@react-navigation/native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { ForgotPasswordScreen, LoginScreen, RegisterScreen } from '../../screens';
import { useAuthFlow } from '../../features/auth';
import { useAppTheme } from '../../shared';
import { MainTabsNavigator } from './MainTabsNavigator';

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
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigation() {
  const { colors, mode } = useAppTheme();
  const { initialMainTabScreen, initialRouteName, isBootstrapping } =
    useAuthFlow();

  const navigationTheme = mode === 'dark' ? DarkTheme : DefaultTheme;

  if (isBootstrapping) {
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: colors.screenBackground,
          flex: 1,
          justifyContent: 'center',
        }}
      >
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
          initialParams={
            initialMainTabScreen
              ? { screen: initialMainTabScreen }
              : undefined
          }
          key={'mainTabs'}
          name={'mainTabs'}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
