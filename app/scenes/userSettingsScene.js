import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Alert
} from 'react-native';
import {
  Button,
  Checkbox,
  Input,
  Spinner
} from 'nachos-ui';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionBar from '../components/actionBar';
import Settings from '../../settings';
import UserRequest from '../network/userRequest';
import BaseScene from './baseScene';

export default class UserSettingsScene extends BaseScene<{}> {
  constructor(props) {
    super(props);
    this.state = {
      eMailAddress: '',
      mobilePhoneNumber: '',
      sendPdfCheckbox: false,
      oldPassword: '',
      newPassword: '',
      repeatPassword: '',
      showUserDataModal: false,
      showPasswordModal: false,
      status: false
    };
  }

  openUserDataModal() {
    if (this.state.status) {
      this.setState({status: false});
    };

    this.setState({showUserDataModal: true});
  }

  openPasswordModal() {
    if (this.state.status) {
      this.setState({status: false});
    };

    this.setState({showPasswordModal: true});
  }

  closeUserDataModal() {
    this.setState({showUserDataModal: false});
  }

  closePasswordModal() {
    this.setState({showPasswordModal: false});
  }

  handleCheckboxChange = (sendPdfCheckbox) => {
    this.setState({sendPdfCheckbox})
  }

  validateNewPassword(newPassword) {
    var regEx = new RegExp(global.texts['SETTING_PASSWORD_VALIDATION_REGEX']);

    return regEx.test(this.state.newPassword);
  };

  validateNewEmail(newEmail) {
    var regEx = new RegExp(global.texts['SETTING_EMAIL_VALIDATION_REGEX']);

    return regEx.test(this.state.newEmail);
  };

  validateNewPhone(newPhone) {
    var regEx = new RegExp(global.texts['SETTING_MOBILE_PHONE_VALIDATION_REGEX']);

    return regEx.test(this.state.newPhone);
  };

  onPasswordUpdate = () => {
    if (!this.state.status) {
      this.setState({status: true});
    };

    if (!this.state.oldPassword) {
      Alert.alert('Greška!', 'Niste unijeli staru lozinku');
      this.setState({status: false});
      return;
    } else if (this.state.newPassword != this.state.repeatPassword) {
      Alert.alert('Greška!', 'Nova lozinka i ponovljena lozinka se ne podudaraju');
      this.setState({status: false});
      return;
    } else if (!this.validateNewPassword(this.state.newPassword)) {
      Alert.alert('Greška!', 'Lozinka mora biti dugačka minimalno 6 znakova, mora sadržavati minimalno jedan znak i minimalno jedan broj');
      this.setState({status: false});
      return;
    };

    UserRequest.changePassword(this.state.oldPassword, this.state.newPassword, this.state.repeatPassword)
      .then((response) => this.onPasswordChangeSuccesful(response));
  }

  onPasswordChangeSuccesful(response) {
    this.setState({status: false});

    if (response.status === 403) {
      Alert.alert('Greška!', 'Niste unijeli ispravnu staru lozinku');
    } else {
      if (response.ok) {
        Alert.alert('Uspjeh!', 'Lozinka je uspješno promijenjena');
      } else {
        this.onPasswordChangeFailed();
      };
    };
  }

  onPasswordChangeFailed() {
    this.setState({status: false});

    Alert.alert('Greška!', 'Greška kod izmjene lozinke');
  }

  onUserDataUpdate = () => {
    if (!this.state.status) {
      this.setState({status: true});
    };

    if (!this.state.eMailAddress) {
      Alert.alert('Greška!', 'Niste unijeli email');
      this.setState({status: false});
      return;
    } else if (!this.validateNewEmail(this.state.eMailAddress)) {
      Alert.alert('Greška!', 'Email adresa nije validna');
      this.setState({status: false});
      return;
    } else if (!this.state.mobilePhoneNumber) {
      Alert.alert('Greška!', 'Niste unijeli broj telefona');
      this.setState({status: false});
      return;
     } else if (!this.validateNewPhone(this.state.mobilePhoneNumber)) {
      Alert.alert('Greška!', 'Broj telefona nije validan');
      this.setState({status: false});
      return;
    };
    
    UserRequest.saveChanges(
      this.state.eMailAddress,
      this.state.mobilePhoneNumber,
      this.state.sendPdfCheckbox,
      Settings.getConnectedUser().Id
    )
      .then(() => this.onSaveChangesSuccesful())
      .catch(() => this.onSaveChangesFail());
  }

  onSaveChangesSuccesful() {
    this.setState({status: false});

    Alert.alert('Uspjeh!', 'Podaci uspješno spremljeni');
  }

  onSaveChangesFail(response) {
    this.setState({status: false});

    Alert.alert('Greška!', 'Greška prilikom spremanja podataka');
  }

