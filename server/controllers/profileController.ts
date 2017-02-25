import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { Profile } from '../models/profile';
import { IUserService, UserService } from '../services/userService';

export interface IProfileController {
    getProfile(req: Request, res: Response);
}

export class ProfileController {
    constructor(public userService: IUserService) { }

    getProfile(req: Request, res: Response) {
        this.userService.getById(req['userId'], (err, user) => {
            if (user) {
                return res.json(user.Profile);
            }
        });
    }
}
