import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideMenu from '../components/sideMenu';
import AppStack from './appStack';
const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <SideMenu {...props} />}>
        <Drawer.Screen
          name="AppStack"
          component={AppStack}
          options={{headerShown: false}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
