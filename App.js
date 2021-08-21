/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { useColorScheme } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

import SplashScreen from 'react-native-splash-screen';

import NavigatorDrawer from './components/NavigatorDrawer';

export default function App() {
  global.brand = {
    title: "BullTronics",
    url: {
      home: "https://BullTronics.com",
      privacy: "https://BullTronics.com/privacy-policy.html"
    }
  }

  const scheme = useColorScheme();
  SplashScreen.hide();

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <NavigatorDrawer></NavigatorDrawer>
    </NavigationContainer>
  );
};
