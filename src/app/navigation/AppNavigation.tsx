import type { NavigatorScreenParams } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { ForgotPasswordScreen, LoginScreen, RegisterScreen } from '../../screens';
import { useAuthFlow } from '../../features/auth';
import { MainTabsNavigator } from './MainTabsNavigator';

export type MainTabParamList = {
  playlists: undefined;
  tracks: undefined;
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
  const { initialMainTabScreen, initialRouteName, isBootstrapping } =
    useAuthFlow();
  if (isBootstrapping) {
    return (
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
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
