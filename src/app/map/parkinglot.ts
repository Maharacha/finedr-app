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

    static fromJson(jsonObj) {
        let street_name = jsonObj.street_name
        let points = new Array<Point>()
        for (let point in jsonObj.coordinates) {
            let pointJson = JSON.parse(point)
            points.concat(new Point(pointJson.latitude, pointJson.longitude))
        }
        return new this(street_name, points)
    }
}
