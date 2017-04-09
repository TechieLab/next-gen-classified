export class LocationCords {
    Long: string;
    Lat: string;
}

export class Location {
    public AddressLine1: string;
    public AddressLine2: string;
    public Street: string;
    public Locality: string;
    public Province: string;
    public City: string;
    public State: string;
    public ZipCode: number;
    public Country: string;
    public FullAddress: string;
    public Cords: LocationCords

    constructor() {
        this.AddressLine1 = '';
        this.AddressLine2 = '';
        this.Locality = '';
        this.Province = '';
        this.City = '';
        this.State = '';
        this.ZipCode = 0;
        this.Country = '';
        this.FullAddress = '';
        this.Cords = new LocationCords();
    }   
}
