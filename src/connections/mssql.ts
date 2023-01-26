import * as mssql from "mssql";

import { config as envConf } from "dotenv";

envConf();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: process.env.DB_URL,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
    options: {
        encrypt: true,
        trustServerCertificate: false
    },
};

export class MssqlDb {
    private static _instance: MssqlDb;
    private _pool!: mssql.ConnectionPool;

    private constructor() {}

    static async getInstance() {
        if (!MssqlDb._instance) {
            MssqlDb._instance = new MssqlDb();
            await MssqlDb._instance.dbConnect();
        }

        return MssqlDb._instance;
    }

    async dbConnect() {
        try {
            this._pool = await mssql.connect(config);
        }
        catch (err) {
            throw err;
        }
    }

    getPool() {
        if (!this._pool) {
            throw new Error('Invalid MSSQL Connection pool in class!');
        }

        return this._pool;
    }
}
