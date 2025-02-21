import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon6 from 'react-native-vector-icons/FontAwesome6';
import BottomTabNavigator from './BottomTabNavigator';
import HomeScreen from '../components/HomeScreen';
import BookmarkScreen from '../components/BookmarkScreen';

const Drawer = createDrawerNavigator();

const CategoryHeader = () => null;

const drawerIcons: Record<
  string,
  {name: string; lib: typeof Icon | typeof Icon6}
> = {
  NowPlaying: {name: 'film', lib: Icon},
  Popular: {name: 'fire-flame-curved', lib: Icon6},
  TopRated: {name: 'trophy', lib: Icon},
  Upcoming: {name: 'calendar', lib: Icon},
  Bookmarks: {name: 'book-bookmark', lib: Icon6},
};

const renderDrawerIcon =
  (routeName: string) =>
  ({color, size}: {color: string; size: number}) => {
    const {name, lib: IconLib} = drawerIcons[routeName] || {
      name: 'question-circle',
      lib: Icon,
    };
    return <IconLib name={name} size={size} color={color} />;
  };

const DrawerNavigator = () => {
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
        component={BottomTabNavigator}
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

      <Drawer.Screen
        name="NowPlaying"
        component={HomeScreen}
        initialParams={{category: 'now_playing'}}
        options={{
          title: 'Now Playing',
          drawerIcon: renderDrawerIcon('NowPlaying'),
        }}
      />
      <Drawer.Screen
        name="Popular"
        component={HomeScreen}
        initialParams={{category: 'popular'}}
        options={{
          title: 'Popular',
          drawerIcon: renderDrawerIcon('Popular'),
        }}
      />
      <Drawer.Screen
        name="TopRated"
        component={HomeScreen}
        initialParams={{category: 'top_rated'}}
        options={{
          title: 'Top Rated',
          drawerIcon: renderDrawerIcon('TopRated'),
        }}
      />
      <Drawer.Screen
        name="Upcoming"
        component={HomeScreen}
        initialParams={{category: 'upcoming'}}
        options={{
          title: 'Upcoming',
          drawerIcon: renderDrawerIcon('Upcoming'),
        }}
      />
      <Drawer.Screen
        name="Bookmarks"
        component={BookmarkScreen}
        options={{
          title: 'Bookmarks',
          drawerIcon: renderDrawerIcon('Bookmarks'),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
