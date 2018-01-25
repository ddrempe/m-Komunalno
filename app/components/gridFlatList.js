import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Image,
  Text,
  Dimensions
} from 'react-native';

export default class GridFlatList extends Component<{}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={stylesContainer}>
        <FlatList
          contentContainerStyle={stylesFlatList}
          numColumns={2}
          data={this.props.data}
          keyExtractor={(item, index) => (item.Id)}
          renderItem={({item}) => (
            <TouchableHighlight
              underlayColor='black'
              onPress={() => this.props.onPress(item.Scene)}
            >
              <View style={stylesTile}>
                <View style={stylesImageWrapper}>
                  <Image
                    style={stylesImage}
                    resizeMode='contain'
                    source={{uri: 'https://raw.githubusercontent.com/ddrempe/m-Komunalno/master/icons/' + item.IconUrl + '.png'}}
                  />
                </View>
                <View style={stylesText}>
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
    flex: 1
  },
  flatList: {
    margin: 2
  },
  tile: {
    backgroundColor: '#FFFFFF',
    margin: 2,
    padding: 10,
    width: Dimensions.get('window').width / 2 - 6
  },
  imageWrapper: {
    alignItems: 'center'
  },
  image: {
    height: 72,
    width: 72
  },
  text: {
    paddingTop: 10
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
var stylesTile = StyleSheet.flatten([styles.tile]);
var stylesImageWrapper = StyleSheet.flatten([styles.imageWrapper]);
var stylesImage = StyleSheet.flatten([styles.image]);
var stylesText = StyleSheet.flatten([styles.text]);
var stylesTitle = StyleSheet.flatten([styles.title]);
var stylesDescription = StyleSheet.flatten([styles.description]);
