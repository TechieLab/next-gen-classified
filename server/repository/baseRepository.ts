import { MongoDBConnection } from '../data/connection';
import { Db, Collection } from 'mongodb';
var logger = require('winston');

//import Logger from '../Logger'; 
//const logger = Logger('server');

export interface IBaseRepository<TEntity> {
    get(callback: (err: Error, item: Array<TEntity>) => any);
    getById(id: number, callback: (err: Error, item: TEntity) => any);
    getByQuery(query: Object, callback: (err: Error, item: Array<TEntity>) => any);
    getByPage(query: Object, sortKey: string, sortOrder: string, pageSize : number, pageNbr: number, callback: (err: Error, item: Array<TEntity>) => any);
    getCount(callback: (err: Error, item: number) => any);
    create(data: TEntity, callback: (errr: Error, item: TEntity) => any);
    bulkCreate(data: Array<TEntity>, callback: (errr: Error, item: Array<TEntity>) => any);
    update(id: string, data: TEntity, callback: (errr: Error, item: TEntity) => any);
    delete(id: string, callback: (errr: Error, item: TEntity) => any);
}

export class BaseRepository<TEntity> implements IBaseRepository<TEntity>
{
    db: Db;
    collection: Collection;
    collectionName: string;

    constructor(collectionName: string) {
        this.collectionName = collectionName;
        this.db = null;

        console.log("Collection name-----" + collectionName);

        MongoDBConnection.getConnection((connection) => {
            this.db = connection; 
        });
    }

    public getCount(callback: (err: Error, item: number) => any) {
        var collection = this.db.collection(this.collectionName);
        collection.count(function (err, item) {
            logger.debug('Gettng Count...' + item);
            callback(err, item);
        });
    }

    public get(callback: (err: Error, item: Array<TEntity>) => any) {
        var collection = this.db.collection(this.collectionName);       
        collection.find({}).toArray(function (err, item) {
            logger.debug('debug', 'reading all data..');
            callback(err, item);
        });
    }
    public getById(id: number, callback: (err: Error, item: TEntity) => any) {
        var collection = this.db.collection(this.collectionName);
        collection.findOne({ "_id": id }, function (err, results) {
            logger.debug('debug', 'reading get data..with id..' + id);
            callback(err, results);
        });
    }

    public getByQuery(query: Object, callback: (err: Error, items: Array<TEntity>) => any) { 
        var collection = this.db.collection(this.collectionName);
        collection.find(query).toArray(function (err, results) {                       
            callback(err, results);
        });
    }

    public getByPage(query: Object, sortKey: string, sortOrder: string, pageSize : number, pageNbr: number, callback: (err: Error, item: Array<TEntity>) => any) {

        var collection = this.db.collection(this.collectionName);

        var options;

        if (sortKey && sortOrder) {
            logger.debug('debug', 'reading many data..with query and sortkey, sortorder');
            options = {
                // "limit": 20,
                // "skip": 10,
                "sort": [sortKey, sortOrder]
            };

            collection.find(query, options).toArray(function (err, results) {
                callback(err, results);
            });
        } else if (sortKey) {
            logger.debug('debug', 'reading many data..with query and sortkey');
            options = {
                //  "limit": 20,
                //  "skip": 10,
                "sort": sortKey
            };
            collection.find(query, options).toArray(callback);
        } else {
            logger.debug('debug', 'reading many data..with query');
            collection.find(query).toArray(callback);
        }
    }

    public create(data: TEntity, callback: (errr: Error, item: TEntity) => any) {
        logger.debug('debug', 'called create data..');
        console.log("Collection name-----" + this.collectionName);

        if (!data) {
            callback(new Error('Empty'), null);
        }

        var collection = this.db.collection(this.collectionName);
        collection.insert(data, function (err, res) {
            logger.debug('debug', 'inserting data..');

            callback(err, res.ops[0]);
        });
    }

    public bulkCreate(data: Array<TEntity>, callback: (errr: Error, item: Array<TEntity>) => any) {
        logger.debug('debug', 'called bulk data..');
        console.log(data);

        if (!data) {
            callback(new Error("Empty data.."), null);
        }

        var collection = this.db.collection(this.collectionName);
        collection.insertMany(data, function (err, res) {
            logger.debug('debug', 'inserting bulk data..');            

            callback(err,null);
        });
    }

    public update(id: string, data: TEntity, callback: (errr: Error, item: TEntity) => any) {
        this.db.open(function (err, db) {


        });
    }

    public delete(id: string, callback: (errr: Error, item: TEntity) => any) {
        this.db.open(function (err, db) {

        });
    }
}