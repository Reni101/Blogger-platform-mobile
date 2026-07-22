import { memo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { MainTabParamList } from './AppNavigation';
import { BlogsScreen, ProfileScreenAsync, QuizGameScreen } from '../../screens';
import { GameIcon, HeadsetIcon, useAppTheme, UserPen } from '../../shared';
import { useMeQuery } from '../../entities/user';

const Tab = createBottomTabNavigator<MainTabParamList>();
const TAB_BAR_HEIGHT = 56;
const TAB_BAR_EXTRA_BOTTOM = 8;

export const MainTabsNavigator = memo(() => {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  useMeQuery();

  const tabBarBottomInset = insets.bottom + TAB_BAR_EXTRA_BOTTOM;

  return (
    <Tab.Navigator
      initialRouteName="blogs"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: colors.tabBarBackground },
        headerTintColor: colors.textPrimary,
        sceneStyle: { backgroundColor: colors.screenBackground },
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarStyle: {
          backgroundColor: colors.tabBarBackground,
          borderTopColor: colors.cardBorder,
          height: TAB_BAR_HEIGHT + tabBarBottomInset,
          paddingBottom: tabBarBottomInset,
          paddingTop: 8,
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
        component={ProfileScreenAsync}
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
  );
});
