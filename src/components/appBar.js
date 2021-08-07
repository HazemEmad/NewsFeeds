import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {boldText} from '../constants/fonts';
import R from '../constants/resources';

const AppBar = ({navigation, route}) => {
  /*  _.get(scene, ['route', 'params', 'title']) */
  const title = route.name;
  const _onPress = () => {
    if (title == 'Explore') navigation.openDrawer();
    else navigation.pop();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={_onPress} style={styles.navigators}>
        <Image
          source={title == 'Explore' ? R.drawer : R.back}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Text style={styles.boldText}>LINK DEVELOPMENT</Text>
      <TouchableOpacity style={styles.navigators}>
        <Image source={R.search} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'black',
  },
  boldText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 30,
    fontFamily: boldText,
  },
  icon: {
    width: 25,
    height: 20,
    resizeMode: 'contain',
  },
  navigators: {
    paddingHorizontal: 8,
  },
});
export default AppBar;
