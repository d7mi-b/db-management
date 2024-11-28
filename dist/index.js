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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const DatabaseSystemFactory_1 = __importDefault(require("./models/DatabaseSystemFactory"));
const DatabaseSystemRoutes = require("./routes/DatabaseSystemRoutes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use(express.urlencoded({extended: true }));
// app.use(cros());
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.get("/", (req, res, next) => {
    try {
        res.sendFile("index.html");
    }
    catch (error) {
        next(error);
    }
});
app.use('/system', DatabaseSystemRoutes);
app.get("/try", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const system = DatabaseSystemFactory_1.default.get();
        const databases = yield system.createDatabase('test_db_mangment');
        res.json(databases);
    }
    catch (error) {
        next(error);
    }
}));
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
