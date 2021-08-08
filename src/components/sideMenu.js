import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { mediumText, regularText} from '../constants/fonts';
import R from '../constants/resources';
const SideMenu = ({navigation}) => {
  const items = [
    {
      name: 'Explore',
      iconName: R.explore,
    },
    {
      name: 'LiveChat',
      iconName: R.live,
    },
    {
      name: 'Gallery',
      iconName: R.gallery,
    },
    {
      name: 'WishList',
      iconName: R.wishlist,
    },
    {
      name: 'E-Magazine',
      iconName: R.magazine,
    },
  ];
  const _onPress = name => {
    if (name == 'Explore') navigation.navigate('AppStack');
    else Alert.alert('Screen Name', name);
  };
  return (
    <View style={styles.container}>
      <View style={styles.row(true)}>
        <Image source={R.profile} style={styles.profile} />
        <View style={styles.centerItems}>
          <Text style={styles.opacityText}>Welcome</Text>
          <Text style={styles.text}>Tony Roshdy</Text>
        </View>
        <Image source={R.arrow} style={styles.icon(true)} />
      </View>
      {items.map(item => (
        <TouchableOpacity
          key={item.name}
          style={styles.row(false)}
          onPress={() => _onPress(item.name)}>
          <Image source={item.iconName} style={styles.icon(false)} />
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  text: {
    fontSize: 18,
    color: 'black',
    fontFamily: mediumText,
  },
  opacityText: {
    fontSize: 17,
    color: '#00000060',
    fontFamily: regularText,
  },
  row: spaceBetween => ({
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: spaceBetween ? 'space-between' : undefined,
  }),
  icon: noMargin => ({
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: noMargin ? 0 : 20,
  }),
  profile: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'contain',
  },
  centerItems: {
    alignItems: 'flex-start',
  },
});
export default SideMenu;
