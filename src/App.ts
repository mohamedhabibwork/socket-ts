import * as express from 'express'
import {Application, Express} from 'express'
import cors from 'cors'
// import routes from "./routes"
import Ws from "./ws"
import expressWs from "express-ws";
import {Server} from "http";
import WebSocket, {WebSocketServer} from "ws";

class App {
    public static channels?: Map<string, WebSocketServer>;
    public express: Express
    public app: Application
    public server?: Server
    private readonly ws: expressWs.Instance;

    constructor() {
        this.express = express.default()
        const ws = expressWs(this.express);
        this.ws = ws;
        this.app = ws.app;
        this.mountUses()
        this.mountRoutes()
        this.mountSocket()
    }

    public start(host: string = 'localhost', port: number = 3030) {
        this.express.on('upgrade', function (app: Application) {
            // this.ws.handleUpgrade(request:any, socket:any, head:any, function done(ws) {
            //     this.ws.emit('connection', ws, request, client);
            // });
        });

        this.server = this.express.listen(port, host, function () {
            return console.log(`server is listening on http:${host}:${port}`)
        });
    }

    private mountUses() {
        this.express.use(express.json());
        this.express.use(cors());
    }

    private mountRoutes(): void {
        // this.express.use('/', routes)
    }

    private mountSocket() {
        Ws.loadRoutes(this.ws);
    }
}

export default new App()