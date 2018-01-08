import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Text,
  Alert,
  Modal,
  Button
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import BaseScene from './baseScene';
import Moment from 'moment';
import MessagesRequest from '../network/messagesRequest';

export default class MessagesScene extends BaseScene<{}> {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      showMessageDetailModal: false,
      modalItem: []
    };
  }

  onMessageClick(item) {
    this.setState({ showMessageDetailModal: true , modalItem: item});

    if(item.ReadDate == null){
      MessagesRequest.updateMessageReadDate(item.MessageId);

      let messagesUpdated = this.state.messages;
      const index = messagesUpdated.findIndex(messageToUpdate => messageToUpdate.MessageId === item.MessageId);
      messagesUpdated[index].ReadDate = 1;
      this.setState({ messages: messagesUpdated});
    }
  }

  closeMessageDetailModal(){
    this.setState({ showMessageDetailModal: false, modalItem: [] });
  }

  componentDidMount() {
    MessagesRequest.getAllMessages()
      .then((response) => this.setState({messages: response}));
  }

  render() {
    return (
      <View style={stylesContainer}>
        <Modal
          animationType='fade'
          visible={this.state.showMessageDetailModal}
          onRequestClose={() => this.closeMessageDetailModal()}
        >
          <Button
            color='#70B5E5'
            onPress={() => this.closeMessageDetailModal()}
            title="Close Modal"
          />
          <View style={stylesModal}>
            <Text style={stylesDateCreated}>Primljeno: {Moment(this.state.modalItem.Created).format('DD.MM.YYYY.')}</Text>
            <View>
              <Text style={stylesModalSubjectText}>{this.state.modalItem.Subject}</Text>
            </View>
            <Text style={stylesModalText}>{this.state.modalItem.Text}</Text>
          </View>
        </Modal>

        <FlatList
          contentContainerStyle={stylesFlatList}
          numColumns={1}
          data={this.state.messages}
          extraData={this.state}
          keyExtractor={(item, index) => (item.Id)}
          renderItem={({item}) => (
            <TouchableHighlight
              underlayColor='black'
              onPress={() => this.onMessageClick(item)}
            >
              <View style={item.ReadDate ? stylesTileListRead : stylesTileList}>
                <Text style={stylesDateCreated}>{Moment(item.Created).format('DD.MM.YYYY.')}</Text>
                <View style={stylesSubject}>
                  <Text style={item.ReadDate ? stylesSubjectTextRead : stylesSubjectText}>{item.Subject}</Text>
                </View>
                <View style={stylesFooter}>
                  <Text style={stylesDateFrom}>{Moment(item.Created).startOf('day').fromNow()}</Text>
                  <Ionicons
                    size={20}
                    name={item.ReadDate ? 'md-mail-open' : 'md-mail'}
                  >
                  </Ionicons>
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
  tileListRead: {
    backgroundColor: '#D6DBE0',
    margin: 2,
    padding: 10
  },
  dateCreated: {
    fontFamily: 'Rubik'
  },
  subject: {
    alignItems: 'center'
  },
  subjectText: {
    paddingTop: 10,
    paddingBottom: 10,
    color: '#000000',
    fontFamily: 'Rubik',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subjectTextRead: {
    paddingTop: 10,
    paddingBottom: 10,
    color: '#000000',
    fontFamily: 'Rubik',
    fontSize: 16,
    textAlign: 'center'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dateFrom: {
    fontFamily: 'Rubik'
  },
  modal: {
    padding: 10
  },
  modalSubjectText: {
    paddingTop: 10,
    paddingBottom: 10,
    color: '#000000',
    fontFamily: 'Rubik',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    fontFamily: 'Rubik',
    fontSize: 16,
    color: '#000000'
  }
});

var stylesContainer = StyleSheet.flatten([styles.container]);
var stylesFlatList = StyleSheet.flatten([styles.flatList]);
var stylesTileList = StyleSheet.flatten([styles.tileList]);
var stylesTileListRead = StyleSheet.flatten([styles.tileListRead]);
var stylesSubject = StyleSheet.flatten([styles.subject]);
var stylesDateCreated = StyleSheet.flatten([styles.dateCreated]);
var stylesSubjectText = StyleSheet.flatten([styles.subjectText]);
var stylesSubjectTextRead = StyleSheet.flatten([styles.subjectTextRead]);
var stylesFooter = StyleSheet.flatten([styles.footer]);
var stylesDateFrom = StyleSheet.flatten([styles.dateFrom]);
var stylesModalText = StyleSheet.flatten([styles.modalText]);
var stylesModal = StyleSheet.flatten([styles.modal]);
var stylesModalSubjectText = StyleSheet.flatten([styles.modalSubjectText]);