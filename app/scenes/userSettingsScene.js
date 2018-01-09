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
import Icon from 'react-native-vector-icons/FontAwesome';
import BaseScene from './baseScene';

export default class UserSettingsScene extends BaseScene<{}> {
  constructor(props) {
    super(props);
    this.state = {
      eMailAddress: 'emai@email.email',
      mobilePhoneNumber: '099 123 456 789',
      sendPdfCheckbox: true,
      oldPassword: '',
      newPassword: '',
      repeatPassword: '',
      showUserDataModal: false,
      showPasswordModal: false
    };
  }

  openUserDataModal() {
    this.setState({ showUserDataModal: true });
  }

  openPasswordModal() {
    this.setState({ showPasswordModal: true });
  }

  closeUserDataModal() {
    this.setState({ showUserDataModal: false });
  }

  closePasswordModal() {
    this.setState({ showPasswordModal: false });
  }

  handleCheckboxChange = (sendPdfCheckbox) => {
    this.setState({ sendPdfCheckbox })
  }

  onPasswordUpdate() {

  }

  onUserDataUpdate() {

  }

  render() {
    return (
      <View style={stylesContainer}>
        <Modal
          animationType='fade'
          visible={this.state.showUserDataModal}
          onRequestClose={() => this.closeUserDataModal()}
        >
          <View style={stylesButtonCloseModalWrapper}>
            <Button
              style={stylesButtonCloseModal}
              kind='squared'
              uppercase={false}
              children='Zatvori prozor'
              onPress={() => this.closeUserDataModal()}
            >
            </Button>
          </View>
          <View style={stylesModal}>
            <View style={stylesModalTitle}>
              <Text style={stylesModalTitleText}>Promjena korisničkih podataka</Text>
            </View>
            <View style={stylesRow}>
              <View style={stylesIcon}>
                <Icon
                  size={20}
                  name='envelope-o'
                />
              </View>
              <Input
                style={stylesInput}
                height={52}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
                placeholder='Novi email'
                value={this.state.eMailAddress}
                onChangeText={eMailAddress => this.setState({eMailAddress})}
              />
            </View>
            <View style={stylesRow}>
              <View style={stylesIcon}>
                <Icon
                  size={20}
                  name='phone'
                />
              </View>
              <Input
                style={stylesInput}
                height={52}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
                placeholder='Novi broj mobitela'
                value={this.state.mobilePhoneNumber}
                onChangeText={mobilePhoneNumber => this.setState({mobilePhoneNumber})}
              />
            </View>
            <View style={stylesCheckboxWrapper}>
              <Text style={stylesModalInfo}>Želim primati PDF račune: </Text>
              <Checkbox
                style={stylesCheckbox}
                checked={this.state.sendPdfCheckbox}
                onValueChange={this.handleCheckboxChange}
              />
            </View>
            <Button
              style={stylesButtonUpdate}
              kind='squared'
              iconSize={20}
              iconPosition='left'
              iconName='md-checkmark'
              uppercase={false}
              children='Spremi promjene'
              onPress={this.onPasswordUpdate.bind(this)}
            >
            </Button>
          </View>
        </Modal>

        <Modal
          animationType='fade'
          visible={this.state.showPasswordModal}
          onRequestClose={() => this.closePasswordModal()}
        >
          <View style={stylesButtonCloseModalWrapper}>
            <Button
              style={stylesButtonCloseModal}
              kind='squared'
              uppercase={false}
              children='Zatvori prozor'
              onPress={() => this.closePasswordModal()}
            >
            </Button>
          </View>
          <View style={stylesModal}>
            <View style={stylesModalTitle}>
              <Text style={stylesModalTitleText}>Promjena lozinke</Text>
            </View>
            <View style={stylesRow}>
              <View style={stylesIcon}>
                <Icon
                  size={20}
                  name='unlock'
                />
              </View>
              <Input
                style={stylesInput}
                height={52}
                underlineColorAndroid='transparent'
                secureTextEntry={true}
                placeholder='Trenutna lozinka'
                value={this.state.oldPassword}
                onChangeText={oldPassword => this.setState({oldPassword})}
              />
            </View>
            <View style={stylesRow}>
              <View style={stylesIcon}>
                <Icon
                  size={20}
                  name='unlock-alt'
                />
              </View>
              <Input
                style={stylesInput}
                height={52}
                underlineColorAndroid='transparent'
                secureTextEntry={true}
                placeholder='Nova lozinka'
                value={this.state.newPassword}
                onChangeText={newPassword => this.setState({newPassword})}
              />
            </View>
            <View style={stylesRow}>
              <View style={stylesIcon}>
                <Icon
                  size={20}
                  name='lock'
                />
              </View>
              <Input
                style={stylesInput}
                height={52}
                underlineColorAndroid='transparent'
                secureTextEntry={true}
                placeholder='Ponovljena lozinka'
                value={this.state.repeatPassword}
                onChangeText={repeatPassword => this.setState({repeatPassword})}
              />
            </View>
            <Button
              style={stylesButtonUpdate}
              kind='squared'
              iconSize={20}
              iconPosition='left'
              iconName='md-checkmark'
              uppercase={false}
              children='Spremi promjene'
              onPress={this.onPasswordUpdate.bind(this)}
            >
            </Button>
          </View>
        </Modal>

        <Text style={stylesInfo}>Email: {this.state.eMailAddress}</Text>
        <Text style={stylesInfo}>Broj mobitela: {this.state.mobilePhoneNumber}</Text>
        <View style={stylesCheckboxWrapper}>
          <Text style={stylesInfo}>Želim primati PDF račune: </Text>
          <Checkbox
            style={stylesCheckbox}
            activeOpacity={1}
            checked={this.state.sendPdfCheckbox}
          />
        </View>
        <View>
          <Button
            style={stylesButtonUpdate}
            kind='squared'
            iconSize={20}
            iconPosition='left'
            iconName='md-create'
            uppercase={false}
            children='Ažuriranje podataka'
            onPress={this.openUserDataModal.bind(this)}
          >
          </Button>
          <Button
            style={stylesButtonUpdateSecond}
            kind='squared'
            iconSize={20}
            iconPosition='left'
            iconName='md-lock'
            uppercase={false}
            children='Promjena lozinke'
            onPress={this.openPasswordModal.bind(this)}
          >
          </Button>
        </View>
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
  info: {
    paddingBottom: 16,
    fontSize: 18,
    color: '#000000'
  },
  checkboxWrapper: {
    flexDirection: 'row'
  },
  checkbox: {
    backgroundColor: '#70B5E5',
    borderColor: '#70B5E5'
  },
  modalInfo: {
    paddingBottom: 16,
    fontSize: 18,
    color: '#000000'
  },
  buttonUpdate: {
    backgroundColor: '#70B5E5',
  },
  buttonUpdateSecond: {
    backgroundColor: '#70B5E5',
    marginTop: 66
  },
  modal: {
    padding: 10
  },
  modalTitle: {
    alignItems: 'center',
    paddingBottom: 16
  },
  modalTitleText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000000'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  icon: {
    width: 24,
  },
  input: {
    flex: 1
  },
  buttonCloseModalWrapper: {
    marginBottom: 40
  },
  buttonCloseModal: {
    backgroundColor: '#70B5E5',
    height: 40
  }
});

var stylesContainer = StyleSheet.flatten([styles.container]);
var stylesInfo = StyleSheet.flatten([styles.info]);
var stylesCheckboxWrapper = StyleSheet.flatten([styles.checkboxWrapper]);
var stylesCheckbox = StyleSheet.flatten([styles.checkbox]);
var stylesButtonUpdate = StyleSheet.flatten([styles.buttonUpdate]);
var stylesButtonUpdateSecond = StyleSheet.flatten([styles.buttonUpdateSecond]);
var stylesModal = StyleSheet.flatten([styles.modal]);
var stylesModalTitle = StyleSheet.flatten([styles.modalTitle]);
var stylesModalTitleText = StyleSheet.flatten([styles.modalTitleText]);
var stylesModalInfo = StyleSheet.flatten([styles.modalInfo]);
var stylesRow = StyleSheet.flatten([styles.row]);
var stylesIcon = StyleSheet.flatten([styles.icon]);
var stylesInput = StyleSheet.flatten([styles.input]);
var stylesButtonCloseModalWrapper = StyleSheet.flatten([styles.buttonCloseModalWrapper]);
var stylesButtonCloseModal = StyleSheet.flatten([styles.buttonCloseModal]);