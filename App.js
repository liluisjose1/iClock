import React, { Component } from 'react';
import { Text, BackHandler, StyleSheet, View, Picker, ActivityIndicator, Alert, ImageBackground } from 'react-native';
import { Header, Badge } from 'react-native-elements';
import { simpleFactory } from './class/simpleFactory';
import { Data } from './data/paises';

export default class App extends Component {
  //instancias a la clase simpleFactory
  hora = new simpleFactory();

  constructor(props) {
    super(props);
    this.state = {
      time: '',
      isLoading: true,
      dataSource: [],
      PickerValueHolder: ''
    }
  }
  componentDidMount() {
    //actualizacion del reloj principal 
    this.Clock = setInterval(() => this.setState({ time: this.hora.simpleMethod(1), }), 1000);
  }
  componentWillMount() {
    //Local Data
    this.setState({
      dataSource: Data,
      isLoading: false
    });
    //API REST para traer informacion de los paises
    // fetch('https://restcountries.eu/rest/v2/all')
    // .then((response) => response.json())
    // .then((responseJson) => {
    //   this.setState({
    //     isLoading: false,
    //     dataSource: responseJson
    //   }, function () {
    //     // In this block you can do something with new state.
    //   });
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
  }
  //metodo para alerta con la hora del pais seleccionado
  captureSelect = () => {
    if (this.state.PickerValueHolder != '') {
      this.hora.simpleMethod(2, this.state.PickerValueHolder)
      //this.hora.getTimeZone(this.state.PickerValueHolder);
    } else {
      Alert.alert("Error ", "Seleccione un pais", [{ text: 'Aceptar', },]);
    }

  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ justifyContent: 'center', flex: 1, paddingTop: 50 }}>
          <ActivityIndicator size='large' color="#0f6fc6" />
        </View>
      );
    }

    return (

      <View style={styles.MainContainer}>
        <ImageBackground source={require('./assets/map.jpg')} style={{ width: '100%', height: '100%' }} >
          <View style={{ flex: 0.1, }}>
            <Header backgroundColor='#00507d' style={{ height: 100 }}
              centerComponent={{ text: 'iClock-TimeZone', style: { color: '#fff', fontSize: 15 } }}
              rightComponent={{ onPress: () => BackHandler.exitApp(), icon: 'close', color: '#fff', }}
            />
          </View>
          <View style={{ margin: 30, flex: 0.8 }}>
            <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center', }}>
              <Text style={{ textAlign: 'center', fontSize: 30, }} >Hora Local </Text>
              <Text style={styles.TextStyle}> {this.state.time} </Text>
            </View>
            <View style={{ flex: 0.6, }}>
              <Picker
                selectedValue={this.state.PickerValueHolder}
                style={{ width: '100%', height: 100 }}
                onValueChange={(itemValue, itemIndex) => this.setState({ PickerValueHolder: itemValue })} >
                <Picker.Item style={{ color: '#fff', }} label='Seleccione un pais' value='' />
                {this.state.dataSource.map((item, key) => (
                  <Picker.Item label={item.name + ' - ' + item.alpha3Code} value={item.timezones[0].substr(3, 6) + item.alpha3Code} key={key} />)
                )}
              </Picker>
            </View>
            <View style={{ flex: 0.1, alignItems: 'center' }}>
              <Badge containerStyle={styles.buttonHora} onPress={this.captureSelect}>
                <Text style={{ color: '#fff', fontSize: 15 }} >Ver hora</Text>
              </Badge>
            </View>
          </View>
          <View style={{ flex: 0.1 }}>

            <Header backgroundColor='#e5e5e5' style={{ height: 100 }}
              centerComponent={{ text: '© 2018 Luis I, Yenifer G, Magaly H.', style: { color: '#607d8b', fontSize: 15, paddingBottom: 10, } }}
            />
          </View>
        </ImageBackground>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  buttonHora: {
    backgroundColor: '#00507d',
    width: 200,
    height: 45,
  },
  TextStyle:
  {
    fontWeight: 'bold',
    fontSize: 50,
    textAlign: 'center',
    color: '#000',
    // marginBottom: 20,
  },
});