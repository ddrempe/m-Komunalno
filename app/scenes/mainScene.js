import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Image,
  Text,
  BackHandler,
  Dimensions
} from 'react-native';
import {
  Button
} from 'nachos-ui';
import ActionBar from '../components/actionBar';
import GridItem from '../components/gridItem';
import ListItem from '../components/listItem';
import UserRequest from '../network/userRequest';
import BaseScene from './baseScene';

export default class MainScene extends BaseScene<{}> {
  constructor(props) {
    super(props);
    this.state = {
      view: 'Prikaži kao listu',
      columns: 2,
      key: 1,
      tiles: []
    };
  }

  onToggle() {
    if (this.state.columns != 2) {
      this.setState({view: 'Prikaži kao listu', columns: 2, key: 1});
    } else {
      this.setState({view: 'Prikaži kao polje', columns: 1, key: 2});
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
        <FlatList
          contentContainerStyle={stylesFlatList}
          key={this.state.key}
          numColumns={this.state.columns}
          data={this.state.tiles}
          keyExtractor={(item, index) => (item.Id)}
          renderItem={({item}) => (
            <View>
              {
                this.state.key == 1
                ?
                <GridItem
                  iconUrl={item.IconUrl}
                  name={item.Name}
                  description={item.Description}
                  onPress={() => this.onTileClick(item.Scene)}
                />
                :
                <ListItem
                  iconUrl={item.IconUrl}
                  name={item.Name}
                  description={item.Description}
                  onPress={() => this.onTileClick(item.Scene)}
                />
              }
            </View>
          )}
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
  buttonChangeWrapper: {
    marginBottom: 46
  },
  buttonChange: {
    backgroundColor: '#70B5E5',
    height: 46
  },
  flatList: {
    margin: 2
  }
});

var stylesContainer = StyleSheet.flatten([styles.container]);
var stylesButtonChangeWrapper = StyleSheet.flatten([styles.buttonChangeWrapper]);
var stylesButtonChange = StyleSheet.flatten([styles.buttonChange]);
var stylesFlatList = StyleSheet.flatten([styles.flatList]);