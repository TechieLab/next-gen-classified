import {BaseEntity} from './baseEntity';

export class Review extends BaseEntity
{
     Title: string;
     Description: string;
     Rating: number;

     constructor(){
         super();
         
         this.Title = '';
         this.Description = '';
         this.Rating = 0
     }
}