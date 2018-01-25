import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  BackHandler
} from 'react-native';
import {
  Button
} from 'nachos-ui';
import ActionBar from '../components/actionBar';
import ListFlatList from '../components/listFlatList';
import GridFlatList from '../components/gridFlatList';
import UserRequest from '../network/userRequest';
import BaseScene from './baseScene';

export default class MainScene extends BaseScene<{}> {
  constructor(props) {
    super(props);
    this.state = {
      view: 'Prikaži kao listu',
      key: 1,
      tiles: []
    };
  }

  onToggle() {
    if (this.state.key != 1) {
      this.setState({view: 'Prikaži kao listu', key: 1});
    } else {
      this.setState({view: 'Prikaži kao polje', key: 2});
    };
  }

  onTileClick(scene) {
    this.goto(scene);
  }

  onBackPress() {
    BackHandler.exitApp();
  }

  componentDidMount() {
    UserRequest.fetchTiles()
      .then((response) => this.setState({tiles: response}));
  }

  render() {
    return (
      <View style={stylesContainer}>
        <ActionBar
          title='Izbornik'
          onLeftPress={() => this.onBackPress()}
          onRightPress={() => this.logout()}
        />
        <View style={stylesButtonChangeWrapper}>
          <Button
            style={stylesButtonChange}
            kind='squared'
            iconSize={20}
            iconPosition='left'
            iconName={this.state.key != 2 ? 'md-list' : 'md-grid'}
            uppercase={false}
            children={this.state.view}
            onPress={this.onToggle.bind(this)}
          >
          </Button>
        </View>
        <View style={{flex: 1}}>
        {
          this.state.key == 1
          ?
          <GridFlatList data={this.state.tiles} onPress={(scene) => this.onTileClick(scene)}/>
          :
          <ListFlatList data={this.state.tiles} onPress={(scene) => this.onTileClick(scene)}/>
        }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E4E4E4',
    flex: 1
  },
  buttonChangeWrapper: {
    marginBottom: 46
  },
  buttonChange: {
    backgroundColor: '#70B5E5',
    height: 46
  }
});

var stylesContainer = StyleSheet.flatten([styles.container]);
var stylesButtonChangeWrapper = StyleSheet.flatten([styles.buttonChangeWrapper]);
var stylesButtonChange = StyleSheet.flatten([styles.buttonChange]);