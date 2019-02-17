import {
    Polygon
} from '@ionic-native/google-maps';

export class Point {
    public lat: number;
    public lng: number;

    constructor(lat: number, lng: number) {
	this.lat = lat;
	this.lng = lng;
    }
}

export class ParkingLot {

    public points: Array<Point>;
    public polygon: Polygon;
    public userIsInside: boolean = false;

    constructor(points: Array<Point>) {
	this.points = points;
    }

    public addPoints(points: Array<Point>) {
	this.points = this.points.concat(points);
    }
}
