import express, { Request, Response, NextFunction } from "express";
import path from "path";
import MySQL from "./models/MySQL";
import DatabaseSystemFactory from "./models/DatabaseSystemFactory";

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req: Request, res: Response, next: NextFunction): void => {
    try {
        res.sendFile("index.html");
    } catch (error) {
        next(error);
    }
});

app.get("/try", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const system = DatabaseSystemFactory.get();

        const databases = await system.createDatabase('test_db_mangment');
        
        res.json(databases);
    } catch (error) {
        next(error);
    }
});

app.get("/connect", (req: Request, res: Response, next: NextFunction): void => {
    try {
        const system = DatabaseSystemFactory.get("mysql", {
            host: "localhost",
            port: 3306,
            user: "root",
            password: '2546'
        });
        
        if (system)
            system.connect();
        
        res.send("Connect to MySQL databse");
    } catch (error) {
        next(error);
    }
});

app.get("/disconnect", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const system = DatabaseSystemFactory.get();
        
        const database = await system.dropDatabase('test_db_mangment');
        
        res.json(database);
    } catch (error) {
        next(error);
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});