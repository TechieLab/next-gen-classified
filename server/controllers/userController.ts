import { Express, Request, Response } from "express";
import {ObjectID} from 'mongodb';
import { IBaseController, BaseController } from './baseController';
import { IUserService, UserService } from '../services/userService';
import { User } from '../models/user';
import {Media} from '../models/media';

export interface IUserController extends IBaseController<User> {
    upload(req : Request ,  res : Response);
}

export class UserController extends BaseController<User> implements IUserController {

    constructor(public userService : IUserService){
        super(userService);
    }

     upload(req : any ,  res : any){
         console.log(req.file);
          this.userService.getById(<ObjectID>req['userId'], (err , user) => {

              if(user){
                  var media = new Media();
              }
         });
     }
}