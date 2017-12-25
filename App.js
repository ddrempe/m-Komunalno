import React, { Component } from 'react';
import {
  StackNavigator
} from 'react-navigation';
import SplashScene from './app/scenes/splashScene';
import MainScene from './app/scenes/mainScene';
import LoginScene from './app/scenes/loginScene';
import InvoicesScene from './app/scenes/invoicesScene';

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
  },
  {
    initialRouteName: 'SplashScene',
    headerMode: 'none'
  }
);