import React, {Component} from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import MediaScreen from './components/MediaScreen.js';

global.mediaControllerHost = "media.quinncasey.com:5353"; // Bluetooth A2DP sink running MDroid-Media or MDroid-Core
global.mainControllerHost = "car.quinncasey.com:80"; // MDroid-Core or another webserver (for album artwork)

export default class App extends React.Component {
  render() {
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
