import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Text,
  Modal
} from 'react-native';
import {
  Button
} from 'nachos-ui';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionBar from '../components/actionBar';
import Moment from 'moment';
import MessagesRequest from '../network/messagesRequest';
import BaseScene from './baseScene';

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
    this.setState({showMessageDetailModal: false, modalItem: []});
  }

  componentDidMount() {
    MessagesRequest.getAllMessages()
      .then((response) => this.setState({messages: response}));
  }

  render() {
    return (
      <View style={stylesContainer}>
        <ActionBar
          title='Poruke'
          onLeftPress={() => this.onBackPress()}
          onRightPress={() => this.logout()}
        />
        <Modal
          animationType='fade'
          visible={this.state.showMessageDetailModal}
          onRequestClose={() => this.closeMessageDetailModal()}
        >
          <View style={stylesModalButtonWrapper}>
            <Button
              style={stylesModalButton}
              kind='squared'
              iconSize={20}
              iconPosition='left'
              iconName='md-close'
              uppercase={false}
              children='Zatvori'
              onPress={() => this.closeMessageDetailModal()}
            >
            </Button>
          </View>
          <View style={stylesModal}>
            <Text style={stylesDateCreated}>Primljeno: {Moment(this.state.modalItem.Created).format('DD.MM.YYYY.')}</Text>
            <View>
              <Text style={stylesModalSubject}>{this.state.modalItem.Subject}</Text>
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
              <View style={item.ReadDate ? stylesTileRead : stylesTile}>
                <Text style={stylesDateCreated}>{Moment(item.Created).format('DD.MM.YYYY.')}</Text>
                <View style={stylesSubjectWrapper}>
                  <Text style={item.ReadDate ? stylesSubjectRead : stylesSubject}>{item.Subject}</Text>
                </View>
                <View style={stylesFooter}>
                  <Text style={stylesDateFrom}>{Moment(item.Created).startOf('day').fromNow()}</Text>
                  <Icon
                    size={20}
                    name={item.ReadDate ? 'md-mail-open' : 'md-mail'}
                  >
                  </Icon>
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
  tile: {
    backgroundColor: '#E2F0F9',
    margin: 2,
    padding: 10
  },
  tileRead: {
    backgroundColor: '#F1F1F1',
    margin: 2,
    padding: 10
  },
  dateCreated: {
    fontFamily: 'Rubik'
  },
  subjectWrapper: {
    alignItems: 'center'
  },
  subject: {
    paddingTop: 10,
    paddingBottom: 10,
    color: '#000000',
    fontFamily: 'Rubik',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subjectRead: {
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
  modalSubject: {
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
  },
  modalButtonWrapper: {
    marginBottom: 46
  },
  modalButton: {
    backgroundColor: '#70B5E5',
    height: 46
  }
});

var stylesContainer = StyleSheet.flatten([styles.container]);
var stylesFlatList = StyleSheet.flatten([styles.flatList]);
var stylesTile = StyleSheet.flatten([styles.tile]);
var stylesTileRead = StyleSheet.flatten([styles.tileRead]);
var stylesDateCreated = StyleSheet.flatten([styles.dateCreated]);
var stylesSubjectWrapper = StyleSheet.flatten([styles.subjectWrapper]);
var stylesSubject = StyleSheet.flatten([styles.subject]);
var stylesSubjectRead = StyleSheet.flatten([styles.subjectRead]);
var stylesFooter = StyleSheet.flatten([styles.footer]);
var stylesDateFrom = StyleSheet.flatten([styles.dateFrom]);
var stylesModal = StyleSheet.flatten([styles.modal]);
var stylesModalSubject = StyleSheet.flatten([styles.modalSubject]);
var stylesModalText = StyleSheet.flatten([styles.modalText]);
var stylesModalButtonWrapper = StyleSheet.flatten([styles.modalButtonWrapper]);
var stylesModalButton = StyleSheet.flatten([styles.modalButton]);