"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const DatabaseSystemController_1 = __importDefault(require("../controllers/DatabaseSystemController"));
const router = express.Router();
router.post('/connect', DatabaseSystemController_1.default.connect);
router.get('/disconnect', DatabaseSystemController_1.default.disconnect);
module.exports = router;
