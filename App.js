/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  StyleSheet, View
} from 'react-native';

import CatView from './views/Cat'
import List from './views/CatList'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="CatView" component={CatView} />
      </Stack.Navigator>

    </NavigationContainer>

  );
};



const styles = StyleSheet.create({

});

export default App;
