import { Location } from '../map/location';

export class Fine {    

    public title: string;
    public note: string;
    public icon: string;
    public reason: string;
    public location: Location;

    constructor(title ?, reason ?, icon ?, location ?) {
        this.title = title
        this.reason = reason
        this.icon = icon
        this.location = location
    }
}
