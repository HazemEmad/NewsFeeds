import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  boldText,
  extraBoldText,
  mediumText,
  regularText,
} from '../constants/fonts';
import R from '../constants/resources';

const NewsFeed = ({navigation, item, detailsScreen, setWebView}) => {
  const [photoError, setPhotoError] = useState(false);
  const {urlToImage, title, publishedAt, author, description} = item;
  const formatedDate = new Date(publishedAt).toDateString();
  const getPhoto = () => {
    if (urlToImage && !photoError) return {uri: urlToImage};
    else return R.placeholder;
  };
  return (
    <TouchableOpacity
      style={styles.container(detailsScreen)}
      onPress={() => navigation.navigate('Details', {item})}
      disabled={detailsScreen}>
      <View style={styles.subContainer}>
        <ImageBackground
          source={getPhoto()}
          style={styles.image}
          onError={() => setPhotoError(true)}>
          {detailsScreen && <Text style={styles.date}>{formatedDate}</Text>}
        </ImageBackground>
        <View style={styles.about}>
          <Text style={styles.regularText}>{title}</Text>
          <Text style={styles.opacityText(false)}>By {author}</Text>
          {detailsScreen && (
            <Text style={styles.opacityText(false)}>{description}</Text>
          )}
          {!detailsScreen && (
            <Text style={styles.opacityText(true)}>{formatedDate}</Text>
          )}
        </View>
      </View>
      {detailsScreen && (
        <TouchableOpacity style={styles.button} onPress={setWebView}>
          <Text style={styles.textButton}>OPEN WEBITE</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: detailsScreen => ({
    width: '100%',
    elevation: detailsScreen ? 0 : 1,
    marginVertical: 10,
    backgroundColor: detailsScreen ? undefined : 'white',
  }),
  image: {
    width: '100%',
    height: 200,
  },
  about: {
    padding: 15,
  },
  regularText: {
    fontSize: 19,
    color: '#363738',
    fontFamily: mediumText,
  },
  opacityText: right => ({
    color: '#36373880',
    marginVertical: 5,
    textAlign: right ? 'right' : undefined,
    fontFamily: mediumText,
  }),
  date: {
    color: 'white',
    position: 'absolute',
    right: 10,
    bottom: 10,
    fontFamily: extraBoldText,
  },
  button: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginVertical: 10,
  },
  textButton: {
    color: 'white',
    fontFamily: boldText,
  },
  subContainer: {
    backgroundColor: 'white',
  },
});
export default NewsFeed;
