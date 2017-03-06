import { Db, MongoClient} from 'mongodb';
import logger = require('winston');

const url: string = 'mongodb://168.63.255.189:27017/classifieddb';

export class MongoDBConnection {
    private static isConnected: boolean = false;
    private static db: Db;

    public static getConnection(result: (connection) => void) {
        if (this.isConnected) {
            return result(this.db);
        } else {
            this.connect((error: Error, db: Db) => {
                if (error) throw error;

                return result(this.db);
            });
        }
    }

    private static connect(result: (error: Error, db: Db) => void) {
        var mongoClient = new MongoClient();
        mongoClient.connect(url, (error: Error, db: Db) => {
            this.db = db;
            this.isConnected = true;

            logger.log('debug' , 'Mongo connected.......');

            return result(error, db);
        });
    }
}