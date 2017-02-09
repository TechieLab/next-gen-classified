import {ObjectID} from 'mongodb';
export class BaseEntity
{
     Id: ObjectID;
     Status: boolean;

     CreatedBy: ObjectID;
     CreatedOn: Date;
     ModifiedBy : ObjectID;
     ModifiedOn : Date;

     constructor(){
         this.Id = new ObjectID();
         this.Status = false;

         this.CreatedBy = new ObjectID();
         this.CreatedOn = new Date();
         this.ModifiedBy = new ObjectID();
         this.ModifiedOn = new Date()
     }

}