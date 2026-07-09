import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ConfirmationEmailScreen, ProfileScreen } from '../../screens';
import { DevicesScreen } from '../../screens/devices-screen/ui/DevicesScreen.tsx';

export type ProfileStackParamList = {
  profileHome: undefined;
  confirmationEmail: undefined;
  devicesScreen: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ProfileScreen}
        name={'profileHome'}
        options={{ title: 'Profile', headerShown: false }}
      />
      <Stack.Screen
        component={ConfirmationEmailScreen}
        name={'confirmationEmail'}
        options={{ title: 'Confirm email', headerShown: false }}
      />
      <Stack.Screen
        component={DevicesScreen}
        name={'devicesScreen'}
        options={{ title: 'Devices', headerShown: false }}
      />
    </Stack.Navigator>
  );
};
