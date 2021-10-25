export default class Message {
    public data: any;
    public type: string;
    public SenderId: string;
    public channels: Array<string>;

    constructor(data: any, type: string, SenderId: string, channels: Array<string>) {
        this.data = data;
        this.type = type;
        this.SenderId = SenderId;
        this.channels = channels;
    }
}