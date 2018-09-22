import { Alert } from 'react-native';

export class HoraExtrangera{
  //method getTimeLocal
  getTimeZone = (PickerValueHolder) => {
    var horas, minutos, offset, pais, d, utc, nd;
    // creamos el objeto Date (la selecciona de la máquina cliente)
    horas = PickerValueHolder.substr(0, 3).toString();
    minutos = PickerValueHolder.substr(4, 2).toString();
    if (minutos >= '30') {
      minutos = '50';
    }
    offset = horas + '.' + minutos;
    pais = PickerValueHolder.substr(6, 3).toString();
    //offset = '-03.00';
    d = new Date();
    // lo convierte  a milisegundos
    // añade la dirferencia horaria
    // recupera la hora en formato UTC
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    // crea un nuevo objeto Date usando la diferencia dada.
    nd = new Date(utc + (3600000 * offset));
    // devuelve la hora como string.
    return Alert.alert("La fecha/hora actual en " + pais, nd.toLocaleString(), [{ text: 'Aceptar', },]);
  }
}