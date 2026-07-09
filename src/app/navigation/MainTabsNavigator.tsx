import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from './AppNavigation';
import { BlogsScreen, QuizGameScreen } from '../../screens';
import { AuthGuard, GameIcon, HeadsetIcon, useAppTheme, UserPen } from '../../shared';
import { useMeQuery } from '../../entities/user';
import { ProfileStackNavigator } from './ProfileStackNavigator';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabsNavigator = () => {
  const { colors } = useAppTheme();
  useMeQuery();
  return (
    <AuthGuard>
      <Tab.Navigator
        initialRouteName="blogs"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: colors.tabBarBackground,
          },
          headerTintColor: colors.textPrimary,
          sceneStyle: {
            backgroundColor: colors.screenBackground,
          },
          tabBarActiveTintColor: colors.tabBarActive,
          tabBarInactiveTintColor: colors.tabBarInactive,
          tabBarStyle: {
            backgroundColor: colors.tabBarBackground,
            borderTopColor: colors.cardBorder,
          },
        }}
      >
        <Tab.Screen
          component={BlogsScreen}
          name={'blogs'}
          options={{
            tabBarIcon: ({ color, size }) => (
              <HeadsetIcon color={color ?? colors.tabBarInactive} size={size} />
            ),
            title: 'Blogs',
          }}
        />
        <Tab.Screen
          component={QuizGameScreen}
          name={'quizGame'}
          options={{
            tabBarIcon: ({ color, size }) => (
              <GameIcon color={color ?? colors.tabBarInactive} size={size} />
            ),
            title: 'Quiz game',
          }}
        />
        <Tab.Screen
          component={ProfileStackNavigator}
          name={'profile'}
          options={{
            tabBarIcon: ({ color, size }) => (
              <UserPen color={color ?? colors.tabBarInactive} size={size} />
            ),
            title: 'Profile',
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </AuthGuard>
  );
};
