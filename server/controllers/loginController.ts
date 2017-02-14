import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { ILoginService, LoginService } from '../services/loginService';

import { User } from '../models/user';


export interface ILoginController extends IBaseController<User> {

}
var self;
export class PostingController extends BaseController<User> implements ILoginController {

   

    constructor(public loginService: ILoginService) {
        super(loginService);
    }

    public createEntity(req: Request, res: Response) {
        var data = req.body;
        var user = new User();

        return this.loginService.create(data, (err, item) => {
            if (err) console.log(err);

            this.result = {
                Message: 'Entity created',
                Success: true,
                Content: item
            };

            return res.json(this.result);
        });
    }

}
