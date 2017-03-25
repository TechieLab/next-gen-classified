import { Express, Router, Request, Response } from 'express';
import { User } from '../models/user';
import { IBaseApiRoute, BaseApiRoute } from './baseApiRoute';
import { IUserService, UserService } from '../services/userService';
import { IUserRepository, UserRepository } from '../repository/userRepository';
import { ProfileController, IProfileController } from '../controllers/profileController';
var multer = require('multer');
var upload = multer({ dest: './uploads/' });
var logger = require('winston');

var self = this;
export class ProfileRoute{
    controller: IProfileController;

    constructor(public app: Express) {      

        self = this;

        this.getById();
        this.upload();
        this.update()
    }

    getById() {
        this.app.get('/api/profile/:id', (req: Request, res: Response) => {
            self.setCollection();
              logger.debug("api/profile getById----");
            self.controller.getProfile(req, res);
        });
    }

    update() {
        this.app.put('/api/profile', (req: Request, res: Response) => {
            self.setCollection();
             logger.debug("api/profile put----");
            self.controller.updateProfile(req, res);
        });
    }

    upload() {
        console.log('profikle upload route......');
        this.app.post('/api/profile/upload',upload.single('file'), function (req: Request, res: Response, next) {
            // req.file is the `avatar` file
            // req.body will hold the text fields, if there were any
            self.setCollection();
            logger.debug("/api/profile/upload----");
            self.controller.upload(req, res);
        });
    }

    setCollection() {
        var repository = new UserRepository();
        var service = new UserService(repository);
        this.controller = new ProfileController(service);
    }
}