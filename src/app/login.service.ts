import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    public token: string = "apan";

    constructor(
    	private http: HTTP,
	private httpService: HttpService
    )
    {}

    public getToken(username: string, password: string) {
	let serverAddress = this.httpService.serverAddress;
    	this.http.post(this.httpService.serverAddress + '/api-token-auth/', {
    	    'username': 'admin',
    	    'password': 'admin'
    	}, {}).then(request => {
    	    let jsonObj = JSON.parse(request.data);
    	    let token = jsonObj.token;
    	    this.token = token;
    	    // return new Promise((resolve) => {
	    // 	resolve(token);
	    // });
    	}).catch(error => {
	    alert(error.error);
    	    console.log(error.status);
    	    console.log(error.error); // error message as string
    	    console.log(error.headers);
    	});
    	return '';
    }
}
