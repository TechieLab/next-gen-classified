import { Express, Router, Request, Response } from 'express';
import { IBaseService, BaseService } from '../services/baseService';
import { IBaseRepository, BaseRepository } from '../repository/baseRepository';
import { BaseController, IBaseController } from '../controllers/baseController';
import logger = require('winston');
var jwt = require('jsonwebtoken');
var multer = require('multer');
var path = require('path');
let mkdirp = require ("mkdirp");

var apiRoutes = Router();
let imagestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let newDestination = './uploads/' + req['userId'];
    mkdirp.sync(newDestination);
    cb (null, newDestination);
  },
  filename: (req, file, cb) => {
    let getFileExt = (fileName) => {
        var fileExt = fileName.split(".");
        if ( fileExt.length === 1 || ( fileExt[0] === "" && fileExt.length === 2 ) ) {
            return "";
        }
        return fileExt.pop();
    };
    cb(null, req.body.fileName); // + "_" + Date.now() + "." + getFileExt(file.originalname));
  }
});

let multerUpload = multer({ storage: imagestorage }).single("file");

export interface IBaseApiRoute<T> {
    get();
    getById();
    post();
    put();
    del();
}

var self;
export class BaseApiRoute<TEntity> implements IBaseApiRoute<TEntity>
{
    baseController: IBaseController<TEntity>;
    baseService: IBaseService<TEntity>;

    constructor(public app: Express, public apiName: string) {
        this.app = app;
        self = this;

        apiRoutes.use(multerUpload);

        apiRoutes.use(function (req: Request, res: Response, next) {
            var token = req.body.token || req.query.token || req.headers['authorization'];
            // decode token
            if (token) {
                // verifies secret and checks exp
                jwt.verify(token, 'classified-application', function (err, decoded) {
                    if (err) {
                        return res.json({ success: false, message: 'Failed to authenticate token.' });
                    } else {
                        // if everything is good, save to request for use in other routes
                        req['userId'] = decoded.userId;
                        next();
                    }
                });

            } else {
                next();

                // if there is no token
                // return an error
                // return res.status(403).send({
                //     success: false,
                //     message: 'No token provided.'
                // });                
            }
        });

        //app.use(this.except(apiRoutes));
        app.use(apiRoutes);

        this.get();
        this.getAll();
        this.getById();
        this.post();
        this.put();
        this.del();
    }

    // except(middleware) {
    //     return function (req, res, next) {
    //         logger.log('debug', req.path);
    //         logger.log('debug', req['userId']);

    //         if (req.path.indexOf('users') > 0 || req.path.indexOf('account/register') > 0) { //|| req.path.indexOf('all-posts')
    //             return next();
    //         } else {
    //             return middleware(req, res, next);
    //         }
    //     };
    // }

    private setCollection(apiName) {
        var repository = new BaseRepository(apiName);
        this.baseService = new BaseService(repository);
        this.baseController = new BaseController(this.baseService);
    }

    get() {
        this.app.get('/api/' + this.apiName, (req: Request, res: Response) => {
            self.setCollection(this.apiName);
            logger.debug("route name get----" + this.apiName);
            self.baseController.get(req, res);
        });
    }

    getAll() {
        this.app.get('/api/all-' + this.apiName, (req: Request, res: Response) => {
            self.setCollection(this.apiName);
            logger.debug("route name getall----" + this.apiName);
            self.baseController.getAll(req, res);
        });
    }

    getById() {
        this.app.get('/api/' + this.apiName + '/:id', (req: Request, res: Response) => {
            self.setCollection(this.apiName);
              logger.debug("route name getById----" + this.apiName);
            self.baseController.getById(req, res);
        });
    }

    post() {
        this.app.post('/api/' + this.apiName, (req: Request, res: Response) => {
            self.setCollection(this.apiName);
             logger.debug("route name post----" + this.apiName);
            self.baseController.create(req, res);
        });
    }

    put() {
        this.app.put('/api/' + this.apiName, (req: Request, res: Response) => {
            self.setCollection(this.apiName);
             logger.debug("route name post----" + this.apiName);
            self.baseController.update(req, res);
        });
    }

    del() {
        this.app.delete('/api/' + this.apiName, (req: Request, res: Response) => {
            self.setCollection(this.apiName);
             logger.debug("route name del----" + this.apiName);
            self.baseController.delete(req, res);
        });
    }

}