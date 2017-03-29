import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { Profile } from '../models/profile';
import { IUserService, UserService } from '../services/userService';
import {Media} from '../models/media';
import {Settings} from '../config/settings';

var logger = require('winston');

export interface IProfileController {
    getProfile(req: Request, res: Response);
    upload(req : any ,  res : any);
}

var self;

export class ProfileController {
    constructor(public userService: IUserService) {
        self = this;
    }

    getProfile(req: Request, res: Response) {
        this.userService.getById(req['userId'], (err, user) => {
            if (user) {
                user.Profile.EmailId = user.EmailId;
                return res.json(user.Profile);
            }
        });
    }

    updateProfile(req: Request, res: Response) {
        this.userService.getById(req['userId'], (err, user) => {
            if (user) {

                user.Profile = <Profile>req.body;

                self.userService.update(user._id, user, (err, result) => {

                    return res.json(user.Profile);
                });
            }
        });
    }

    upload(req : any ,  res : any){         
          logger.debug("profile upload files----",req.file);
         this.userService.getById(req['userId'], (err , user) => {
              if(err) throw new Error();

              if(user && req.file){
                  var media = new Media();
                  media.Name = req.file.originalname;
                  media.ImageUrl = Settings.BackendHost + Settings.ImageRepository + req.file.originalname;
                  media.SizeInBytes = req.file.size;
                  user.Profile.Media = media;
                  self.userService.update(user._id, user, (err, result) => {
                    return res.json(user.Profile);
                });
              }
         });
     }
}
