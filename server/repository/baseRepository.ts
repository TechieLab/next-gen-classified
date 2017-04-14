﻿import { MongoDBConnection } from '../data/connection';
import { ElasticSearchConnection } from '../data/ElasticSearchConnection';
import { Db, Collection, ObjectID } from 'mongodb';
import logger = require('winston');
var es = require('elasticsearch');

//import Logger from '../Logger'; 
//const logger = Logger('server');

export interface IBaseRepository<TEntity> {
    get(query: any, callback: (err: Error, item: Array<TEntity>) => any);
    getById(id: string, callback: (err: Error, item: TEntity) => any);
    getCount(query: any, callback: (err: Error, item: number) => any);
    create(data: TEntity, callback: (errr: Error, item: TEntity) => any);
    bulkCreate(data: Array<TEntity>, callback: (errr: Error, item: Array<TEntity>) => any);
    update(id: string, data: TEntity, option: Object, callback: (errr: Error, item: TEntity) => any);
    replace(id: string, data: TEntity, callback: (errr: Error, item: TEntity) => any);
    delete(id: string, callback: (errr: Error, item: TEntity) => any);
}

export class BaseRepository<TEntity> implements IBaseRepository<TEntity>
{
    db: Db;
    client: any;
    collection: Collection;
    collectionname: string;

    constructor(public collectionName: string) {
        logger.debug("Collection name-----" + collectionName);
        this.collectionname = collectionName;

        MongoDBConnection.getConnection((connection) => {
            this.db = connection;
            this.collection = this.db.collection(collectionName);
        });

        this.client = new es.Client({
            host: '127.0.0.1:9200',
            log: 'error'
        });
    }

    public getCount(query: any, callback: (err: Error, item: number) => any) {
        this.collection.count(query, function (err, item) {
            if (err) {
                logger.debug('error base getCount...', err);
            }

            logger.debug('Gettng Count...' + item);
            callback(err, item);
        });
    }

    public getById(id: string, callback: (err: Error, item: TEntity) => any) {
        logger.debug('debug', 'reading get data..with id..' + id);
        this.collection.findOne({ _id: new ObjectID(id) }, (err, result) => {
            if (err) {
                logger.debug('error base getById...', err);
            }
            callback(err, result);
        });
    }

    public get(query: any, callback: (err: Error, item: Array<TEntity>) => any) {
        let fields: Array<string> = this.getFields(query);
        let sortObj = this.getSortBy(query);
        let pageSize: number = query['pageSize'];
        let pageNbr: number = query['page'];      

        delete query['sortKey'];
        delete query['sortOrder'];
        delete query['fields'];
        delete query['pageSize'];
        delete query['page'];

        logger.debug('debug', 'reading many data..with query', query);

        this.collection.find(query, fields, null, pageSize * pageNbr).sort(sortObj).toArray(callback);
    }

    public create(data: TEntity, callback: (errr: Error, item: TEntity) => any) {
        logger.debug('debug', 'called create data--------', data);
        if (!data) {
            callback(new Error('Empty'), null);
        }

        this.collection.insert(data, (err, res) => {
            logger.debug('debug', 'inserting data..');

            if (err) {
                callback(err, null);
            }

            this.saveEntityElasticSearch(res.ops[0]);
            callback(err, res.ops[0]);
        });
    }

    public bulkCreate(data: Array<TEntity>, callback: (errr: Error, item: Array<TEntity>) => any) {
        logger.debug('debug', 'called bulk data-------', data);

        if (!data) {
            callback(new Error("Empty data.."), null);
        }


        this.collection.insertMany(data, (err, res) => {
            logger.debug('debug', 'inserting bulk data..');

            callback(err, null);
        });
    }

    public update(id: string, data: TEntity, options: Object, callback: (errr: Error, item: TEntity) => any) {
        logger.debug('debug', 'called update data-----', data);

        this.collection.findOneAndUpdate({ _id: new ObjectID(id) }, data, options, (err, res) => {
            if (err) {
                callback(err, null);
            }

            logger.debug('debug', 'updated data with id------' + id);
            callback(err, res.value);
        });
    }

    public replace(id: string, data: TEntity, callback: (errr: Error, item: TEntity) => any) {
        logger.debug('debug', 'called update data--------', data);
        this.collection.findOneAndReplace({ _id: new ObjectID(id) }, data, (err, res) => {
            logger.debug('debug', 'replaced data with id------' + id);

            callback(err, res.value);
        });
    }


    public delete(id: string, callback: (errr: Error, item: TEntity) => any) {
        logger.debug('debug', 'called delele data---------', id);

        this.collection.findOneAndDelete({ _id: id }, (err, res) => {
            logger.debug('debug', 'deleleed data..');

            callback(err, res.value);
        });
    }

    /*************PRIVATE FUNCTIONS****************************** */

    private getFields(query: any) {
        let fields: Array<string>;

        if (query['fields']) {
            fields = query['fields'].split(',');
        }

        return fields;
    }

    private getSortBy(query: any) {
        let sortObj: any = {};

        if (query['sortKey'] == 'Price') {
            sortObj = { 'Product.Description.Price': +query['sortOrder'] }
        }

        if (query['sortKey'] == 'ModifiedOn') {
            sortObj = { "ModifiedOn": +query['sortOrder'] };
        }

        if (query['sortKey'] == 'Discount') {
            sortObj = { 'Product.Description.Discount': +query['sortOrder'] };
        }

        console.log(sortObj);

        return sortObj;
    }

    private saveEntityElasticSearch(data) {

        let bulkBody = [];
        bulkBody.push({
            index: {
                _index: this.collectionname,
                _type: this.collectionname
            }
        });

        bulkBody.push(data);
        this.client.bulk({ body: bulkBody });
    }
}