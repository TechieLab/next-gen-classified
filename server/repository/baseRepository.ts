import { MongoDBConnection } from '../data/connection';
import { Db, Collection, ObjectID } from 'mongodb';
var logger = require('winston');

//import Logger from '../Logger'; 
//const logger = Logger('server');

export interface IBaseRepository<TEntity> {
    get(query: Object, callback: (err: Error, item: Array<TEntity>) => any);
    getById(id: ObjectID, callback: (err: Error, item: TEntity) => any);
    getCount(callback: (err: Error, item: number) => any);
    create(data: TEntity, callback: (errr: Error, item: TEntity) => any);
    bulkCreate(data: Array<TEntity>, callback: (errr: Error, item: Array<TEntity>) => any);
    update(id: ObjectID, data: TEntity, callback: (errr: Error, item: TEntity) => any);
    replace(id: ObjectID, data: TEntity, callback: (errr: Error, item: TEntity) => any);
    delete(id: ObjectID, callback: (errr: Error, item: TEntity) => any);
}

export class BaseRepository<TEntity> implements IBaseRepository<TEntity>
{
    db: Db;
    collection: Collection;

    constructor(public collectionName: string) {
        console.log("Collection name-----" + collectionName);

        MongoDBConnection.getConnection((connection) => {
            this.db = connection;
            this.collection = this.db.collection(collectionName);
        });
    }

    public getCount(callback: (err: Error, item: number) => any) {
        this.collection.count(function (err, item) {
            logger.debug('Gettng Count...' + item);
            callback(err, item);
        });
    }

    public get(query: Object, callback: (err: Error, item: Array<TEntity>) => any) {
        if (query) {
            this.getByPage(query, query["sortKey"], query["sortOrder"], query["pageSize"], query["pageNbr"], callback);
        } else {
            this.getAll(callback);
        }
    }

    public getById(id: ObjectID, callback: (err: Error, item: TEntity) => any) {
        this.collection.findOne({ _id: id }, function (err, results) {
            logger.debug('debug', 'reading get data..with id..' + id);
            callback(err, results);
        });
    }

    private getAll(callback: (err: Error, item: Array<TEntity>) => any) {
        this.collection.find({}).toArray(function (err, item) {
            logger.debug('debug', 'reading all data..');
            callback(err, item);
        });
    }

    private getByPage(query: Object, sortKey: string, sortOrder: string, pageSize: number, pageNbr: number, callback: (err: Error, item: Array<TEntity>) => any) {

        var options;

        if (sortKey && sortOrder) {
            logger.debug('debug', 'reading many data..with query and sortkey, sortorder');
            options = {
                "sort": [sortKey, sortOrder]
            };

            this.collection.find(query, options).toArray((err, results) => {
                callback(err, results);
            });
        } else if (sortKey) {
            logger.debug('debug', 'reading many data..with query and sortkey');
            options = {
                "sort": sortKey
            };
            this.collection.find(query, options).toArray(callback);
        } else {
            logger.debug('debug', 'reading many data..with query');
            console.log(query);
            console.log(this.collectionName);
            this.collection.find(query).toArray(callback);
        }
    }

    public create(data: TEntity, callback: (errr: Error, item: TEntity) => any) {
        logger.debug('debug', 'called create data..');
        if (!data) {
            callback(new Error('Empty'), null);
        }


        this.collection.insert(data, function (err, res) {
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


        this.collection.insertMany(data, (err, res) => {
            logger.debug('debug', 'inserting bulk data..');

            callback(err, null);
        });
    }

    public update(id: ObjectID, data: TEntity, callback: (errr: Error, item: TEntity) => any) {
        logger.debug('debug', 'called update data..');
        console.log(data);
        this.collection.findOneAndUpdate({ _id: id }, data, (err, res) => {
            logger.debug('debug', 'updated data with id------' + id);

            callback(err, res.value);
        });
    }

    public replace(id: ObjectID, data: TEntity, callback: (errr: Error, item: TEntity) => any) {
        logger.debug('debug', 'called update data..');
        console.log(data);
        this.collection.findOneAndReplace({ _id: id }, data, (err, res) => {
            logger.debug('debug', 'replaced data with id------' + id);

            callback(err, res.value);
        });
    }


    public delete(id: ObjectID, callback: (errr: Error, item: TEntity) => any) {
        logger.debug('debug', 'called delele data..');

        this.collection.findOneAndDelete({ _id: id }, (err, res) => {
            logger.debug('debug', 'deleleed data..');

            callback(err, res.value);
        });
    }
}