import WebSocket from "ws";

export default class User {
    public id: string;
    public socket: WebSocket;
    public profile?: any;

    constructor(id: string, socket: WebSocket.WebSocket, profile?: any) {
        this.id = id;
        this.socket = socket;
        this.profile = profile;
    }

    public send(data: any) {
        data.profile = this.profile;
        this.socket.send(this.parseToString(data))
    }

    private parseJson = (content: string) => JSON.parse(content);
    private parseToString = (object: any) => JSON.stringify(object);
}