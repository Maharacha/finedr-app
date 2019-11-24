import { Location } from '../map/location';
import { ParkingLot } from '../map/parkinglot';

export class Fine {    

    public license_plate: string;
    public icon: string;
    public reason: string;
    public location: Location;
    public parking_lot: string;
    public pub_date: string;
    public image_url: string;

    constructor(license_plate ?, reason ?, icon ?, location ?, parking_lot ?, pub_date ?, image_url ?) {
        this.license_plate = license_plate
        this.reason = reason
        this.icon = icon
        this.location = location
        this.parking_lot = parking_lot
        this.image_url = image_url
    }

    static fromJson(jsonObj) {
        let license_plate = jsonObj.license_plate
        let reason = jsonObj.reason
        let icon = 'car'
        let dateAndTimeSplitted = jsonObj.pub_date.split("T")
        let date = dateAndTimeSplitted[0]
        let time = dateAndTimeSplitted[1].split(".")[0]
        let coordinates = JSON.parse(jsonObj.coordinates)
        let location = new Location(coordinates.lat, coordinates.lng)
        let parking_lot = jsonObj.parking_lot
        let image_url = jsonObj.image
        return new this(license_plate, reason, icon, location, parking_lot, dateAndTimeSplitted, image_url)
    }
}
