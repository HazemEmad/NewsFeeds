import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import NewsFeed from '../components/newsFeed';

import {boldText} from '../constants/fonts';
import GetNewsFeeds from '../customHooks/getNewsFeeds';

const Explore = ({navigation}) => {
  const [load, setLoad] = useState(true);
  const {newsFeeds, error} = GetNewsFeeds({load, setLoad});
  return (
    <View style={styles.container}>
      <FlatList
        data={newsFeeds}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.contentStyle(newsFeeds.length == 0)}
        ListEmptyComponent={() => (
          <Text style={styles.emptyComponent(error)}>
            {error != '' ? error : 'No News feed Found!'}
          </Text>
        )}
        onRefresh={() => setLoad(true)}
        refreshing={load}
        renderItem={({item}) => {
          return <NewsFeed item={item} navigation={navigation} />;
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  contentStyle: bool =>
    bool ? {justifyContent: 'center', alignItems: 'center', flex: 0.5} : {},
  emptyComponent: error => ({
    fontFamily: boldText,
    color: error ? 'red' : 'black',
  }),
});
export default Explore;
