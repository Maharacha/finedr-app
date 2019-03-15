import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { FormService } from '../form.service';

@Component({
    selector: 'app-camera',
    templateUrl: './camera.page.html',
    styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

    //public base64Image: string;
    
    constructor(
	private router: Router,
	private camera: Camera,
	private formService: FormService) { }
    
    ngOnInit() {
	this.takePicture();
    }

    // private options: CameraOptions = {
    // 	quality: 100,
    // 	destinationType: this.camera.DestinationType.FILE_URI,
    // 	encodingType: this.camera.EncodingType.JPEG,
    // 	mediaType: this.camera.MediaType.PICTURE
    // }

    // this.camera.getPicture(options).then((imageData) => {
    // 	// imageData is either a base64 encoded string or a file URI
    // 	// If it's base64 (DATA_URL):
    // 	let base64Image = 'data:image/jpeg;base64,' + imageData;
    // }, (err) => {
    // 	// Handle error
    // 	console.log(err);
    // });

    takePicture(){
    	this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 1000,
            targetHeight: 1000
    	}).then((imageData) => {
    	    // imageData is a base64 encoded string
            this.formService.base64Image = "data:image/jpeg;base64," + imageData;
	    this.router.navigate(['/fine-form'])
    	}, (err) => {
            console.log(err);
	    this.router.navigate(['/map']);
    	});
    }
}
