import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
    ToastController,
    Platform,
    LoadingController
} from '@ionic/angular';

import { HTTP } from '@ionic-native/http/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    Marker,
    GoogleMapsAnimation,
    MyLocation,
    MyLocationOptions,
    Environment,
    LocationService,
    Polygon,
    PolygonOptions,
    Poly
} from '@ionic-native/google-maps';

import { Location } from './location';
import { ParkingLot } from './parkinglot';
import { Point } from './parkinglot';
import { LoginService } from '../login.service';
import { MapService } from '../map.service';
import { FormService } from '../form.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.page.html',
    styleUrls: ['./map.page.scss'],
})

export class MapPage implements OnInit {

    map: GoogleMap;
    currentLocation: Location;
    nextPageButtonColor: string = "danger";
    nextPageButtonText: string = 'No parking lot';
    nextPageButtonDisabled: boolean = true;
    parkingLots: Array<ParkingLot> = Array();
    positionWatcherObj;
    
    constructor(
	public loadingCtrl: LoadingController,
	public toastCtrl: ToastController,
	private platform: Platform,
	private router: Router,
	private http: HTTP,
	private geolocation: Geolocation,
	private loginService: LoginService,
	private mapService: MapService,
	private formService: FormService) {
	this.setBrowserApiKeys();
	this.currentLocation = new Location();
    }

    async ngOnInit() {

	// Since ngOnInit() is executed before `deviceready` event,
	// you have to wait the event.
	await this.platform.ready();
	await this.loadMap();
    }

    loadMap() {
	this.map = GoogleMaps.create('map_canvas', {
	});
	// Change the map options
	this.map.setOptions({	    
	    'controls': {
		'compass': true,
		'myLocation': true,
		'myLocationButton': true,
		'zoom': true
	    }});
	this.map.one(GoogleMapsEvent.MAP_READY).then(this.onMapReady.bind(this));
    }

    setBrowserApiKeys() {
	Environment.setEnv({
	    'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDgWtSOMi0yya4xqBelBI2ErAOdsdvxJbQ',
	    'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDgWtSOMi0yya4xqBelBI2ErAOdsdvxJbQ'
	});
    }

    onMapReady() {
	this.nextPageButtonText = "No parking";
	this.nextPageButtonColor = "danger";
	
	var nextPageButton = document.getElementById('nextPageButton') as HTMLButtonElement;
	nextPageButton.disabled = true;	
	this.nextPageButtonDisabled = true;
	
	this.getCurrentLocation().then(() => {
	    this.moveCamera(this.currentLocation.latitude, this.currentLocation.longitude);
	});
	
	this.mapService.getParkingLotsFromApi(this.parseAndAddParkingLots.bind(this));

	this.watchPosition();
    }

    checkIfInsidePolygon(location: Location) {
	let insideAPolygon = false;
	for (let parkingLot of this.parkingLots) {
	    let inside = Poly.containsLocation({lat: location.latitude, lng: location.longitude}, parkingLot.points);
	    this.updateParkingLotState(parkingLot, inside);
	    if (inside)
		insideAPolygon = true;
	}
	if (insideAPolygon)
	    this.updateNextPageButton(true);
	else
	    this.updateNextPageButton(false);
    }

    async watchPosition() {
	return new Promise( async () => {
	    setTimeout(async () => {
		this.getCurrentLocation();
		let location = new Location(this.currentLocation.latitude, this.currentLocation.longitude);
		this.positionChanged(location);
		await this.watchPosition();
	    }, 1000);
	});
    }

    marker = null;
    addMarker(location: Location) {
	if (this.marker == null) {
	    this.map.addMarker({
		position: {"lat": location.latitude, "lng": location.longitude}
	    }).then((marker) => {	    
		this.marker = marker;
	    });
	}
	else {
	    this.marker.setPosition({
		lat: location.latitude,
		lng: location.longitude
	    });
	}
    }

    positionChanged(newPosition: Location) {
	this.checkIfInsidePolygon(newPosition);
    }

    updateParkingLotState(parkingLot: ParkingLot, userIsInside: boolean) {
	// if (userIsInside != parkingLot.userIsInside) {
	    parkingLot.userIsInside = userIsInside;
	    if (userIsInside) {
		parkingLot.polygon.setFillColor("green");
		parkingLot.polygon.setStrokeColor("green");
	    }
	    else {
		parkingLot.polygon.setFillColor("red");
		parkingLot.polygon.setStrokeColor("red");	
	    }
	// }
    }

    updateNextPageButton(enable: boolean) {
	let nextPageButton = document.getElementById('nextPageButton') as HTMLButtonElement;
	
	if (enable) {
	    this.nextPageButtonText = "Camera";
	    this.nextPageButtonColor = 'secondary';
	    
	    nextPageButton.disabled = false;
	    this.nextPageButtonDisabled = false;
	}
	else {
	    this.nextPageButtonText = "No parkinglot";
	    this.nextPageButtonColor = 'danger';
	    
	    nextPageButton.disabled = true;
	    this.nextPageButtonDisabled = true;
	}
    }
    
    onPolygonClick(data) {
	this.updateNextPageButton(true);
	data[1].setFillColor("green");
	data[1].setStrokeColor("green");
    }

    moveCamera(latitude: number, longitude: number) {
	this.map.animateCamera({
	    target: {lat: latitude, lng: longitude},
	    zoom: 15,
	    bearing: 140,
	    duration: 500
	});
    }
    
    setMarker(latitude: number, longitude: number) {
	var marker = this.map.addMarker({
	    position: {lat: latitude, lng: longitude},
	    title: "Hello Cordova Google Maps for iOS and Android",
	    snippet: "This plugin is awesome!"
	});
    }
    
    parseAndAddParkingLots(jsonObj) {
	for (let parkingLot of jsonObj) {
	    let coordinates = JSON.parse(parkingLot.coordinates);	    
	    this.addParkingLot(new ParkingLot(coordinates));
	}
    }

    addParkingLot(parkingLot: ParkingLot) {
	
	let options: PolygonOptions = {
	    // points: lot.points
	    points: parkingLot.points,
	    clickable: true
	}
	this.map.addPolygon(options).then((polygon) => {
	    polygon.on(GoogleMapsEvent.POLYGON_CLICK).subscribe((data) => {
                this.onPolygonClick(data);
	    });
	    parkingLot.polygon = polygon;
	    this.parkingLots.push(parkingLot);
	});
    }

    async getCurrentLocation() {
	let options: MyLocationOptions = {
	    enableHighAccuracy: true
	};
	await LocationService.getMyLocation(options)
	    .then((location) => {
		// alert(["Your current location:\n",
		//        "latitude:" + location.latLng.lat.toFixed(3),
		//        "longitude:" + location.latLng.lng.toFixed(3),
		//        "speed:" + location.speed,
		//        "time:" + location.time,
		//        "bearing:" + location.bearing].join("\n"));
		this.currentLocation.latitude = location.latLng.lat;
		this.currentLocation.longitude = location.latLng.lng;		
	    });
    }

    nextPage() {
	this.router.navigate(['/camera'])
    }
}
