import multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

import { Express, Router, Request, Response } from 'express';
import { FileUploadController, IFileUploadController } from '../controllers/fileUploadController';

var self;

export class LookupRoute {
    uploadController: IFileUploadController;
    app: Express;

    constructor(app: Express) {
        this.app = app;
        self = this;

        this.app.get('/upload', (req: Request, res: Response) => {
            var key = req.query.key;          


        });

        app.post('/profile', upload.single('avatar'), function (req, res, next) {
            // req.file is the `avatar` file
            // req.body will hold the text fields, if there were any
        })

        app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
            // req.files is array of `photos` files
            // req.body will contain the text fields, if there were any
        })

    }

    setCollection() {

    }
}