import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
    selector: 'app-camera',
    templateUrl: './camera.page.html',
    styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

    public base64Image: string;
    
    constructor(
	private camera: Camera) { }
    
    ngOnInit() {
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
            this.base64Image = "data:image/jpeg;base64," + imageData;
    	}, (err) => {
            console.log(err);
    	});
    }
}
