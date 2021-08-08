import React, {useState, useEffect} from 'react';
import {NEWS_ONE, NEWS_TWO} from '../constants/urls';
import NetInfo from '@react-native-community/netinfo';
import {get} from 'lodash';

const GetNewsFeeds = ({load, setLoad}) => {
  const [newsFeeds, setNewsFeeds] = useState([]);
  const [error, setError] = useState('');

   const getLinkOne = new Promise((resolve, reject) =>
    fetch(NEWS_ONE)
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(e => reject(e)),
  );
  const GetLinkTwo = new Promise((resolve, reject) =>
    fetch(NEWS_TWO)
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(e => reject(e)),
  );
  useEffect(() => {
    let isSubscribed = true;
    if (load) {
      setError('');
      NetInfo.fetch().then(state => {
        if (state.isConnected && state.isInternetReachable) {
          Promise.all([getLinkOne, GetLinkTwo])
            .then(([News1, News2]) => {
              if (News1.articles && News2.articles && isSubscribed)
                setNewsFeeds([...News1.articles, ...News2.articles]);
              else setError(get(News1, 'message', ''));
            })
            .finally(() => setLoad(false));
        } else {
          setError('Network has Error, Please Try Again!');
          setLoad(false);
        }
      });
    }
    return () => (isSubscribed = false);
  }, [load]);
  console.log(newsFeeds);
  return {newsFeeds, error};
};

export default GetNewsFeeds;
