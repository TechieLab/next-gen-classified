import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { Profile } from '../models/profile';
import { IUserService, UserService } from '../services/userService';

export interface IProfileController {
    getProfile(req: Request, res: Response);
}

var self;

export class ProfileController {
    constructor(public userService: IUserService) {
        self = this;
    }

    getProfile(req: Request, res: Response) {
        this.userService.getById(req['userId'], (err, user) => {
            if (user) {
                return res.json(user.Profile);
            }
        });
    }

    updateProfile(req: Request, res: Response) {
        this.userService.getById(req['userId'], (err, user) => {
            if (user) {

                user.Profile = <Profile>req.body;

                self.userService.put(user._id, user, (err, result) => {

                    return res.json(user.Profile);
                });
            }
        });
    }
}
