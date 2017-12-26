import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Text,
  Picker,
  Alert
} from 'react-native';
import Moment from 'moment';
import BaseScene from './baseScene';
import InvoicesRequest from '../network/invoicesRequest';

export default class InvoicesScene extends BaseScene<{}> {
  constructor(props) {
    super(props);
    this.state = {
      invoiceSelected: '',
      invoices: []
    };
  }

  onInvoiceClick() {
    Alert.alert('Invoice Click');
    
    //TODO: show invoice on click
  }

  componentDidMount() {
    InvoicesRequest.getAllInvoices()
      .then((response) => this.setState({invoices: response}));
  }

  render() {
    return (
      <View style={stylesContainer}>
        <Picker
          mode='dialog'
          selectedValue={this.state.invoiceSelected}
          onValueChange={(itemValue, itemIndex) => this.setState({invoiceSelected: itemValue})}
        >
          <Picker.Item label='Sve' value='0'/>
          <Picker.Item label='Voda' value='1'/>
          <Picker.Item label='Struja' value='2'/>
          <Picker.Item label='Plin' value='3'/>
        </Picker>
        <FlatList
          contentContainerStyle={stylesFlatList}
          numColumns={1}
          data={this.state.invoices}
          keyExtractor={(item, index) => (item.Id)}
          renderItem={({item}) => (
            <TouchableHighlight
              underlayColor='black'
              onPress={this.onInvoiceClick.bind(this)}
            >
              <View style={stylesTileList}>
                <Text style={stylesTitle}>Račun: {item.InvoiceNumber}</Text>
                <View style={stylesDetails}>
                  <Text style={stylesInfo}>{item.Amount}kn</Text>
                  <Text style={stylesInfo}>{Moment(item.DueDate).format('DD.MM.YYYY.')}</Text>
                  <Text style={stylesInfo}>{item.DeliveryChannel}</Text>
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
  title: {
    color: '#000000',
    fontFamily: 'Rubik',
    fontWeight: 'bold'
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10
  },
  info: {
    color: 'gray',
    fontSize: 10,
    fontFamily: 'Rubik'
  }
});

var stylesContainer = StyleSheet.flatten([styles.container]);
var stylesFlatList = StyleSheet.flatten([styles.flatList]);
var stylesTileList = StyleSheet.flatten([styles.tileList]);
var stylesTitle = StyleSheet.flatten([styles.title]);
var stylesDetails = StyleSheet.flatten([styles.details]);
var stylesInfo = StyleSheet.flatten([styles.info]);