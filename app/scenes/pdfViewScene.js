import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Alert
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Pdf from 'react-native-pdf';
import ActionBar from '../components/actionBar';
import BaseScene from './baseScene';

export default class PdfViewScene extends BaseScene<{}> {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true
    };
    this.pdf = null;
  }

  onBackPress() {
    var refererScene = this.props.navigation.state.params.refererScene;
    this.goto(refererScene, this.props.navigation.state.params.refererParams);
  }

  render() {
    let source = {uri: this.props.navigation.state.params.url, cache: true};

    return (
      <View style={stylesContainer}>
        <ActionBar
          title={this.props.navigation.state.params.title}
          onLeftPress={() => this.onBackPress()}
          onRightPress={() => this.logout()}
        />
        <Pdf
          style={stylesPdf}
          ref={(pdf) => {this.pdf = pdf}}
          source={source}
          page={1}
          horizontal={false}
          onLoadComplete={() => this.setState({spinner: false})}
          onError={(error) => {
            this.setState({spinner: false});
            Alert.alert('Greška!', JSON.stringify(error));
          }}
        />
        <Spinner
          visible={this.state.spinner}
          textStyle={{color: '#FFFFFF'}}
          textContent='Učitavam...'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E4E4E4',
    flex: 1
  },
  pdf: {
    flex:1,
    width: Dimensions.get('window').width
  }
});

var stylesContainer = StyleSheet.flatten([styles.container]);
var stylesPdf = StyleSheet.flatten([styles.pdf]);