import { Location, BaseEntity, Product, Offer } from './index';

export class Rental extends BaseEntity {
    public UserId: string;
    public Category: string;
    public Location: Location;
    public Details: RentDetail;
    public Product: Product;
    public Offers: Array<Offer>;

}

export class RentDetail {
    public FromDate: Date;
    public ToDate: Date;
    public NegoticatedPrice: number;
    public RentToUserId: string;
    public RentRate : RentCard
}

export class CarRent extends RentDetail{
    public PickupLocation: Location;
    public DropLocation: Location;
}

export class PropertyRent extends RentDetail{
    public Location : Location;
    public Bedroom : number;
    public Amenities : Array<string>;
    public NearBy : Array<string>;
    public OriginalPrice : number;
    public LastRentValue : number;
}

export class ProductRent extends RentDetail{
    public Condition : string;
    public UsedTime : string;
    public 
}

export class RentCard {

}