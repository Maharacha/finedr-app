import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
    public serverAddress: string = "http://localhost:8080";
    
    constructor(
	private http: HTTP
    ) { }
}
