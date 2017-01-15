import { Db, MongoClient } from 'mongodb';

const url: string = 'mongodb://localhost:27017/classifieddb';

export class MongoDBConnection {
    private static isConnected: boolean = false;
    private static db: Db;

    public static getConnection(result: (connection) => void) {
        if (this.isConnected) {
            return result(this.db);
        } else {
            this.connect((error, db: Db) => {
                 if (error) throw error;               

                return result(this.db);
            });
        }
    }

    private static connect(result: (error, db: Db) => void) {
        MongoClient.connect(url, (error, db: Db) => { 
            this.db = db;
            this.isConnected = true;         

            return result(error, db);
        });
    }
}