  componentDidMount() {
    var user = Settings.getConnectedUser();
    this.setState({eMailAddress: user.Email, mobilePhoneNumber: user.MobilePhone, sendPdfCheckbox: user.Ebill});
  }

  render() {
    return (
      <View style={stylesContainer}>
        <ActionBar
          title='Korisnički podaci'
          onLeftPress={() => this.onBackPress()}
          onRightPress={() => this.logout()}
        />
        <Modal
          animationType='fade'
          visible={this.state.showUserDataModal}
          onRequestClose={() => this.closeUserDataModal()}
        >
          <View style={stylesButtonCloseModalWrapper}>
            <Button
              style={stylesButtonCloseModal}
              kind='squared'
              iconSize={20}
              iconPosition='left'
              iconName='md-close'
              uppercase={false}
              children='Zatvori prozor'
              onPress={() => this.closeUserDataModal()}
            >
            </Button>
          </View>
          <View style={stylesModal}>
            <View style={stylesModalTitleWrapper}>
              <Text style={stylesModalTitle}>Promjena korisničkih podataka</Text>
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
              onPress={this.onUserDataUpdate.bind(this)}
            >
            </Button> 
            <View style={stylesProgressBar}>
              {this.state.status ? <Spinner color='#70B5E5'/> : null}
              <View style={stylesTextProgressBar}>
                {this.state.status ? <Text>Pohrana podataka</Text> : null} 
              </View>
            </View>
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
              iconSize={20}
              iconPosition='left'
              iconName='md-close'
              uppercase={false}
              children='Zatvori prozor'
              onPress={() => this.closePasswordModal()}
            >
            </Button>
          </View>
          <View style={stylesModal}>
            <View style={stylesModalTitleWrapper}>
              <Text style={stylesModalTitle}>Promjena lozinke</Text>
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
            <View style={stylesProgressBar}>
              {this.state.status ? <Spinner color='#70B5E5'/> : null}
              <View style={stylesTextProgressBar}>
                {this.state.status ? <Text>Pohrana podataka</Text> : null} 
              </View>
            </View>
          </View>
        </Modal>
        <View style={stylesInfoWrapper}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E4E4E4',
    flex: 1
  },
  infoWrapper: {
    padding: 4
  },
  info: {
    paddingBottom: 16,
    color: '#000000',
    fontSize: 18
  },
  checkboxWrapper: {
    flexDirection: 'row'
  },
  checkbox: {
    backgroundColor: '#70B5E5',
    borderColor: '#70B5E5'
  },
  buttonUpdate: {
    backgroundColor: '#70B5E5',
  },
  buttonUpdateSecond: {
    backgroundColor: '#70B5E5',
    marginTop: 66
  },
  modal: {
    padding: 4
  },
  modalTitleWrapper: {
    alignItems: 'center',
    paddingBottom: 16
  },
  modalTitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000000'
  },
  modalInfo: {
    paddingBottom: 16,
    fontSize: 18,
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
    marginBottom: 46
  },
  buttonCloseModal: {
    backgroundColor: '#70B5E5',
    height: 46
  },
  progressBar: {
    alignItems: 'center',
    marginTop: 74,
    height: 58
  },
  textProgressBar: {
    marginTop: 8,
    alignItems: 'center'
  }
});

var stylesContainer = StyleSheet.flatten([styles.container]);
var stylesInfoWrapper = StyleSheet.flatten([styles.infoWrapper]);
var stylesInfo = StyleSheet.flatten([styles.info]);
var stylesCheckboxWrapper = StyleSheet.flatten([styles.checkboxWrapper]);
var stylesCheckbox = StyleSheet.flatten([styles.checkbox]);
var stylesButtonUpdate = StyleSheet.flatten([styles.buttonUpdate]);
var stylesButtonUpdateSecond = StyleSheet.flatten([styles.buttonUpdateSecond]);
var stylesModal = StyleSheet.flatten([styles.modal]);
var stylesModalTitleWrapper = StyleSheet.flatten([styles.modalTitleWrapper]);
var stylesModalTitle = StyleSheet.flatten([styles.modalTitle]);
var stylesModalInfo = StyleSheet.flatten([styles.modalInfo]);
var stylesRow = StyleSheet.flatten([styles.row]);
var stylesIcon = StyleSheet.flatten([styles.icon]);
var stylesInput = StyleSheet.flatten([styles.input]);
var stylesButtonCloseModalWrapper = StyleSheet.flatten([styles.buttonCloseModalWrapper]);
var stylesButtonCloseModal = StyleSheet.flatten([styles.buttonCloseModal]);
var stylesProgressBar = StyleSheet.flatten([styles.progressBar]);
var stylesTextProgressBar = StyleSheet.flatten([styles.textProgressBar]);