import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  NetInfo,
  Keyboard,
  BackHandler,
  Alert
} from 'react-native';
import {
  Input,
  Button,
  Spinner
} from 'nachos-ui';
import Icon from 'react-native-vector-icons/FontAwesome';
import Settings from '../../settings';
import UserRequest from '../network/userRequest';
import BaseScene from './baseScene';

export default class LoginScene extends BaseScene<{}> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      spinner: false
    };
  }

  onSubmit = () => {
    if (!this.state.spinner) {
      this.setState({spinner: true});
    };
    NetInfo.getConnectionInfo().then((isConnected) => {
      if (isConnected) {
        UserRequest.login(this.state.username, this.state.password)
          .then(() => this.onLoginSuccess())
          .catch((error) => this.onLoginFail(error));
      } else {
        Alert.alert(
          'Pogreška u komunikaciji sa poslužiteljem!',
          'Provjera nije moguća, molimo provjerite internetsku vezu.',
          [{ text: 'U redu' }]
        );
      };
    });
  }

  onLoginSuccess() {
    if (this.state.spinner) {
      this.setState({spinner: false});
    };
    Keyboard.dismiss();
    Settings.fetchAll(this.onSettingsLoad.bind(this));
  }

  onSettingsLoad() {
    this.goto('MainScene');
  }

  onLoginFail(error) {
    if (this.state.spinner) {
      this.setState({spinner: false});
    };
    //TODO: extract error message from web API response
    Alert.alert(
      'Neuspješna prijava!',
      'Prijava nije moguća zbog tehničkih problema.',
      [{ text: 'U redu' }]
    );
  }

  onBackPress() {
    BackHandler.exitApp();
  }

  componentDidMount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  render() {
    return (
      <View style={stylesContainer}>
        <View style={stylesRow}>
          <View style={stylesIcon}>
            <Icon
              size={20}
              name='user'
            />
          </View>
          <Input
            style={stylesInput}
            height={52}
            underlineColorAndroid='transparent'
            autoCapitalize='none'
            placeholder='Korisničko ime'
            value={this.state.username}
            onChangeText={username => this.setState({username})}
          />
        </View>
        <View style={stylesRow}>
            <View style={stylesIcon}>
              <Icon
                size={20}
                name='key'
              />
            </View>
          <Input
            style={stylesInput}
            height={52}
            underlineColorAndroid='transparent'
            secureTextEntry={true}
            placeholder='Lozinka'
            value={this.state.password}
            onChangeText={password => this.setState({password})}
          />
        </View>
        <View>
          <Button
            style={stylesButton}
            kind='squared'
            iconSize={20}
            iconPosition='left'
            iconName='md-log-in'
            uppercase={false}
            children='Prijavi se'
            onPress={this.onSubmit.bind(this)}
          >
          </Button>
        </View>
        <View style={stylesProgressBar}>
          {this.state.spinner ? <Spinner color='#70B5E5'/> : null}
          <View style={stylesTextProgressBar}>
            {this.state.spinner ? <Text>Provjera podataka...</Text> : null} 
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E4E4E4',
    justifyContent: 'center',
    flex: 1,
    padding: 12
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
  button: {
    backgroundColor: '#70B5E5',
    height: 52
  },
  progressBar: {
    alignItems: 'center',
    marginTop: 68,
    height: 52
  },
  textProgressBar: {
    marginTop: 8
  }
});

var stylesContainer = StyleSheet.flatten([styles.container]);
var stylesRow = StyleSheet.flatten([styles.row]);
var stylesIcon = StyleSheet.flatten([styles.icon]);
var stylesInput = StyleSheet.flatten([styles.input]);
var stylesButton = StyleSheet.flatten([styles.button]);
var stylesProgressBar = StyleSheet.flatten([styles.progressBar]);
var stylesTextProgressBar = StyleSheet.flatten([styles.textProgressBar]);