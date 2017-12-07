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
import UserRequest from '../network/userRequest';

export default class MainScene extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      view: 'Grid View',
      columns: 2,
      key: 1,
      tiles: []
    };
  }

  onToggle() {
    if (this.state.columns != 2) {
      this.setState({view: 'Grid View', columns: 2, key: 1});
    } else {
      this.setState({view: 'List View', columns: 1, key: 2});
    };
  }

  onTileClick() {
    Alert.alert('Tile Click');
    //TODO: change scene on click
  }

  componentDidMount() {
    UserRequest.fetchTiles()
      .then((response) => this.setState({tiles: response}));
  }

  render() {
    return (
      <View style={stylesContainer}>
        <Button
          color='#70B5E5'
          title={this.state.view}
          onPress={this.onToggle.bind(this)}
        >
        </Button>
        <FlatList
          contentContainerStyle={stylesFlatList}
          key={this.state.key}
          numColumns={this.state.columns}
          data={this.state.tiles}
          keyExtractor={(item, index) => (item.Id)}
          renderItem={({item}) => (
            <TouchableHighlight
              underlayColor='black'
              onPress={this.onTileClick}
            >
              <View style={this.state.key != 2 ? stylesTileGrid : stylesTileList}>
                <View style={{alignItems: 'center'}}>
                  <Image
                    style={stylesImage}
                    source={item.IconUrl}
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
  description: {
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
var stylesDescription = StyleSheet.flatten([styles.description]);