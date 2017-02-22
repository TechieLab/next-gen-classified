import { Express, Router, Request, Response } from 'express';
import { IBaseService, BaseService } from '../services/baseService';
import { IBaseRepository, BaseRepository } from '../repository/baseRepository';
import { BaseController, IBaseController } from '../controllers/baseController';
import logger = require('winston');
var jwt = require('jsonwebtoken');

var apiRoutes = Router();

export interface IBaseApiRoute<TEntity> {
    get();
    getById();
    // post();
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
                        req['decoded'] = decoded;
                        next();
                    }
                });

            } else {

                // if there is no token
                // return an error
                return res.status(403).send({
                    success: false,
                    message: 'No token provided.'
                });
            }
        });

        app.use(this.except(apiRoutes));        

        this.get();
        this.getById();
        this.post();
        this.put();
        this.del();
    }

    except(middleware) {
        return function (req, res, next) {
            if (req.path.indexOf('users') === -1 && req.path.indexOf('account/register') === -1) {
                return middleware(req, res, next);
            } else {
                return next();
            }
        };
    }

    setCollection(apiName) {
        var repository = new BaseRepository(apiName);
        this.baseService = new BaseService(repository);
        this.baseController = new BaseController(this.baseService);
    }

    get() {
        this.app.get('/api/' + this.apiName + '/', (req: Request, res: Response) => {
            self.setCollection(this.apiName);
            console.log("route name ----" + this.apiName);
            self.baseController.getEntities(req, res);
        });
    }

    getById() {
        this.app.get('/api/' + this.apiName + '/:id', (req: Request, res: Response) => {
            self.setCollection(this.apiName);
            self.baseController.getEntity(req, res);
        });
    }

    post() {
        this.app.post('/api/' + this.apiName + '/', (req: Request, res: Response) => {
            self.setCollection(this.apiName);
            self.baseController.createEntity(req, res);
        });
    }

    put() {
        this.app.put('/api/' + this.apiName + '/', (req: Request, res: Response) => {
            self.setCollection(this.apiName);
            self.baseController.updateEntity(req, res);
        });
    }

    del() {
        this.app.delete('/api/' + this.apiName + '/', (req: Request, res: Response) => {
            self.setCollection(this.apiName);
            self.baseController.deleteEntity(req, res);
        });
    }

}