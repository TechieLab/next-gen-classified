'use strict';

var fs = require('fs-extra');
import path = require('path');

import {Express, Request, Response} from "express";
import logger = require('winston');
import {Db} from 'mongodb';
import {IBaseRepository, BaseRepository} from '../repository/baseRepository'
import {Profile} from '../models/Profile';
import {User} from '../models/User';
import {Category} from '../models/Category';
import {Lookup} from '../models/lookup';

var self;
export class InitializeSampleDb
{      
    sampleLookupData: Array<Lookup>;
    sampleProfileData: Array<Profile>;
    sampleUserData: Array<User>;

    constructor()
    {
        self = this; 
        this.getData();
    }

    public verifyData(){      
        //this.verifyProfileData(this.sampleProfileData);
        this.verifyLookupData(this.sampleLookupData);
        //this.verifyUserData(this.sampleUserData);
    }    

    private verifyLookupData(data : any)
    {
        var repository = new BaseRepository<Lookup>("lookups");
        logger.log('debug', 'verifying lookups from database..');
        //this.getSampleData();

        repository.getCount(function (err, items)
        {           

            if (items> 0)
            {
                logger.log('debug', 'Initial data - lookups OK');
            } else
            {
                
                repository.bulkCreate(data, function(err, result)
                {
                    if (!err)
                    {
                        logger.log('debug', 'Initial data - lookups Inserting..');
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
        var repository = new BaseRepository<User>("users");
        logger.log('debug', 'verifying Users from database..');
        //this.getSampleData();

        repository.getCount(function (err, item)
        {           

            if (item > 0)
            {
                logger.log('debug', 'Initial data - Users OK');
            } else
            {
                
                repository.bulkCreate(data, function(err, result)
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
        var repository = new BaseRepository<Profile>("profiles");
        logger.log('debug', 'verifying profiles from database..');
        //this.getSampleData();

        repository.getCount(function (err, items)
        {           

            if (items> 0)
            {
                logger.log('debug', 'Initial data - profiles OK');
            } else
            {
                
                repository.bulkCreate(data, function(err, result)
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
         //this.sampleProfileData = JSON.parse(fs.readFileSync(path.join(__dirname, './sample/profile.json'), 'utf8'));
         this.sampleLookupData = JSON.parse(fs.readFileSync(path.join(__dirname, './sample/lookup.json'), 'utf8'));
         //this.sampleUserData = JSON.parse(fs.readFileSync(path.join(__dirname, './sample/users.json'), 'utf8'));
    }
} 