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
	
	this.getCurrentLocation();	
	this.mapService.getParkingLotsFromApi(this.parseAndAddParkingLots.bind(this));


	var POLYGON_POINTS = [
	    {lat: 41.79883, lng: 140.75675},
	    {lat: 41.799240000000005, lng: 140.75875000000002},
	    {lat: 41.797650000000004, lng: 140.75905},
	    {lat: 41.79637, lng: 140.76018000000002},
	    {lat: 41.79567, lng: 140.75845},
	    {lat: 41.794470000000004, lng: 140.75714000000002},
	    {lat: 41.795010000000005, lng: 140.75611},
	    {lat: 41.79477000000001, lng: 140.75484},
	    {lat: 41.79576, lng: 140.75475},
	    {lat: 41.796150000000004, lng: 140.75364000000002},
	    {lat: 41.79744, lng: 140.75454000000002},
	    {lat: 41.79909000000001, lng: 140.75465},
	    {lat: 41.79883, lng: 140.75673}
	];
	var inside = Poly.containsLocation({lat: 41.7000, lng: 140.75675}, POLYGON_POINTS);
	console.log(inside);
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
    
    watchPosition() {
	let watch = this.geolocation.watchPosition();
	watch.subscribe((data) => {
	    this.positionChanged(new Location(data.coords.latitude, data.coords.longitude));
	    // data can be a set of coordinates, or an error (if an error occurred).
	    // data.coords.latitude
	    // data.coords.longitude
	});
    }

    positionChanged(newPosition: Location) {
	console.log(newPosition);
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

    nextPage() {
	this.router.navigate(['/camera'])
    }
}
