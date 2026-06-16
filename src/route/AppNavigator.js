import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home'
import Explore from '../screens/Explore'
import Favourites from '../screens/Favourites'
import Settings from '../screens/Settings'
import Auth from '../screens/Auth'
import Recipe from '../screens/Recipe'
import SearchPointer from '../screens/SearchPointer'
import { Lucide } from "@react-native-vector-icons/lucide";
import COLORS from '../constants/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: COLORS.primaryMain, tabBarStyle: { marginTop: -50,paddingVertical:8 } }}>
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon: ({ color, focused }) => <Lucide name="house" size={30} color={color} />
      }} />
      <Tab.Screen name="Explore" component={Explore} options={{
        tabBarIcon: ({ color, focused }) => <Lucide name="map-pin" size={30} color={color} />
      }} />
      <Tab.Screen name="Favourites" component={Favourites} options={{
        tabBarIcon: ({ color, focused }) => <Lucide name="heart" size={30} color={color} />,
      }}
      />
      <Tab.Screen name="Settings" component={Settings} options={{
        tabBarIcon: ({ color, focused }) => <Lucide name="settings" size={30} color={color} />
      }} />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
      />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Recipe" component={Recipe} />
      <Stack.Screen name="SearchPointer" component={SearchPointer} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
