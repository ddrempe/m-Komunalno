import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Image,
  Text,
  Button,
  Dimensions,
  Alert
} from 'react-native';

export default class MainScene extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      view: 'Grid View',
      columns: 2,
      key: 1
    };
  }

  onToggle() {
    if (this.state.columns != 2) {
      this.setState({view: 'Grid View', columns: 2, key: 1})
    }
    else {
      this.setState({view: 'List View', columns: 1, key: 2})
    };
  }

  onTileClick() {
    Alert.alert('Tile Click');
    //TODO: change scene on click
  }

  render() {
    //TODO: tiles data needs to be pulled from web API
    var tiles = [
      { id: 1, title: 'Title 1', description: 'Description 1', image: require('../images/default-settings.png') },
      { id: 2, title: 'Title 2', description: 'Description 2', image: require('../images/default-settings.png') },
      { id: 3, title: 'Title 3', description: 'Description 3', image: require('../images/default-settings.png') },
      { id: 4, title: 'Title 4', description: 'Description 4', image: require('../images/default-settings.png') },
      { id: 5, title: 'Title 5', description: 'Description 5', image: require('../images/default-settings.png') },
      { id: 6, title: 'Title 6', description: 'Description 6', image: require('../images/default-settings.png') },
      { id: 7, title: 'Title 7', description: 'Description 7', image: require('../images/default-settings.png') }
    ];

    return (
      <View style={stylesContainer}>
        <Button
          color='#70B5E5'
          title={this.state.view}
          onPress = {this.onToggle.bind(this)}
        >
        </Button>
        <FlatList
          contentContainerStyle={stylesFlatList}
          key={this.state.key}
          numColumns={this.state.columns}
          data={tiles}
          renderItem={({item}) => (
            <TouchableHighlight
              underlayColor='black'
              onPress={this.onTileClick}
            >
              <View style={this.state.key != 2 ? stylesTileGrid : stylesTileList}>
                <View style={{alignItems: 'center'}}>
                  <Image
                    style={stylesImage}
                    source={item.image}
                  />
                </View>
                <View style={this.state.key != 2 ? stylesTextGrid : stylesTextList}>
                  <Text style={stylesTitle}>{item.title}</Text>
                  <Text style={stylesSubtitle}>{item.description}</Text>
                </View>
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={(item, index) => (item.id)}
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
  subtitle: {
    paddingTop: 10
  }
});

var stylesContainer = StyleSheet.flatten([styles.container]);
var stylesFlatList = StyleSheet.flatten([styles.flatList]);
var stylesTileGrid = StyleSheet.flatten([styles.tileGrid]);
var stylesTileList = StyleSheet.flatten([styles.tileList]);
var stylesImage = StyleSheet.flatten([styles.image]);
var stylesTextGrid = StyleSheet.flatten([styles.textGrid]);
var stylesTextList = StyleSheet.flatten([styles.textList]);
var stylesTitle = StyleSheet.flatten([styles.title]);
var stylesSubtitle = StyleSheet.flatten([styles.subtitle]);