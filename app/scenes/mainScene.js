import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Image,
  Text,
  Alert
} from 'react-native';
import GridView from 'react-native-super-grid';

export default class MainScene extends Component<{}> {
  onTileClick() {
    Alert.alert('Tile Click');
    //TODO
  }

  render() {
    //hardcoded temporary tiles for design purposes
    const tiles = [
      { id: 1, title: 'Title 1', subtitle: 'Subtitle 1'},
      { id: 2, title: 'Title 2', subtitle: 'Subtitle 2'},
      { id: 3, title: 'Title 3', subtitle: 'Subtitle 3'},
      { id: 4, title: 'Title 4', subtitle: 'Subtitle 4'},
      { id: 5, title: 'Title 5', subtitle: 'Subtitle 5'},
      { id: 6, title: 'Title 6', subtitle: 'Subtitle 6'},
      { id: 7, title: 'Title 7', subtitle: 'Subtitle 7'}
    ];

    return (
      <GridView
        style={stylesGridView}
        spacing={4}
        itemWidth={170}
        items={tiles}
        renderItem={(tile) => (
          <TouchableHighlight
            underlayColor='black'
            onPress={this.onTileClick}
          >
            <View style={stylesTile}>
              <View style={{alignItems: 'center'}}>
                <Image
                  style={stylesImage}
                  source={require('../images/default-settings.png')}
                />
              </View>
              <Text style={stylesTitle}>{tile.title}</Text>
              <Text style={stylesSubtitle}>{tile.subtitle}</Text>
            </View>
          </TouchableHighlight>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    backgroundColor: '#E4E4E4',
    flex: 1
  },
  tile: {
    backgroundColor: '#FFFFFF',
    padding: 10
  },
  image: {
    height: 72,
    width: 72
  },
  title: {
    paddingTop: 10,
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold'
  },
  subtitle: {
    paddingTop: 10
  }
});

var stylesGridView = StyleSheet.flatten([styles.gridView]);
var stylesTile = StyleSheet.flatten([styles.tile]);
var stylesImage = StyleSheet.flatten([styles.image]);
var stylesTitle = StyleSheet.flatten([styles.title]);
var stylesSubtitle = StyleSheet.flatten([styles.subtitle]);