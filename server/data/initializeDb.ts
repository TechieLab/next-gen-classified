
'use strict';

var fs = require('fs-extra');
import path = require('path');

import {Express, Request, Response} from "express";
import logger = require('winston');
import {Db} from 'mongodb';
import {IBaseRepository, BaseRepository} from '../repository/baseRepository'
import {IProfile} from '../models/Profile';
import {IUser} from '../models/User';
import {ICategory} from '../models/Category';
import {ILookup} from '../models/lookup';

var self;
export class InitializeDb
{      
    sampleCategoryData: Array<ICategory>;
    sampleProfileData: Array<IProfile>;
    sampleUserData: Array<IUser>;
    db: Db;

    constructor(db: Db)
    {
        self = this;      
        this.db = db; 

        this.getData();
    }

    public verifyData(){      
        this.verifyProfileData(this.sampleProfileData);
        this.verifyCategoryData(this.sampleCategoryData);
        this.verifyUserData(this.sampleUserData);
    }    

    private verifyCategoryData(data : any)
    {
        var repository = new BaseRepository<ILookup>("looups");
        logger.log('debug', 'verifying emails from database..');
        //this.getSampleData();

        repository.get({}, null, null, function (err, items)
        {           

            if (items && (items.length > 0))
            {
                logger.log('debug', 'Initial data - categories OK');
            } else
            {
                
                repository.BulkCreate(data, function(err, result)
                {
                    if (!err)
                    {
                        logger.log('debug', 'Initial data - categories Inserting..');
                    } else
                    {
                        logger.log('debug', err.toString());
                    }
                });
            }
        });
    }

   
   private verifyUserData(data : any)
    {
        var repository = new BaseRepository<IUser>(this.db, "users");
        logger.log('debug', 'verifying emails from database..');
        //this.getSampleData();

        repository.GetByQuery({}, null, null, function (err, items)
        {           

            if (items && (items.length > 0))
            {
                logger.log('debug', 'Initial data - Users OK');
            } else
            {
                
                repository.BulkCreate(data, function(err, result)
                {
                    if (!err)
                    {
                        logger.log('debug', 'Initial data - Users Inserting..');
                    } else
                    {
                        logger.log('debug', err.toString());
                    }
                });
            }
        });
    }

    private verifyProfileData(data : any)
    {
        var repository = new BaseRepository<IProfile>(this.db, "profiles");
        logger.log('debug', 'verifying emails from database..');
        //this.getSampleData();

        repository.GetByQuery({}, null, null, function (err, items)
        {           

            if (items && (items.length > 0))
            {
                logger.log('debug', 'Initial data - profiles OK');
            } else
            {
                
                repository.BulkCreate(data, function(err, result)
                {
                    if (!err)
                    {
                        logger.log('debug', 'Initial data - profiles Inserting..');
                    } else
                    {
                        logger.log('debug', err.toString());
                    }
                });
            }
        });
    }

   private getData(){
         this.sampleEmailData = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/emails.json'), 'utf8'));
         this.sampleProfileData = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/profile.json'), 'utf8'));
         this.sampleCategoryData = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/category.json'), 'utf8'));
         this.sampleUserData = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/users.json'), 'utf8'));

    }
} 