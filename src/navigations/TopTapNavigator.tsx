import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from '../components/HomeScreen';
import CustomTabBar from '../components/CustomTabBar';

const TopTab = createMaterialTopTabNavigator();
const renderCustomTab = (props: any) => <CustomTabBar {...props} />;

const TopTapNavigator = () => {
  return (
    <TopTab.Navigator tabBar={renderCustomTab}>
      <TopTab.Screen
        name="NowPlaying"
        component={HomeScreen}
        initialParams={{category: 'now_playing'}}
        options={{title: 'Now Playing'}}
        key="now_playing"
      />
      <TopTab.Screen
        name="Popular"
        component={HomeScreen}
        initialParams={{category: 'popular'}}
        key="popular"
      />
      <TopTab.Screen
        name="TopRated"
        component={HomeScreen}
        initialParams={{category: 'top_rated'}}
        options={{title: 'Top Rated'}}
        key="top_rated"
      />
      <TopTab.Screen
        name="Upcoming"
        component={HomeScreen}
        initialParams={{category: 'upcoming'}}
        key="upcoming"
      />
    </TopTab.Navigator>
  );
};

export default TopTapNavigator;
