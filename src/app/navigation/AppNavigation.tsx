import type { NavigatorScreenParams } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../../screens';
import { MainTabsNavigator } from './MainTabsNavigator';

export type MainTabParamList = {
  playlists: undefined;
  tracks: undefined;
  profile: undefined;
};

export type RootStackParamList = {
  login: undefined;
  mainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          component={LoginScreen}
          key={'login'}
          name={'login'}
          options={{ title: 'Login', headerShown: false }}
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
