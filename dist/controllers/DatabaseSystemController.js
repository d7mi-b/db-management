"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseSystemFactory_1 = __importDefault(require("../models/DatabaseSystemFactory"));
class DatabaseSystemController {
    static connect(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { system, config } = req.body;
            try {
                const db = DatabaseSystemFactory_1.default.get(system, config);
                if (!db)
                    throw new Error(db);
                db.connect();
                return res.status(200).json({
                    status: true,
                    message: "Connected to database",
                });
            }
            catch (err) {
                if (err && err.message)
                    res.status(400).json({ err: err.message });
            }
        });
    }
    static disconnect(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = DatabaseSystemFactory_1.default.get();
                if (!db)
                    throw new Error(db);
                db.disconnect();
                return res.status(200).json({
                    status: true,
                    message: "Disconnected from database",
                });
            }
            catch (err) {
                if (err && err.message)
                    res.status(400).json({ err: err.message });
            }
        });
    }
}
exports.default = DatabaseSystemController;
