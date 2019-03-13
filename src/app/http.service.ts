import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
    //public serverAddress: string = "http://localhost:8080";
    public serverAddress: string = "http://192.168.1.84:8080/onsite/api";
    //public serverAddress: string = "http://172.18.17.104:8080";
    //public serverAddress: string = "http://joakim-nyman.se:8080";

    constructor(
	private http: HTTP
    ) { }
}
