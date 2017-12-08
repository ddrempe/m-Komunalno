import React, { Component } from 'react';

export default class BaseScene extends Component<{}> {
  constructor(props) {
    super(props);
  }

  goto(scene, data) {
    this.props.navigation.navigate(scene, data);
  }
}