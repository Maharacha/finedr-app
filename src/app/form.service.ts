import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { LoginService } from './login.service';
import { HttpService } from './http.service';
import { Location } from './map/location';
import { ParkingLot } from './map/parkinglot';

@Injectable({
  providedIn: 'root'
})
export class FormService {

    public base64Image: string;
	public coordinates: Location;
	public parkingLot: ParkingLot;
    public fineDetails = {
		licensePlate: "",
		reason: ""
    };
    
    constructor(
        private http: HTTP,
		private loginService: LoginService,
		private httpService: HttpService
    ) { }

    public send() {
		let username = this.loginService.username;
		let token = this.loginService.token;
		let coordinates = {
			lat: this.coordinates.latitude,
			lng: this.coordinates.longitude
		}
		let serverAddress = this.httpService.serverAddress;
    	this.http.post(this.httpService.serverAddress + '/finetip/', {
    	    'image': this.base64Image,
    	    'license_plate': this.fineDetails.licensePlate,
			'reason': this.fineDetails.reason,
			'parking_lot_name': this.parkingLot != null ? this.parkingLot.street_name : 'Ringgatan 18-22',
			'created_by_name': username,
			'coordinates': JSON.stringify(coordinates)
			}, {
			'Authorization': 'Token ' + token
		}).then(request => {
	    	console.log(request);
		}).catch(error => {
    	    console.log(error.status);
    	    console.log(error.error); // error message as string
    	    console.log(error.headers);
    	});
    }
}
