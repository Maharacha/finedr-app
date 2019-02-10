import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fine-form',
  templateUrl: './fine-form.page.html',
  styleUrls: ['./fine-form.page.scss'],
})
export class FineFormPage implements OnInit {

    fineDetails = {
	licensePlate: "",
	reason: ""
    };
    
    constructor() { }
    
    ngOnInit() {
    }
    
    send() {
	console.log(this.fineDetails);
    }
    
}
