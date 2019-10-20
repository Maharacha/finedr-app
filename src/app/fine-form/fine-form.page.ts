import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../form.service';
import { AlertController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx'

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
		private formService: FormService,
		private keyboard: Keyboard
	) { }
    
    ngOnInit() {
		this.base64Image = this.formService.base64Image;
    }
    
    async send() {
		console.log(this.fineDetails);
		this.formService.fineDetails = this.fineDetails;
		this.formService.send();
		this.router.navigate(['/fine-sent-success']);
			// let alert = await this.alertController.create({
		//     // header: '',
		//     // subHeader: '',
		//     message: 'Fine sent!',
		//     buttons: [
		// 	{
		// 	    text: 'OK',
		// 	    handler: () => {
		// 		this.router.navigate(['/map']);
		// 	    }
		// 	}
		//     ]
		// });
			
		// await alert.present();
    }
}
