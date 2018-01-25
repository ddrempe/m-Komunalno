import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  Text,
  Dimensions
} from 'react-native';

export default class GridItem extends Component<{}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={stylesContainer}>
        <TouchableHighlight
          underlayColor='black'
          onPress={() => this.props.onPress()}
        >
          <View style={stylesTile}>
            <View style={stylesImageWrapper}>
              <Image
                style={stylesImage}
                resizeMode='contain'
                source={{uri: 'https://raw.githubusercontent.com/ddrempe/m-Komunalno/master/icons/' + this.props.iconUrl + '.png'}}
              />
            </View>
            <View style={stylesText}>
              <Text style={stylesTitle}>{this.props.name}</Text>
              <Text style={stylesDescription}>{this.props.description}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
var stylesTile = StyleSheet.flatten([styles.tile]);
var stylesImageWrapper = StyleSheet.flatten([styles.imageWrapper]);
var stylesImage = StyleSheet.flatten([styles.image]);
var stylesText = StyleSheet.flatten([styles.text]);
var stylesTitle = StyleSheet.flatten([styles.title]);
var stylesDescription = StyleSheet.flatten([styles.description]);