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

  onTileClick(item) {
    this.goto(item.Scene, {title: item.title});
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
            <TouchableHighlight
              underlayColor='black'
              onPress={() => this.onTileClick(item)}
            >
              <View style={this.state.key != 2 ? stylesTileGrid : stylesTileList}>
                <View style={stylesImageWrapper}>
                  <Image
                    style={stylesImage}
                    resizeMode='contain'
                    source={{uri: 'https://raw.githubusercontent.com/ddrempe/m-Komunalno/master/icons/' + item.IconUrl + '.png'}}
                  />
                </View>
                <View style={this.state.key != 2 ? stylesTextGrid : stylesTextList}>
                  <Text style={stylesTitle}>{item.Name}</Text>
                  <Text style={stylesDescription}>{item.Description}</Text>
                </View>
              </View>
            </TouchableHighlight>
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
    marginBottom: 40
  },
  buttonChange: {
    backgroundColor: '#70B5E5',
    height: 40
  },
  flatList: {
    margin: 2
  },
  tileGrid: {
    backgroundColor: '#FFFFFF',
    margin: 2,
    padding: 10,
    width: Dimensions.get('window').width / 2 - 6
  },
  tileList: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 2,
    padding: 10
  },
  imageWrapper: {
    alignItems: 'center'
  },
  image: {
    height: 72,
    width: 72
  },
  textGrid: {
    paddingTop: 10
  },
  textList: {
    paddingLeft: 10
  },
  title: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold'
  },
  description: {
    paddingTop: 10
  }
});

var stylesContainer = StyleSheet.flatten([styles.container]);
var stylesButtonChangeWrapper = StyleSheet.flatten([styles.buttonChangeWrapper]);
var stylesButtonChange = StyleSheet.flatten([styles.buttonChange]);
var stylesFlatList = StyleSheet.flatten([styles.flatList]);
var stylesTileGrid = StyleSheet.flatten([styles.tileGrid]);
var stylesTileList = StyleSheet.flatten([styles.tileList]);
var stylesImageWrapper = StyleSheet.flatten([styles.imageWrapper]);
var stylesImage = StyleSheet.flatten([styles.image]);
var stylesTextGrid = StyleSheet.flatten([styles.textGrid]);
var stylesTextList = StyleSheet.flatten([styles.textList]);
var stylesTitle = StyleSheet.flatten([styles.title]);
var stylesDescription = StyleSheet.flatten([styles.description]);