import mysql = require('mysql2');
import DatabaseSystem from './DatabaseSystem';
import { DatabaseSystemConfig } from '../types';

class MySQL extends DatabaseSystem {
    private user: string = '';
    private password: string = '';

    private constructor (host: string, port: number, user: string, password: string) {
        super(host, port);

        this.user = user;
        this.password = password;
    }

    connect () {
        this.system = mysql.createPool({
            host: this.host,
            port: this.port,
            user: this.user,
            password: this.password
        });
    }

    disconnect() {
        if (this.system)
            this.system.end();
    }

    databases() {
        return this.query('show databases');
    }

    useDatabase(database: string) {
        return new Promise((resolve, reject) => {
            if (this.system) {
                this.system.query(`use ${database}`, (err, result) => {
                    if (result)
                        resolve(`using ${database} databse`);
                })
            }
        })
    }

    createDatabase(database: string) {
        return new Promise((resolve, reject) => {
            if (this.system) {
                this.system.query(`create database ${database}`, (err, result) => {
                    if (result)
                        resolve(`${database} databse created`);

                    if (err)
                        reject(`Somthing wrong, maybe ${database} databse already created`);
                })
            }
        })
    }

    dropDatabase(database: string) {
        return new Promise((resolve, reject) => {
            if (this.system) {
                this.system.query(`drop database ${database}`, (err, result) => {
                    if (result)
                        resolve(`${database} databse droped`);

                    if (err)
                        reject(`Somthing wrong, maybe ${database} databse already droped`);
                })
            }
        })
    }

    query(query: string) {
        return new Promise((resolve, reject) => {
            if (this.system) {
                this.system.query(query, (err, result) => {
                    if (result)
                        resolve(result);

                    if(err)
                        reject(err);
                })
            }
        })
    }

    static getInstance (config: DatabaseSystemConfig | null) {
        if (!this.instance) {
            if (config && config.host && config.port && config.user && config.password)
                return this.instance = new MySQL(config.host, config.port, config.user, config.password);
            else
                throw new Error("The data for connection with MySQL unvalid"); 
        }

        return this.instance;
    }
}

export default MySQL;