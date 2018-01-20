import React, { Component } from 'react';
import {
  BackHandler,
  NetInfo
} from 'react-native';
import Settings from '../../settings';
import UserRequest from '../network/userRequest';

export default class BaseScene extends Component<{}> {
  constructor(props) {
    super(props);
    BackHandler.addEventListener('hardwareBackPress', () => this.onAndroidBackPress());
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
  }

  componentWillUnMount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  handleConnectionChange = (isConnected) => {
    if (!isConnected && this.props.navigation.state.routeName != 'NoConnectionScene') {
      this.goto('NoConnectionScene', {title: 'NoConnectionScene'});
    };
  }

  goto(scene, data) {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    this.props.navigation.navigate(scene, data);
  }

  onBackPress() {
    this.goto('MainScene');
  }

  onAndroidBackPress() {
    this.onBackPress();
    return true;
  }

  refreshOnConnected() {
    this.goto('SplashScene');
  }

  logout() {
    Settings.removeAuthHeader();
    Settings.setConnectedUser(null);

    UserRequest.logout().then(() => this.goto('LoginScene'));
  }
}