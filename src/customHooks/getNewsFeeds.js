import React, {useState, useEffect} from 'react';
import {NEWS_ONE, NEWS_TWO} from '../constants/urls';
import NetInfo from '@react-native-community/netinfo';
import {get} from 'lodash';

const GetNewsFeeds = ({load, setLoad}) => {
  const [newsFeeds, setNewsFeeds] = useState([
    /* {
      urlToImage:
        'https://d27yqot8savz5t.cloudfront.net/screengrabs/images/000/013/385/small.jpg',
      author: 'hazem Emad',
      title: 'Amazing Images: The Best Science Photos of the Week',
      publishedAt: '2011-04-11T10:20:30Z',
      websiteUrl: 'https://www.siteinspire.com/websites?categories=136',
      description:
        'Each week we find the most intersting and informative articles we and along the way we uncover amzing Each week we find the most intersting and informative articles we and along the way we uncover amzing Each week we find the most intersting and informative articles we and along the way we uncover amzing Each week we find the most intersting and informative articles we and along the way we uncover amzing',
    }, */
  ]);
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

  return {newsFeeds, error};
};

export default GetNewsFeeds;
