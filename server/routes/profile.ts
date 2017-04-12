import { Express, Router, Request, Response } from 'express';
import { User } from '../models/user';
import { IBaseApiRoute, BaseApiRoute } from './baseApiRoute';
import { IUserService, UserService } from '../services/userService';
import { IUserRepository, UserRepository } from '../repository/userRepository';
import { ProfileController, IProfileController } from '../controllers/profileController';
var multer = require('multer');
let mkdirp = require("mkdirp");
//var upload = multer({ dest: './uploads/' });
var logger = require('winston');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let newDestination = './uploads/profiles';
        mkdirp.sync(newDestination);
        cb(null, newDestination);
    },
    filename: function (req, file, cb) {
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.') + 1);
        var filename = req['userId'] + '.' + ext;
        cb(null, filename);
    }
});

var upload = multer({ storage: storage });

var self = this;
export class ProfileRoute {
    controller: IProfileController;

    constructor(public app: Express) {

        self = this;

        this.getById();
        this.upload();
        this.update()
    }

    getById() {
        this.app.get('/api/profiles/:id', (req: Request, res: Response) => {
            self.setCollection();
            logger.debug("api/profile getById----");
            self.controller.getProfile(req, res);
        });
    }

    update() {
        this.app.put('/api/profiles', (req: Request, res: Response) => {
            self.setCollection();
            logger.debug("api/profile put----");
            self.controller.updateProfile(req, res);
        });
    }

    upload() {
        this.app.post('/api/profiles/:id/upload', upload.single('file'), function (req: Request, res: Response, next) {
            // req.file is the `avatar` file
            // req.body will hold the text fields, if there were any
            self.setCollection();
            logger.debug("/api/profile/upload----", req.params.id);
            self.controller.upload(req, res);
        });
    }

    setCollection() {
        var repository = new UserRepository();
        var service = new UserService(repository);
        this.controller = new ProfileController(service);
    }
}