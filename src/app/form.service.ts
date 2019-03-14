import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { LoginService } from './login.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

    public base64Image: string;

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
	let serverAddress = this.httpService.serverAddress;
    	this.http.post(this.httpService.serverAddress + '/finetip/', {
    	    'image': this.base64Image,
    	    'license_plate': this.fineDetails.licensePlate,
	    'reason': this.fineDetails.reason,
	    'parking_lot_name': 'Apgatan',
	    'created_by_name': username
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
