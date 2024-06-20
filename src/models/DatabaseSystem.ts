import { Pool } from "mysql2";
import { DatabaseSystemConfig } from "../types";

export default abstract class DatabaseSystem {
    protected host: string = '';
    protected port: number = 0;
    protected system?: Pool;
    protected static instance;

    protected constructor (host: string, port: number) {
        this.host = host;
        this.port = port;
    }

    abstract connect (host: string, port: string, user: string, password: string): any;

    abstract disconnect();

    abstract databases ();

    abstract useDatabase(database: string);

    abstract createDatabase(database: string);

    abstract dropDatabase(database: string);

    abstract query(query);
}