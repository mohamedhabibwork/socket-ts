import WebSocket, {RawData} from "ws";
import expressWs from "express-ws";
import {Request} from "express";
import Message from "./Message";
import User from "./User";

class WS {
    public static users: User[] = [];

    public loadRoutes(ws: expressWs.Instance) {
        // const wss = ws.getWss();
        ws.app.ws('/connection/:id', (ws: WebSocket, req: Request) => {
            const {id} = req.params;
            const {profile} = req.query;

            this.addNewConnection(id, ws, profile);

            ws.on('message', (rawData: RawData, isBinary: boolean) => {
                const {data, type, channels}: Message = this.parseJson(`${rawData}`);
                if (!channels) return;
                const users = this.filter(channels);
                if (users.length) users.map(u => u.send({data, type, id, isBinary}))
            })

            ws.on('close', (ws) => {
                this.disconnect(id);
            })
            ws.on('error', (ws) => {
                this.disconnect(id);
            })
        })

        ws.app.post('/send/:id', (req: Request, res) => {
            const {id} = req.params;
            const {data, type, channels}: Message = req.body;
            if (!channels) return res.json({status: false});
            const users = this.filter(channels);
            if (!users.length) return res.json({status: false});
            users.map(u => u.send({data, type, id}))
            return res.json({status: true})
        })

        ws.app.get('/online', (req: Request, res) => res.json(WS.users.map(({profile, id}) => ({profile, id}))))

        return ws;
    }

    private parseJson = (content: string) => JSON.parse(content);
    private parseToString = (object: any) => JSON.stringify(object);
    private addNewConnection = (id: string, socket: WebSocket, profile: any): number => WS.users.push(new User(id, socket, profile));
    private filter = (ids: string[]): Array<User> => WS.users.filter((c) => ids.includes(c.id));
    private disconnect = (id: string): boolean => !!(WS.users = WS.users.filter((c) => id !== c.id));

    private getConnection = (id: string): User | null => WS.users.filter(c => c.id == id)[0] || null;
}

export default new WS();