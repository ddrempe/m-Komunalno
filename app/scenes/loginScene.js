import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  Input,
  Button,
  Spinner
} from 'nachos-ui';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class LoginScene extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }
  onSubmit() {
    //TODO
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
            onPress = {this.onSubmit}
          >
          </Button>
        </View>
        <View  style={stylesProgressBar}>
          <Spinner color="#70B5E5"/>
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
    marginTop: 68
  }
});
var stylesContainer = StyleSheet.flatten([styles.container]);
var stylesRow = StyleSheet.flatten([styles.row]);
var stylesIcon = StyleSheet.flatten([styles.icon]);
var stylesInput = StyleSheet.flatten([styles.input]);
var stylesButton = StyleSheet.flatten([styles.button]);
var stylesProgressBar = StyleSheet.flatten([styles.progressBar]);