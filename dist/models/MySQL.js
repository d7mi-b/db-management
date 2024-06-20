"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql2");
const DatabaseSystem_1 = __importDefault(require("./DatabaseSystem"));
class MySQL extends DatabaseSystem_1.default {
    constructor(host, port, user, password) {
        super(host, port);
        this.user = '';
        this.password = '';
        this.user = user;
        this.password = password;
    }
    connect() {
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
    useDatabase(database) {
        return new Promise((resolve, reject) => {
            if (this.system) {
                this.system.query(`use ${database}`, (err, result) => {
                    if (result)
                        resolve(`using ${database} databse`);
                });
            }
        });
    }
    createDatabase(database) {
        return new Promise((resolve, reject) => {
            if (this.system) {
                this.system.query(`create database ${database}`, (err, result) => {
                    if (result)
                        resolve(`${database} databse created`);
                    if (err)
                        reject(`Somthing wrong, maybe ${database} databse already created`);
                });
            }
        });
    }
    dropDatabase(database) {
        return new Promise((resolve, reject) => {
            if (this.system) {
                this.system.query(`drop database ${database}`, (err, result) => {
                    if (result)
                        resolve(`${database} databse droped`);
                    if (err)
                        reject(`Somthing wrong, maybe ${database} databse already droped`);
                });
            }
        });
    }
    query(query) {
        return new Promise((resolve, reject) => {
            if (this.system) {
                this.system.query(query, (err, result) => {
                    if (result)
                        resolve(result);
                    if (err)
                        reject(err);
                });
            }
        });
    }
    static getInstance(config) {
        if (!this.instance) {
            if (config && config.host && config.port && config.user && config.password)
                return this.instance = new MySQL(config.host, config.port, config.user, config.password);
            else
                throw new Error("The data for connection with MySQL unvalid");
        }
        return this.instance;
    }
}
exports.default = MySQL;
