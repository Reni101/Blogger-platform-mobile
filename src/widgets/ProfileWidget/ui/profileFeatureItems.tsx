import { Text, View } from 'react-native';
import { ProfileWidgetRowItem } from './renderProfileWidgetRow.tsx';
import { ToggleTheme } from '../../../features/toggle-theme';
import { Logout } from '../../../features/auth';

export const profileFeatureItems: ProfileWidgetRowItem[] = [
  {
    id: 'theme',
    actionElement: <ToggleTheme />,
  },
  {
    id: 'email-conformation',
    actionElement: <Text>Confirm email</Text>,
  },
  {
    id: 'change-password',
    actionElement: (
      <View>
        <Text>Change password</Text>
      </View>
    ),
  },
  {
    id: 'change-email',
    actionElement: (
      <View>
        <Text>Change email</Text>
      </View>
    ),
  },
  {
    id: 'logout',
    actionElement: <Logout />,
  },
];
