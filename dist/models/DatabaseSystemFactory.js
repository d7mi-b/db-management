"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MySQL_1 = __importDefault(require("./MySQL"));
class DatabaseSystemFactory {
    static get(databaseSystem, config) {
        if (this.instance) {
            console.log("There is instance");
            return this.instance;
        }
        console.log("There is no instance yet");
        if (databaseSystem === 'mysql' && config) {
            return this.instance = MySQL_1.default.getInstance(config);
        }
    }
}
exports.default = DatabaseSystemFactory;
