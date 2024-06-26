import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {screens} from '../constants/route';
import CameraScanScreen from '../screens/CameraScanScreen';
import RiceLeafScreen from '../screens/RiceLeafScreen';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
const Stack = createNativeStackNavigator();

const StackNavigators: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={screens.home}>
      <Stack.Screen
        name={screens.home}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={screens.camera}
        component={CameraScanScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name={screens.about} component={AboutScreen} />

      <Stack.Screen name={screens.rice_leaf} component={RiceLeafScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigators;
