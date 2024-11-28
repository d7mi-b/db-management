import { DatabaseSystemConfig } from "../types";
import DatabaseSystem from "./DatabaseSystem";
import MySQL from "./MySQL";

export default class DatabaseSystemFactory {
    private static instance: DatabaseSystem | null;

    static get (databaseSystem?: string, config?: DatabaseSystemConfig | null) {
        if (this.instance) {
            console.log("There is instance");
            return this.instance;
        }
        
        console.log("There is no instance yet");
        if (databaseSystem === 'MySQL' && config) {
            return this.instance = MySQL.getInstance(config);
        }
    }
}