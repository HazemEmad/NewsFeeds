import React, {useState, useEffect} from 'react';
import {View, Modal, StyleSheet} from 'react-native';
import NewsFeed from '../components/newsFeed';
import {WebView} from 'react-native-webview';
import {useIsFocused} from '@react-navigation/core';
import {get} from 'lodash';
const Details = ({navigation, route}) => {
  const [webView, setWebView] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    setWebView(false);
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <NewsFeed
        navigation={navigation}
        item={get(route, ['params', 'item'], {})}
        detailsScreen={true}
        setWebView={() => setWebView(!webView)}
      />
      <Modal
        animationType={'slide'}
        visible={webView}
        onRequestClose={() => setWebView(false)}
        transparent>
        <WebView
          source={{uri: get(route, ['params', 'item', 'websiteUrl'], '')}}
        />
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});
export default Details;
