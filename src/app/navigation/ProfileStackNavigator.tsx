import { memo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackHeader } from '../../shared';
import { ConfirmationEmailScreen, ProfileScreen } from '../../screens';
import { DevicesScreen } from '../../screens/devices-screen/ui/DevicesScreen.tsx';

export type ProfileStackParamList = {
  profileHome: undefined;
  confirmationEmail: undefined;
  devices: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStackNavigator = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ProfileScreen}
        name={'profileHome'}
        options={{ title: 'Profile', headerShown: false, animation: 'fade' }}
      />
      <Stack.Screen
        component={ConfirmationEmailScreen}
        name={'confirmationEmail'}
        options={{
          title: 'Confirm email',
          animation: 'slide_from_right' as const,
          header: StackHeader,
        }}
      />
      <Stack.Screen
        component={DevicesScreen}
        name={'devices'}
        options={{
          title: 'Devices',
          animation: 'slide_from_right' as const,
          header: StackHeader,
        }}
      />
    </Stack.Navigator>
  );
});
