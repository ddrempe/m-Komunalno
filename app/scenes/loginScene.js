import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  Input,
  Button
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
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.icon}>
            <Icon
              size={20}
              name='user'
            />
          </View>
          <Input
            style={{flex: 1}}
            height={52}
            underlineColorAndroid='transparent'
            autoCapitalize='none'
            placeholder='Korisničko ime'
            value={this.state.username}
            onChangeText={username => this.setState({username})}
          />
        </View>
        <View style={styles.row}>
            <View style={styles.icon}>
              <Icon
                size={20}
                name='key'
              />
            </View>
          <Input
            style={{flex: 1}}
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
            style={{backgroundColor: '#70B5E5', height: 52}}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E4E4E4',
    flex: 1,
    justifyContent: 'center',
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
  }
});
