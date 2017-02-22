import {Product} from './product';

export class Post{
    _id : string;
    Title : string;
    ProductName : string;
    Desciption:string;
    Price: string;
    Category : string;
    Location : string;
    Product : Product;

    constructor(){
        this.Product = new Product();
    }
}