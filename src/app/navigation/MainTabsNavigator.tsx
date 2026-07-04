import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from './AppNavigation';
import { PlaylistsScreen, ProfileScreen, TracksScreen } from '../../screens';
import { AudioLines, ListVideo, UserPen } from '../../shared';
import { LogoutBtn } from '../../features/auth';
import { AuthGuard } from '../../shared';
import { useMeQuery } from '../../features/auth/hooks/useMeQuery.ts';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabsNavigator = () => {
  useMeQuery();
  return (
    <AuthGuard>
      <Tab.Navigator
        initialRouteName="playlists"
        screenOptions={{
          headerTitleAlign: 'center',
        }}
      >
        <Tab.Screen
          component={PlaylistsScreen}
          name={'playlists'}
          options={{
            tabBarIcon: ({ color, size }) => (
              <ListVideo color={color ?? '#666666'} size={size} />
            ),
            title: 'Playlists',
          }}
        />
        <Tab.Screen
          component={TracksScreen}
          name={'tracks'}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AudioLines color={color ?? '#666666'} size={size} />
            ),
            title: 'Tracks',
          }}
        />
        <Tab.Screen
          component={ProfileScreen}
          name={'profile'}
          options={{
            headerRight: () => <LogoutBtn />,
            tabBarIcon: ({ color, size }) => (
              <UserPen color={color ?? '#666666'} size={size} />
            ),
            title: 'Profile',
          }}
        />
      </Tab.Navigator>
    </AuthGuard>
  );
};
