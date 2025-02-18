import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './components/HomeScreen';
import InfoScreen from './components/InfoScreen';
import AboutScreen from './components/AboutScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const CategoryHeader = () => null;

const tabIcons: Record<string, string> = {
  HomeStack: 'home',
  About: 'info-circle',
};

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

const TabBarIcon = ({
  name,
  color,
  size,
}: {
  name: string;
  color: string;
  size: number;
}) => <Icon name={name} size={size} color={color} />;

// Navigation between screens
const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Info" component={InfoScreen} />
    </Stack.Navigator>
  );
};

// Bottom tabs
const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: renderTabBarIcon(route),
        tabBarActiveTintColor: '#4f46e5',
        tabBarStyle: {backgroundColor: 'white'},
      })}>
      <Tab.Screen name="HomeStack" component={MyStack} />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{title: 'About'}}
      />
    </Tab.Navigator>
  );
};

// Drawer
const MyDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4f46e5',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Drawer.Screen
        name="HomeTabs"
        component={MyTabs}
        options={{title: 'MovieDB'}}
      />
      <Drawer.Screen
        name="CategoryHeader"
        component={CategoryHeader}
        options={{
          drawerLabel: 'Category',
          drawerLabelStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            color: '#4f46e5',
          },
        }}
      />

      {/* Movie Categories */}
      <Drawer.Screen
        name="NowPlaying"
        component={MyStack}
        initialParams={{category: 'now_playing'}}
        options={{title: 'Now Playing'}}
      />
      <Drawer.Screen
        name="Popular"
        component={MyStack}
        initialParams={{category: 'popular'}}
        options={{title: 'Popular'}}
      />
      <Drawer.Screen
        name="TopRated"
        component={MyStack}
        initialParams={{category: 'top_rated'}}
        options={{title: 'Top Rated'}}
      />
      <Drawer.Screen
        name="Upcoming"
        component={MyStack}
        initialParams={{category: 'upcoming'}}
        options={{title: 'Upcoming'}}
      />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
};

export default App;
