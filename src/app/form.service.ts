import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

    public base64Image: string;

    public fineDetails = {
	licensePlate: "",
	reason: ""
    };
    
  constructor() { }
}
