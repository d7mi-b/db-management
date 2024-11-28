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

            return res.status(200).json({ 
                status: true,
                message: "Connected to database",
            });
        } catch (err: any) {
            if (err && err.message)
                res.status(400).json({ err: err.message });
        }
    }

    static async disconnect (req: Request, res: Response) {
        try {
            const db = DatabaseSystemFactory.get();

            if (!db)
                throw new Error(db);

            db.disconnect();

            return res.status(200).json({ 
                status: true,
                message: "Disconnected from database",
            });
        } catch (err: any) {
            if (err && err.message)
                res.status(400).json({ err: err.message });
        }
    }
}

export default DatabaseSystemController;