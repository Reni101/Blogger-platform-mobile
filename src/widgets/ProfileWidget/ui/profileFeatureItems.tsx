import { useMemo } from 'react';
import { ProfileWidgetRowItem } from './renderProfileWidgetRow.tsx';
import { ToggleTheme } from '../../../features/toggle-theme';
import { ConfirmationEmailAction, Logout } from '../../../features/auth';
import { useMeQuery } from '../../../entities/user';
import { DevicesAction } from '../../../features/user-info';

export function useProfileFeatureItems(): ProfileWidgetRowItem[] {
  const { data: me } = useMeQuery();

  return useMemo(() => {
    const items: ProfileWidgetRowItem[] = [
      {
        id: 'theme',
        actionElement: <ToggleTheme />,
      },
      {
        id: 'devices',
        actionElement: <DevicesAction />,
      },
      {
        id: 'logout',
        actionElement: <Logout />,
      },
    ];

    if (!me?.data.isEmailConfirm) {
      items.splice(1, 0, {
        id: 'email-conformation',
        actionElement: <ConfirmationEmailAction />,
      });
    }

    return items;
  }, [me?.data.isEmailConfirm]);
}

// {
//   id: 'change-password',
//   actionElement: (
//     <View>
//       <Text>Change password</Text>
//     </View>
//   ),
// },
// {
//   id: 'change-email',
//   actionElement: (
//     <View>
//       <Text>Change email</Text>
//     </View>
//   ),
// },
