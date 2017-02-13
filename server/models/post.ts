import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';
import {Product} from './product';

export class Post extends BaseEntity
{    
   public PostId : number;
   public AdType : string;
   public UserId: ObjectID;
   public Title : string;
   public Location : string;
   public Product : Product;

   constructor(){
       super();

       this.PostId = 0;
       this.AdType = '';
       this.UserId = new ObjectID();     
       this.Title = '';
       this.Product = new Product();
   }
}