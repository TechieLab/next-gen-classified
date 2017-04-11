import {BaseEntity} from './baseEntity';

export class Location{
    public AddressLine1: string;
    public AddressLine2: string;
    public Street : string;
    public Locality : string;
    public City : string;
    public State : string;
    public ZipCode :number;
    public Country : string;
    public Cords :  LocationCords

    constructor(){
        this.Cords = new LocationCords();
    }
}
export class LocationCords{
    Long : string;
    Lat : string;
} 