"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./App"));
const PORT = parseInt(`${process.env.PORT || 3030}`);
const HOST = `${process.env.HOST || 'localhost'}`;
App_1.default.start(HOST, PORT);
