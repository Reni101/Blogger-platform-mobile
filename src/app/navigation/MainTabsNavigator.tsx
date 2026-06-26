import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from './AppNavigation';
import { PlaylistsScreen, ProfileScreen, TracksScreen } from '../../screens';
import { AudioLines, ListVideo, UserPen } from '../../shared/ui/svg';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabsNavigator = () => {
  return (
    <Tab.Navigator
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
          tabBarIcon: ({ color, size }) => (
            <UserPen color={color ?? '#666666'} size={size} />
          ),
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};
