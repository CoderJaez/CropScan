/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import StackNavigators from './src/navigators/StackNavigators';
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <StackNavigators />
    </NavigationContainer>
  );
}

export default App;
