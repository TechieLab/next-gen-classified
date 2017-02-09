import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Post extends BaseEntity
{    
   public UserId: ObjectID;
   public Title : string;
   public ProductName : string;
   public Desciption:string;
   public Price: string;
   public Category : string;
   public Location : string;

   constructor(){
       super();

       this.UserId = new ObjectID();
       this.Location = '';
       this.Category = '';
       this.Price  = '';
       this.ProductName = '';
       this.Title = '';
   }
}