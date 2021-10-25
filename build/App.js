"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
// import routes from "./routes"
const ws_1 = __importDefault(require("./ws"));
const express_ws_1 = __importDefault(require("express-ws"));
class App {
    constructor() {
        this.express = express.default();
        const ws = (0, express_ws_1.default)(this.express);
        this.ws = ws;
        this.app = ws.app;
        this.mountUses();
        this.mountRoutes();
        this.mountSocket();
    }
    start(host = 'localhost', port = 3030) {
        this.express.on('upgrade', function (app) {
            // this.ws.handleUpgrade(request:any, socket:any, head:any, function done(ws) {
            //     this.ws.emit('connection', ws, request, client);
            // });
        });
        this.server = this.express.listen(port, host, function () {
            return console.log(`server is listening on http:${host}:${port}`);
        });
    }
    mountUses() {
        this.express.use(express.json());
        this.express.use((0, cors_1.default)());
    }
    mountRoutes() {
        // this.express.use('/', routes)
    }
    mountSocket() {
        ws_1.default.loadRoutes(this.ws);
    }
}
exports.default = new App();
