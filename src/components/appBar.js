import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import {boldText} from '../constants/fonts';
import R from '../constants/resources';

const AppBar = ({navigation, route, websiteLoad, close, url, onUrlChange}) => {
  const title = route.name;
  const [websiteUrl, setWebsiteUrl] = useState(url);
  const _onPress = () => {
    if (title == 'Explore' && !websiteLoad) navigation.openDrawer();
    else if (websiteLoad != undefined) close();
    else navigation.pop();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={_onPress} style={styles.navigators}>
        {websiteLoad != undefined ? (
          <Image source={websiteLoad ? R.load : R.close} style={styles.icon} />
        ) : (
          <Image
            source={title == 'Explore' ? R.drawer : R.back}
            style={styles.icon}
          />
        )}
      </TouchableOpacity>
      {websiteLoad == undefined ? (
        <>
          <Text style={styles.boldText}>LINK DEVELOPMENT</Text>
          <TouchableOpacity style={styles.navigators}>
            <Image source={R.search} style={styles.icon} />
          </TouchableOpacity>
        </>
      ) : (
        <TextInput
          placeholder={'Type a url'}
          value={websiteUrl}
          style={{flex: 1}}
          onChangeText={text => setWebsiteUrl(text)}
          onSubmitEditing={() => onUrlChange(websiteUrl)}
        />
      )}
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
