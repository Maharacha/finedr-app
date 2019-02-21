import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../form.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-fine-form',
  templateUrl: './fine-form.page.html',
  styleUrls: ['./fine-form.page.scss'],
})
export class FineFormPage implements OnInit {

    public base64Image: string;
    
    fineDetails = {
	licensePlate: "",
	reason: ""
    };
    
    constructor(
	private router: Router,
	public alertController: AlertController,
	private formService: FormService) { }
    
    ngOnInit() {
	this.base64Image = this.formService.base64Image;
    }
    
    async send() {
	console.log(this.fineDetails);
	
    	let alert = await this.alertController.create({
	    // header: '',
	    // subHeader: '',
	    message: 'Fine sent!',
	    buttons: [
		{
		    text: 'OK',
		    handler: () => {
			this.router.navigate(['/map']);
		    }
		}
	    ]
	});
	    
	await alert.present();
    }
}