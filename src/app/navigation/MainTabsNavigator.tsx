import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from './AppNavigation';
import { BlogsScreen, ProfileScreen, QuizGameScreen } from '../../screens';
import { AuthGuard, GameIcon, HeadsetIcon, UserPen } from '../../shared';
import { LogoutBtn } from '../../features/auth';
import { useMeQuery } from '../../features/auth/hooks/useMeQuery.ts';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabsNavigator = () => {
  useMeQuery();
  return (
    <AuthGuard>
      <Tab.Navigator
        initialRouteName="blogs"
        screenOptions={{
          headerTitleAlign: 'center',
        }}
      >
        <Tab.Screen
          component={BlogsScreen}
          name={'blogs'}
          options={{
            tabBarIcon: ({ color, size }) => (
              <HeadsetIcon color={color ?? '#666666'} size={size} />
            ),
            title: 'Blogs',
          }}
        />
        <Tab.Screen
          component={QuizGameScreen}
          name={'quizGame'}
          options={{
            tabBarIcon: ({ color, size }) => (
              <GameIcon color={color ?? '#666666'} size={size} />
            ),
            title: 'Quiz game',
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
