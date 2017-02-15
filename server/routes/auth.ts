import { Express, Router, Request, Response } from 'express';
import logger = require('winston');
import { User } from '../models/user';
import { IBaseApiRoute, BaseApiRoute } from './baseApiRoute';
import { IAuthService, AuthService } from '../services/authService';
import { IAuthRepository,AuthRepository } from '../repository/authRepository';
import { AuthController,IAuthController } from '../controllers/authController';

var self;
export class AuthRoute {
    authService : IAuthService;
    authController : IAuthController;

    constructor(public app: Express) {  
        self = this;
        this.initializeRoutes();
    }


    setCollection(model) {
        var repository = new AuthRepository(model);
        this.authService = new AuthService(repository);
        this.authController = new AuthController(this.authService);
    }

    initializeRoutes(){
        this.register();
        this.getUserInfo();
        this.changePassword();
        this.forgotPassword();
        this.login();
        this.logout();

    }

    register(){    
        this.app.post('/api/user/create', (req: Request, res: Response) => {
            this.setCollection('user');
            this.authController.createEntity(req, res);
        });
    }

    getUserInfo(){
        this.app.post('/api/user/userInfo', (req: Request, res: Response) => {
            self.setCollection();
        });
    }

    changePassword(){
        this.app.post('/api/user/changepassword', (req: Request, res: Response) => {
            self.setCollection();
        });
    }

    forgotPassword(){
        this.app.post('/api/user/forgotpassword', (req: Request, res: Response) => {
            self.setCollection();
        });
    }

    logout(){
        this.app.post('/api/user/logout', (req: Request, res: Response) => {
            self.setCollection();
        });
    }

    login(){
        this.app.post('/api/user/login', (req: Request, res: Response) => {
            self.setCollection();
        });
    }
} 