import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ActionBar extends Component<{}> {
  render() {
    return (
      <View style={stylesContainer}>
        <TouchableOpacity
          style={stylesIconWrapper}
          onPress={() => this.props.onLeftPress()}
        >
          <Icon
            size={20}
            name='md-arrow-back'
          />
        </TouchableOpacity>
        <Text style={stylesTitle}>{this.props.title}</Text>
        <TouchableOpacity
          style={stylesIconWrapper}
          onPress={() => this.props.onRightPress()}
        >
          <Icon
            size={20}
            name='md-log-out'
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8
  },
  title: {
    color: 'gray',
    fontSize: 16,
    fontFamily: 'Rubik'
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30
  }
});

var stylesContainer = StyleSheet.flatten([styles.container]);
var stylesTitle = StyleSheet.flatten([styles.title]);
var stylesIconWrapper = StyleSheet.flatten([styles.iconWrapper]);
