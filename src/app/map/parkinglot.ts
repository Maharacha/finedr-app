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

    public street_name: string;
    public points: Array<Point>;
    public polygon: Polygon;
    public userIsInside: boolean = false;

    constructor(street_name: string, points: Array<Point>) {
        this.street_name = street_name;
	    this.points = points;
    }

    public addPoints(points: Array<Point>) {
	    this.points = this.points.concat(points);
    }
}
