import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Explore from '../screens/explore';
import Details from '../screens/details';
import AppBar from '../components/appBar';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: props => <AppBar {...props} />,
      }}>
      <Stack.Screen name="Explore" component={Explore} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

export default AppStack;
