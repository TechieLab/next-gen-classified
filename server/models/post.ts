import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';
import {Product} from './product';

export class Post extends BaseEntity
{    
   public PostId : number;
   public AdType : string; 
   public Title : string;
   public Location : string;
   public Product : Product;
   public UserId: ObjectID;

   constructor(){
       super();

       this.PostId = 0;
       this.AdType = '';         
       this.Title = '';
       this.UserId = null;
       this.Product = new Product();
   }
}