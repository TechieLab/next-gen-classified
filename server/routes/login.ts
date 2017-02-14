import { Express, Router, Request, Response } from 'express';
import logger = require('winston');
import { Post } from '../models/user';
import { IBaseApiRoute, BaseApiRoute } from './baseApiRoute';
import { ILoginService, LoginService } from '../services/loginService';
import { ILoginRepository,LoginRepository } from '../repository/loginRepository';
import { LoginController, ILoginController } from '../controllers/loginController';

var self;
export class PostRoute extends BaseApiRoute<Post> implements IBaseApiRoute<Post>{
    loginService : ILoginService;
    loginController : ILoginController;

    constructor(public app: Express) {
        super(app, "register");
        self = this;
        this.post();
    }

     post() {
        this.app.post('/api/register', (req: Request, res: Response) => {
            self.setCollection();
            self.postingController.createEntity(req, res);
        });
    }

    setCollection() {
        var repository = new LoginRepository();
        this.loginService = new LoginService(repository);
        this.loginController = new LoginController(this.loginService);
    }
}