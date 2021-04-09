/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text
} from 'react-native';

import Cat from './views/Cat'
const App: () => Node = () => {
  return (
    <>
      <Cat />
    </>
    
  );
};

const styles = StyleSheet.create({

});

export default App;
