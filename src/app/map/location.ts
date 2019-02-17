import {
    LocationService,
    MyLocationOptions,
} from '@ionic-native/google-maps';

export class Location {    

    public latitude: number;
    public longitude: number;
    
    constructor(latitude ?, longitude ?) {
	this.latitude = latitude;
	this.longitude = longitude;
    }
}
