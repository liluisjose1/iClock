
// Initializing a class Hora
export class HoraLocal{
  //method getTimeLocal
  getTimeLocal() {
    var date, hour, minutes, seconds, fullTime;
    date = new Date();
    hour = date.getHours();
    minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes.toString();
    }
    seconds = date.getSeconds();
    if (seconds < 10) {
      seconds = '0' + seconds.toString();
    }
    return fullTime = hour.toString() + ':' + minutes.toString() + ':' + seconds.toString();
  }
}