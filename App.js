import React, { Component } from 'react';
import {
  StackNavigator
} from 'react-navigation';
import SplashScene from './app/scenes/splashScene';
import MainScene from './app/scenes/mainScene';
import LoginScene from './app/scenes/loginScene';
import InvoicesScene from './app/scenes/invoicesScene';
import MessagesScene from './app/scenes/messagesScene';

export default class App extends Component<{}> {
  render() {
    return (
      <AppNavigator/>
    );
  }
}

const AppNavigator = StackNavigator(
  {
    SplashScene: { screen: SplashScene },
    MainScene: { screen: MainScene },
    LoginScene: { screen: LoginScene },
    InvoicesScene: { screen: InvoicesScene },
    MessagesScene: { screen: MessagesScene }
  },
  {
    initialRouteName: 'SplashScene',
    headerMode: 'none'
  }
);