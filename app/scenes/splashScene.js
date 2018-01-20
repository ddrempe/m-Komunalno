import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  NetInfo,
  InteractionManager,
  Alert
} from 'react-native';
import Settings from '../../settings';
import BaseScene from './baseScene';

export default class SplashScene extends BaseScene<{}> {
  constructor(props) {
    super(props);
    InteractionManager.runAfterInteractions(() => {
      Settings.fetchAll(this.onSettingsLoad.bind(this))
        .catch(() => this.goto('NoConnectionScene', {title: 'NoConnectionScene'}));
    });
  }

  onSettingsLoad(connectedUser) {
    if (Settings.getConnectedUser()) {
      this.goto('MainScene');
    } else {
      this.goto('LoginScene');
    };
  }

  componentDidMount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  render() {
    return (
      <View style={stylesContainer}>
        <Image
          style={stylesLogo}
          resizeMode='contain'
          source={{uri: 'https://raw.githubusercontent.com/ddrempe/m-Komunalno/test/icons/logo.png'}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E4E4E4',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 12
  },
  logo: {
    height: 40,
    width: 40
  }
});

var stylesContainer = StyleSheet.flatten([styles.container]);
var stylesLogo = StyleSheet.flatten([styles.logo]);