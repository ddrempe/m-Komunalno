import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal
} from 'react-native';
import {
  Button,
  Checkbox,
  Input
} from 'nachos-ui';
import BaseScene from './baseScene';

export default class UserSettingsScene extends BaseScene<{}> {
  constructor(props) {
    super(props);
    this.state = {
        eMailAddress: '',
        mobilePhoneNumber: '',
        sendPdfCheckbox: true,
        oldPassword: '',
        newPassword: '',
        repeatPassword: '',
        showMessageDetailModal: false
    };
  }

  handleCheckboxChange = (sendPdfCheckbox) => {
    this.setState({ sendPdfCheckbox })
  }

  onUpdateClick() {
    this.setState({ showMessageDetailModal: true });
  }

  closeMessageDetailModal() {
    this.setState({ showMessageDetailModal: false });
  }

  onUpdateSend() {
    
  }

  render() {
    return (
      <View style={stylesContainer}>
        <Modal
          animationType='fade'
          visible={this.state.showMessageDetailModal}
          onRequestClose={() => this.closeMessageDetailModal()}
        >
          <View style={stylesModalButton}>
            <Button
              kind='squared'
              uppercase={false}
              children='Close Modal'
              onPress={() => this.closeMessageDetailModal()}
            >
            </Button>
          </View>
          <View style={stylesModal}>
            <Text style={stylesModalText}>Email: email@email.email</Text>
            <Input
              style={stylesInput}
              height={52}
              underlineColorAndroid='transparent'
              autoCapitalize='none'
              placeholder='Novi email'
              value={this.state.eMailAddress}
              onChangeText={eMailAddress => this.setState({eMailAddress})}
            />
            <Text style={stylesModalText}>Broj mobitela: 099 123 456 789</Text>
            <Input
              style={stylesInput}
              height={52}
              underlineColorAndroid='transparent'
              autoCapitalize='none'
              placeholder='Novi broj mobitela'
              value={this.state.mobilePhoneNumber}
              onChangeText={mobilePhoneNumber => this.setState({mobilePhoneNumber})}
            />
            <View style={stylesCheckbox}>
              <Text style={stylesModalText}>Šalji PDF:</Text>
              <Checkbox
                checked={this.state.sendPdfCheckbox}
                onValueChange={this.handleCheckboxChange}
              />
            </View>
            <Text style={stylesModalText}>Lozinka:</Text>
            <Input
              style={stylesInput}
              height={52}
              underlineColorAndroid='transparent'
              secureTextEntry={true}
              placeholder='Trenutna lozinka'
              value={this.state.oldPassword}
              onChangeText={oldPassword => this.setState({oldPassword})}
            />
            <Input
              style={stylesInput}
              height={52}
              underlineColorAndroid='transparent'
              secureTextEntry={true}
              placeholder='Nova lozinka'
              value={this.state.newPassword}
              onChangeText={newPassword => this.setState({newPassword})}
            />
            <Input
              style={stylesInput}
              height={52}
              underlineColorAndroid='transparent'
              secureTextEntry={true}
              placeholder='Ponovljena lozinka'
              value={this.state.repeatPassword}
              onChangeText={repeatPassword => this.setState({repeatPassword})}
            />
            <Button
              style={stylesButtonUpdate}
              kind='squared'
              iconSize={20}
              iconPosition='left'
              iconName='md-create'
              uppercase={false}
              children='Spremi promjene'
              onPress={this.onUpdateSend.bind(this)}
            >
            </Button>
          </View>
        </Modal>

        <Text style={stylesText}>Email: email@email.email</Text>
        <Text style={stylesText}>Broj mobitela: 099 123 456 789</Text>
        <View style={stylesCheckbox}>
          <Text style={stylesText}>Šalji PDF:</Text>
          <Checkbox
            checked={this.state.sendPdfCheckbox}
          />
        </View>
        <Button
          style={stylesButtonUpdate}
          kind='squared'
          iconSize={20}
          iconPosition='left'
          iconName='md-create'
          uppercase={false}
          children='Ažuriraj podatke'
          onPress={this.onUpdateClick.bind(this)}
        >
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E4E4E4',
    flex: 1,
    padding: 10
  },
  text: {
    paddingBottom: 10,
    fontSize: 18,
    color: '#000000'
  },
  checkbox: {
    paddingBottom: 10
  },
  buttonUpdate: {
    backgroundColor: '#70B5E5',
  },
  modal: {
    padding: 10
  },
  input: {
    marginBottom: 10
  },
  modalText: {
    paddingBottom: 10,
    fontSize: 14,
    color: '#000000'
  },
  modalButton: {
    paddingBottom: 50
  }
});

var stylesContainer = StyleSheet.flatten([styles.container]);
var stylesText = StyleSheet.flatten([styles.text]);
var stylesCheckbox = StyleSheet.flatten([styles.checkbox]);
var stylesButtonUpdate = StyleSheet.flatten([styles.buttonUpdate]);
var stylesModal = StyleSheet.flatten([styles.modal]);
var stylesInput = StyleSheet.flatten([styles.input]);
var stylesModalText = StyleSheet.flatten([styles.modalText]);
var stylesModalButton = StyleSheet.flatten([styles.modalButton]);