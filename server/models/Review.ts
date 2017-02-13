import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

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