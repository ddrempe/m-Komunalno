import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  NetInfo,
  InteractionManager,
  Alert
} from 'react-native';
import BaseScene from './baseScene';
import Settings from '../../settings';

export default class SplashScene extends BaseScene<{}> {
  constructor(props) {
    super(props);

    InteractionManager.runAfterInteractions(() => {
      Settings.fetchAll(this.onSettingsLoad.bind(this))
        .catch((response) => Alert.alert('Error', JSON.stringify(response)));
    });
  }

  onSettingsLoad(connectedUser) {
    if (Settings.getConnectedUser()) {
        this.goto('MainScene');
    } else {
        this.goto('LoginScene');
    };
  }

  render() {
    return (
      <View style={stylesContainer}>
        <Text>Splash Scene</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E4E4E4',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
});

var stylesContainer = StyleSheet.flatten([styles.container]);