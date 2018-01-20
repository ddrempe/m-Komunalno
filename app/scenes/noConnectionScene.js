import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  BackHandler
} from 'react-native';
import {
  Button
} from 'nachos-ui';
import BaseScene from './baseScene';

export default class NoConnectionScene extends BaseScene<{}> {
  checkInternetConnection() {
    this.refreshOnConnected();
  }

  onBackPress() {
    BackHandler.exitApp();
  }

  render() {
    return (
      <View style={stylesContainer}>
        <Text style={stylesText}>Problem s internet vezom!</Text>
        <View>
          <Button
            style={stylesButton}
            kind='squared'
            iconSize={20}
            iconPosition='left'
            iconName='md-refresh'
            uppercase={false}
            children='Pokušaj ponovo'
            onPress={() => this.checkInternetConnection()}
          >
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E4E4E4',
    justifyContent: 'center',
    flex: 1,
    padding: 12
  },
  text: {
    marginBottom: 16,
    fontSize: 18,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#70B5E5',
    height: 52
  }
});

var stylesContainer = StyleSheet.flatten([styles.container]);
var stylesText = StyleSheet.flatten([styles.text]);
var stylesButton = StyleSheet.flatten([styles.button]);