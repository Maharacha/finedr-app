import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { LoginService } from './login.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {

    constructor(
    	private http: HTTP,
		private loginService: LoginService,
		private httpService: HttpService
    ) {}

    getParkingLotsFromApi(callback: Function) {
    	let token = this.loginService.token;
		let serverAddress = this.httpService.serverAddress;
		this.http.get(serverAddress + '/parkinglot/', {}, {
	    	Authorization: 'Token ' + token
		})
	    .then(request => {
			console.log(request.status);
			console.log(request.data); // data received by server
			console.log(request.headers);

			let jsonObj = JSON.parse(request.data);
			callback(jsonObj);
	    })
	    .catch(error => {
			console.log(error.status);
			console.log(error.error); // error message as string
			console.log(error.headers);		
	    });
    }
}
