import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
    ToastController,
    Platform,
    LoadingController
} from '@ionic/angular';

import { HTTP } from '@ionic-native/http/ngx';

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
    PolygonOptions
} from '@ionic-native/google-maps';

import { Location } from './location';
import { ParkingLot } from './parkinglot';
import { Point } from './parkinglot';
import { LoginService } from '../login.service';
import { MapService } from '../map.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.page.html',
    styleUrls: ['./map.page.scss'],
})

export class MapPage implements OnInit {

    map: GoogleMap;
    currentLocation: Location;
    
    constructor(
	public loadingCtrl: LoadingController,
	public toastCtrl: ToastController,
	private platform: Platform,
	private router: Router,
	private http: HTTP,
	private loginService: LoginService,
	private mapService: MapService) {
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
	this.getCurrentLocation();
	this.mapService.getParkingLotsFromApi(this.parseAndAddParkingLots.bind(this));
    }

    onPolygonClick(data) {
	console.log(data);
	this.router.navigate(['/camera'])
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

    addParkingLot(coordinates: ParkingLot) {
	
	let options: PolygonOptions = {
	    // points: lot.points
	    points: coordinates.points,
	    clickable: true
	}
	this.map.addPolygon(options).then((polygon) => {
	    polygon.on(GoogleMapsEvent.POLYGON_CLICK).subscribe((data) => {
                this.onPolygonClick(data);
	    });
	});
    }

    getCurrentLocation() {
	let options: MyLocationOptions = {
	    enableHighAccuracy: true
	};
	LocationService.getMyLocation(options)
	    .then((location) => {
		// alert(["Your current location:\n",
		//        "latitude:" + location.latLng.lat.toFixed(3),
		//        "longitude:" + location.latLng.lng.toFixed(3),
		//        "speed:" + location.speed,
		//        "time:" + location.time,
		//        "bearing:" + location.bearing].join("\n"));
		this.currentLocation.latitude = location.latLng.lat;
		this.currentLocation.longitude = location.latLng.lng;		
		this.moveCamera(this.currentLocation.latitude, this.currentLocation.longitude);
	    });
    }
}
