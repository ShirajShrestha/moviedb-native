import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import AboutPage from '../pages/AboutPage';
import StackNavigator from './StackNavigator';

const Tab = createBottomTabNavigator();

const tabIcons: Record<string, string> = {
  HomeStack: 'home',
  About: 'info-circle',
};

const TabBarIcon = ({
  name,
  color,
  size,
}: {
  name: string;
  color: string;
  size: number;
}) => <Icon name={name} size={size} color={color} />;

const renderTabBarIcon =
  (route: {name: string}) =>
  ({color, size}: {color: string; size: number}) =>
    (
      <TabBarIcon
        name={tabIcons[route.name] || 'question-circle'}
        color={color}
        size={size}
      />
    );

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: renderTabBarIcon(route),
        tabBarActiveTintColor: '#4f46e5',
        tabBarStyle: {backgroundColor: 'white'},
      })}>
      {/* Check this later if problem occurs */}
      {/* screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <TabBarIcon
            name={tabIcons[route.name] || 'question-circle'}
            color={color}
            size={size}
          />
        ),
        tabBarActiveTintColor: '#4f46e5',
        tabBarStyle: { backgroundColor: 'white' },
      })}
    > */}
      <Tab.Screen name="HomeStack" component={StackNavigator} />
      <Tab.Screen
        name="About"
        component={AboutPage}
        options={{title: 'About'}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
