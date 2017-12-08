import React, { Component } from 'react';
import {
  StackNavigator
} from 'react-navigation';
import MainScene from './app/scenes/mainScene';
import LoginScene from './app/scenes/loginScene';

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
    LoginScene: { screen: LoginScene }
  },
  {
    initialRouteName: 'LoginScene',
    headerMode: 'none'
  }
);
