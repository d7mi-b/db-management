import e, { Errback, Request, Response } from "express";
import DatabaseSystemFactory from "../models/DatabaseSystemFactory";

class DatabaseSystemController {
    static async connect (req: Request, res: Response) {
        const { system, config } = req.body;
        
        try {
            const db = DatabaseSystemFactory.get(system, config);

            if (!db)
                throw new Error(db);

            db.connect();
            res.status(200).json({ 
                status: true,
                message: "Connected to database",
            });
        } catch (err: any) {
            if (err && err.message)
                res.json({ err: err.message });
        }
    }
}

export default DatabaseSystemController;