import React, {Component} from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import MediaScreen from './components/MediaScreen.js';

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
