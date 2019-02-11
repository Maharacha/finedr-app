import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
    //public serverAddress: string = "http://localhost:8080";
    public serverAddress: string = "http://192.168.1.195:8080";

    constructor(
	private http: HTTP
    ) { }
}
