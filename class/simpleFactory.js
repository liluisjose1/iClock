import { HoraLocal } from './HoraLocal';
import { HoraExtrangera } from './HoraExtrangera';

export class simpleFactory{
    simpleMethod(x,y){
        if(x==1)
        {
            horalocal = new HoraLocal();
            return horalocal.getTimeLocal();
        }
        else{
            horaExtrangera = new HoraExtrangera();
            return horaExtrangera.getTimeZone(y);
        }
    }
}