import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { IAccountService, AccountService } from '../services/accountService';
import { Post } from '../models/post';
import { Result } from '../models/result';
import { Register } from '../models/account';

export interface IAccountController {
    register(req: Request, res: Response);
    getUserInfo(req: Request, res: Response);
    changePassword(req: Request, res: Response);
    forgotPassword(req: Request, res: Response);
    login(req: Request, res: Response);
    logout(req: Request, res: Response);
}

var self;
export class AccountController implements IAccountController {

    constructor(public accountService: IAccountService) {

    }

    register(req: Request, res: Response) {
        var registerModel = <Register> req.body;

        this.accountService.register(registerModel, (result) => {
            return res.json(result);
        });
    }

    getUserInfo(req: Request, res: Response) { }
    changePassword(req: Request, res: Response) { }
    forgotPassword(req: Request, res: Response) { }
    login(req: Request, res: Response) { }
    logout(req: Request, res: Response) { }

}
