import React, { Component } from 'react';
import {
  StackNavigator
} from 'react-navigation';
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
    MainScene: { screen: MainScene },
    LoginScene: { screen: LoginScene },
    InvoicesScene: { screen: InvoicesScene },
  },
  {
    initialRouteName: 'LoginScene',
    headerMode: 'none'
  }
);
