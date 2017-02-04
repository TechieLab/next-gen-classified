
'use strict';

var fs = require('fs-extra');
import path = require('path');

import {Express, Request, Response} from "express";
import logger = require('winston');
import {Db} from 'mongodb';
import {BaseRepository} from '../repository/impl/base'
import {IEmail} from '../models/Email';
import {IProfile} from '../models/Profile';
import {IUser} from '../models/User';
import {ICategory} from '../models/Category';

var self;
export class InitializeDb
{  
    sampleEmailData: Array<IEmail>;
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
        this.verifyEmailData(this.sampleEmailData);
        this.verifyProfileData(this.sampleProfileData);
        this.verifyCategoryData(this.sampleCategoryData);
        this.verifyUserData(this.sampleUserData);
    }

    private verifyEmailData(data : any)
    {
        var repository = new BaseRepository<IEmail>(this.db, "emails");
        logger.log('debug', 'verifying emails from database..');
        //this.getSampleData();

        repository.GetByQuery({}, null, null, function (err, items)
        {           

            if (items && (items.length > 0))
            {
                logger.log('debug', 'Initial data - Emails OK');
            } else
            {
                
                repository.BulkCreate(data, function(err, result)
                {
                    if (!err)
                    {
                        logger.log('debug', 'Initial data - Emails Inserting..');
                    } else
                    {
                        logger.log('debug', err.toString());
                    }
                });
            }
        });
    }

    private verifyCategoryData(data : any)
    {
        var repository = new BaseRepository<ICategory>(this.db, "categories");
        logger.log('debug', 'verifying emails from database..');
        //this.getSampleData();

        repository.GetByQuery({}, null, null, function (err, items)
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