import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  NetInfo,
  Text,
  Keyboard
} from 'react-native';
import {
  Input,
  Button,
  Spinner
} from 'nachos-ui';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserRequest from '../network/userRequest';
import BaseScene from './baseScene';

export default class LoginScene extends BaseScene<{}> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      state: false
    };
  }

  onSubmit = () => {
    if (!this.state.status) {
      this.setState({status: true});
    };
    NetInfo.isConnected.fetch().then((isConnected) => {
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
    if (this.state.status) {
      this.setState({status: false});
    };
    Keyboard.dismiss();
    this.goto('MainScene');
  }

  onLoginFail(error) {
    if (this.state.status) {
      this.setState({status: false});
    };

    //console.log(error);
    //Ovo se trenutno događa zapravo sa pogrešnim korisničkim imenom ili lozinkom kod prijave
    //Zasad nije jasan način razlikovanja odgovora od web servisa da li se dogodila greška
    //prilikom provjere na serveru ili se radi o pogrešnim korisničkim podacima
    //TODO - napraviti kada dobijemo pristup backendu

    Alert.alert(
      'Neuspješna prijava!',
      'Prijava nije moguća zbog tehničkih problema.',
      [{ text: 'U redu' }]
    );

    // Alert.alert(
    //   'Neuspješna prijava!', 
    //   'Neispravno korisničko ime i/ili lozinka', 
    //   [{ text: 'U redu' }]
    // );
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
          { this.state.status ? <Spinner color='#70B5E5'/> : null }
          <View style={stylesTextProgressBar}>
            { this.state.status ? <Text>Provjera podataka</Text> : null } 
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
    paddingRight: 12,
    paddingLeft: 12
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