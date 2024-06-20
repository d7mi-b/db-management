"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
// import style from '../styles/home.module.css';
const Home = () => {
    // console.log(style);
    return (react_1.default.createElement("main", { className: "center page bg-red-800" },
        react_1.default.createElement("header", null,
            react_1.default.createElement("h1", null, "Databases Management")),
        react_1.default.createElement("section", { className: "btn-container center" },
            react_1.default.createElement("button", { className: "btn" }, "Connect to database system")),
        react_1.default.createElement("section", null,
            react_1.default.createElement("i", { className: "fi fi-ts-database" }))));
};
exports.default = Home;
