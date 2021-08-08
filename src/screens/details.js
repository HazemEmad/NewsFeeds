import React, {useState, useEffect} from 'react';
import {View, Modal, StyleSheet} from 'react-native';
import NewsFeed from '../components/newsFeed';
import {WebView} from 'react-native-webview';
import {useIsFocused} from '@react-navigation/core';
import {get} from 'lodash';
import AppBar from '../components/appBar';
const Details = ({navigation, route}) => {
  const [webView, setWebView] = useState(false);
  const [load, setLoad] = useState(true);
  const [url, setUrl] = useState(get(route, ['params', 'item', 'url'], ''));

  const isFocused = useIsFocused();
  useEffect(() => {
    setWebView(false);
  }, [isFocused]);
  useEffect(() => {
    !webView && setLoad(true);
  }, [webView]);
  console.log(load);
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
        <AppBar
          navigation
          route
          websiteLoad={load}
          url={url}
          close={() => setWebView(false)}
          onUrlChange={url => setUrl(url)}
        />
        <WebView
          source={{uri: url}}
          onLoadStart={() => setLoad(true)}
          onLoadEnd={() => setLoad(false)}
          onNavigationStateChange={websiteState => setUrl(websiteState.url)}
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
