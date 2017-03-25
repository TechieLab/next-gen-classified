import { Express, Router, Request, Response } from 'express';
import logger = require('winston');
import { User } from '../models/user';
import { IBaseApiRoute, BaseApiRoute } from './baseApiRoute';
import { IAccountService, AccountService } from '../services/accountService';
import { IUserRepository, UserRepository } from '../repository/userRepository';
import { AccountController, IAccountController } from '../controllers/accountController';

var self;
export class AccountRoute {
    accountService: IAccountService;
    accountController: IAccountController;

    constructor(public app: Express) {
        self = this;
        this.setCollection();
        this.initializeRoutes();
    }


    setCollection() {
        var repo = new UserRepository();
        this.accountService = new AccountService(repo);
        this.accountController = new AccountController(this.accountService);
    }

    initializeRoutes() {
        this.register();
        this.verify();
        this.getUserInfo();
        this.changePassword();
        this.forgotPassword();
        this.login();
        this.logout();

    }

    register() {
        this.app.post('/api/account/signup', (req: Request, res: Response) => {
            self.setCollection();
            logger.debug("/api/account/signup......");
            self.accountController.register(req, res);
        });
    }

    verify(){
        this.app.get('/account/verify/:token', (req: Request, res: Response) => {
            self.setCollection();
            logger.debug("/account/verify/:token......");
            self.accountController.verify(req, res);
        });
    }

    getUserInfo() {
        this.app.post('/api/account/userInfo', (req: Request, res: Response) => {
            logger.debug("/api/account/userInfo......");
            self.setCollection();
        });
    }

    changePassword() {
        this.app.post('/api/account/changepassword', (req: Request, res: Response) => {
            self.setCollection();
            logger.debug("/api/account/changepassword......");
            self.accountController.changePassword(req, res);
        });
    }

    forgotPassword() {
        this.app.post('/api/account/forgotpassword', (req: Request, res: Response) => {
            logger.debug("/pi/account/forgotpassword.....");
            self.setCollection();
        });
    }

    

    login() {
        this.app.post('/api/account/login', (req: Request, res: Response) => {
            self.setCollection();
            logger.debug("/api/account/login.....");
            self.accountController.login(req,res);
        });
    }

    logout() {
        this.app.get('/api/account/logout', (req: Request, res: Response) => {
            self.setCollection();
            logger.debug("api/account/logout.....");
            self.accountController.logout(req,res);
        });
    }
} 