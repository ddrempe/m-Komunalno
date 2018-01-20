import React, { Component } from 'react';
import {
  StackNavigator
} from 'react-navigation';
import SplashScene from './app/scenes/splashScene';
import MainScene from './app/scenes/mainScene';
import LoginScene from './app/scenes/loginScene';
import InvoicesScene from './app/scenes/invoicesScene';
import UserSettingsScene from './app/scenes/userSettingsScene';
import MessagesScene from './app/scenes/messagesScene';
import NoConnectionScene from './app/scenes/noConnectionScene';

export default class App extends Component<{}> {
  render() {
    return (
      <AppNavigator/>
    );
  }
}

const AppNavigator = StackNavigator(
  {
    SplashScene: {screen: SplashScene},
    MainScene: {screen: MainScene},
    LoginScene: {screen: LoginScene},
    InvoicesScene: {screen: InvoicesScene},
    UserSettingsScene: {screen: UserSettingsScene},
    MessagesScene: {screen: MessagesScene},
    NoConnectionScene: {screen: NoConnectionScene},
  },
  {
    initialRouteName: 'SplashScene',
    headerMode: 'none'
  }
);