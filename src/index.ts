import express, { Request, Response, NextFunction } from "express";
import path from "path";
// const cros = require('cros');
import MySQL from "./models/MySQL";
import DatabaseSystemFactory from "./models/DatabaseSystemFactory";

const DatabaseSystemRoutes = require("./routes/DatabaseSystemRoutes");

const app = express();

app.use(express.json());
// app.use(express.urlencoded({extended: true }));
// app.use(cros());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req: Request, res: Response, next: NextFunction): void => {
    try {
        res.sendFile("index.html");
    } catch (error) {
        next(error);
    }
});

app.use('/system', DatabaseSystemRoutes);

app.get("/try", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const system = DatabaseSystemFactory.get();

        const databases = await system.createDatabase('test_db_mangment');
        
        res.json(databases);
    } catch (error) {
        next(error);
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});