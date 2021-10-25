"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = __importDefault(require("./Message"));
const User_1 = __importDefault(require("./User"));
class WS {
    constructor() {
        this.parseJson = (content) => JSON.parse(content);
        this.parseToString = (object) => JSON.stringify(object);
        this.addNewConnection = (id, socket, profile) => WS.users.push(new User_1.default(id, socket, profile));
        this.filter = (ids) => WS.users.filter((c) => ids.includes(c.id));
        this.disconnect = (id) => !!(WS.users = WS.users.filter((c) => id !== c.id));
        this.getConnection = (id) => WS.users.filter(c => c.id == id)[0] || null;
    }
    loadRoutes(ws) {
        // const wss = ws.getWss();
        ws.app.ws('/connection/:id', (ws, req) => {
            const { id } = req.params;
            const { profile } = req.query;
            this.addNewConnection(id, ws, profile);
            ws.on('message', (rawData, isBinary) => {
                const { data, type, channels } = Object.assign(Message_1.default, this.parseJson(`${rawData}`));
                if (!channels)
                    return;
                const users = this.filter(channels);
                if (users.length)
                    users.map(u => u.send({ data, type, id, isBinary }));
            });
            ws.on('close', (ws) => {
                this.disconnect(id);
            });
            ws.on('error', (ws) => {
                this.disconnect(id);
            });
        });
        ws.app.post('/send/:id', (req, res) => {
            const { id } = req.params;
            const { data, type, channels } = Object.assign(Message_1.default, req.body);
            if (!channels)
                return res.json({ status: false });
            const users = this.filter(channels);
            if (!users.length)
                return res.json({ status: false });
            users.map(u => u.send({ data, type, id }));
            return res.json({ status: true });
        });
        ws.app.get('/online', (req, res) => res.json(WS.users.map(({ profile, id }) => ({ profile, id }))));
        return ws;
    }
}
WS.users = [];
exports.default = new WS();
