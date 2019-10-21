import React, {Component} from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import MediaScreen from './components/MediaScreen.js';
import {mediaHost, mainHost} from './config.json'
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import Swiper from 'react-native-swiper';

global.mediaControllerHost = mediaHost; // Bluetooth A2DP sink running MDroid-Media or MDroid-Core
global.mainControllerHost = mainHost; // MDroid-Core or another webserver (for album artwork)

export default class App extends React.Component {
  render() {
    //changeNavigationBarColor('#000000', false);

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#000000" translucent={true} />
        <MediaScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
    backgroundColor: '#000',
  },
});
