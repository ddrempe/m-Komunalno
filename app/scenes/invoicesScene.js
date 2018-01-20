import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Picker,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionBar from '../components/actionBar';
import Moment from 'moment';
import InvoicesRequest from '../network/invoicesRequest';
import BaseScene from './baseScene';

export default class InvoicesScene extends BaseScene<{}> {
  constructor(props) {
    super(props);
    this.state = {
      invoices: [],
      invoiceTypes: [],
      invoiceTypeSelected: '0'
    };
  }

  getImage(period) {
    if (period =='01') {
      return require('./../../icons/sijecanj.png');
    } else if (period == '02') {
      return require('./../../icons/veljaca.png');
    } else if (period == '03') {
      return require('./../../icons/ozujak.png');
    } else if (period == '04') {
      return require('./../../icons/travanj.png');
    } else if (period == '05') {
      return require('./../../icons/svibanj.png');
    } else if (period == '06') {
      return require('./../../icons/lipanj.png');
    } else if (period == '07') {
      return require('./../../icons/srpanj.png');
    } else if (period == '08') {
      return require('./../../icons/kolovoz.png');
    } else if (period == '09') {
      return require('./../../icons/rujan.png');
    } else if (period == '10') {
      return require('./../../icons/listopad.png');
    } else if (period == '11') {
      return require('./../../icons/studeni.png');
    } else if (period == '12') {
      return require('./../../icons/prosinac.png');
    } else {
      return require('./../../icons/sijecanj.png');
    };
  }

  onPdfIconClick(item) {
    Alert.alert('Dokument', JSON.stringify(item));
  }

  updateInvoiceTypeSelected = (newInvoiceTypeSelected) => {
    this.setState({ invoiceTypeSelected: newInvoiceTypeSelected });

    InvoicesRequest.getInvoicesByType(newInvoiceTypeSelected)
      .then((response) => this.setState({invoices: response}));
  }

  componentDidMount() {
    InvoicesRequest.getAllInvoices()
      .then((response) => this.setState({invoices: response}));
    
    InvoicesRequest.getAllInvoiceTypes()
      .then((response) => this.setState({invoiceTypes: response}));
  }

  render() {
    return (
      <View style={stylesContainer}>
        <ActionBar
          title='Dokumenti'
          onLeftPress={() => this.onBackPress()}
          onRightPress={() => this.logout()}
        />
        <View style={stylesPickerWrapper}>
          <Picker
            style={stylesPicker}
            mode='dialog'
            selectedValue={this.state.invoiceTypeSelected}
            onValueChange={this.updateInvoiceTypeSelected}
          >
            <Picker.Item label='Svi dokumenti' value='0'/>
            {this.state.invoiceTypes.map((invoice) => {return <Picker.Item label={invoice.Name} value={invoice.Id} key={invoice.Id}/> })}
          </Picker>
        </View>
        <FlatList
          contentContainerStyle={stylesFlatList}
          numColumns={1}
          data={this.state.invoices}
          keyExtractor={(item, index) => (item.Id)}
          renderItem={({item}) => (
            <View style={stylesTile}>
              <View style={stylesInfo}>
                <Image
                  style={stylesImage}
                  resizeMode='contain'
                  source={this.getImage(item.Month)}
                />
                <View>
                  <Text style={stylesTitle}>Račun: {item.InvoiceNumber}</Text>
                  <View style={stylesDetails}>
                    <Text style={stylesDetailsInfo}>{item.Amount}kn</Text>
                    <Text style={stylesInfo}>{Moment(item.Created).format('DD.MM.YYYY.')}</Text>
                    <Text style={stylesInfo}>{item.TypeName}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={stylesPdfIcon}
                onPress={() => this.onPdfIconClick(item)}
              >
                <Icon
                  name='file-pdf-o'
                  size={26}
                />
              </TouchableOpacity>
            </View>
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
  pickerWrapper: {
    backgroundColor: '#70B5E5',
    justifyContent: 'center',
    height: 46
  },
  picker: {
    color: '#FFFFFF'
  },
  flatList: {
    margin: 2
  },
  tile: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 2,
    padding: 10
  },
  info: {
    flexDirection: 'row'
  },
  image: {
    marginRight: 6,
    height: 60,
    width: 60
  },
  title: {
    color: '#000000',
    fontFamily: 'Rubik',
    fontWeight: 'bold'
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    width: 170
  },
  detailsInfo: {
    color: 'gray',
    fontSize: 10,
    fontFamily: 'Rubik'
  },
  pdfIcon: {
    justifyContent: 'center'
  }
});

var stylesContainer = StyleSheet.flatten([styles.container]);
var stylesPickerWrapper = StyleSheet.flatten([styles.pickerWrapper]);
var stylesPicker = StyleSheet.flatten([styles.picker]);
var stylesFlatList = StyleSheet.flatten([styles.flatList]);
var stylesTile = StyleSheet.flatten([styles.tile]);
var stylesInfo = StyleSheet.flatten([styles.info]);
var stylesImage = StyleSheet.flatten([styles.image]);
var stylesTitle = StyleSheet.flatten([styles.title]);
var stylesDetails = StyleSheet.flatten([styles.details]);
var stylesDetailsInfo = StyleSheet.flatten([styles.detailsInfo]);
var stylesPdfIcon = StyleSheet.flatten([styles.pdfIcon]);