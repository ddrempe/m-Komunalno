import React, { Component } from 'react';
import {
  StackNavigator
} from 'react-navigation';
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
    LoginScene: { screen: LoginScene }
  },
  {
    initialRouteName: 'LoginScene',
    headerMode: 'none'
  }
);
