import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Text,
  Alert,
  Image
} from 'react-native';
import BaseScene from './baseScene';
import Moment from 'moment';
import MessagesRequest from '../network/messagesRequest';

export default class MessagesScene extends BaseScene<{}> {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  onMessageClick(item) {
    Alert.alert('Item', JSON.stringify(item));
  }

  componentDidMount() {
    MessagesRequest.getAllMessages()
      .then((response) => this.setState({messages: response}));
  }

  render() {
    return (
      <View style={stylesContainer}>
        <FlatList
          contentContainerStyle={stylesFlatList}
          numColumns={1}
          data={this.state.messages}
          keyExtractor={(item, index) => (item.Id)}
          renderItem={({item}) => (
            <TouchableHighlight
              underlayColor='black'
              onPress={() => this.onMessageClick(item)}
            >
              <View style={stylesTileList}>
              <Image
                    style={stylesImage}
                    source={require('./../../icons/default-message.png')} />  
                <View style={stylesSubject}>
                  <Text style={stylesSubjectText}>{item.Subject}</Text>
                </View>
                <View style={stylesDetails}>
                <Text style={stylesDateCreated}>{Moment(item.Created).format('DD.MM.YYYY.')}</Text>
                <Text style={stylesDateFrom}>{Moment(item.Created).startOf('day').fromNow()}</Text>
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
  tileList: {
    backgroundColor: '#FFFFFF',
    margin: 2,
    padding: 10
  },
  subject: {
    alignItems: 'center'
  },
  dateCreated: {
    fontFamily: 'Rubik'
  },
  subjectText: {
    paddingTop: 2,
    paddingBottom: 10,
    color: '#000000',
    fontFamily: 'Rubik',
    fontSize: 18
  },
  dateFrom: {
    fontFamily: 'Rubik'
  },
  image: {
    flexDirection: 'row',
    height: 60,
    width: 60
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

var stylesContainer = StyleSheet.flatten([styles.container]);
var stylesFlatList = StyleSheet.flatten([styles.flatList]);
var stylesTileList = StyleSheet.flatten([styles.tileList]);
var stylesSubject = StyleSheet.flatten([styles.subject]);
var stylesDateCreated = StyleSheet.flatten([styles.dateCreated]);
var stylesSubjectText = StyleSheet.flatten([styles.subjectText]);
var stylesDateFrom = StyleSheet.flatten([styles.dateFrom]);
var stylesImage = StyleSheet.flatten([styles.image]);
var stylesDetails = StyleSheet.flatten([styles.details]);