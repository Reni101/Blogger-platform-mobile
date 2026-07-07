import { Text, View } from 'react-native';
import { ProfileWidgetRowItem } from './renderProfileWidgetRow.tsx';
import { ToggleTheme } from '../../../features/user-accaunts/toggle-theme';
import { Logout } from '../../../features/user-accaunts/auth';

export const profileFeatureItems: ProfileWidgetRowItem[] = [
  {
    id: 'theme',
    actionElement: <ToggleTheme />,
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
