"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
    constructor(data, type, SenderId, channels) {
        this.data = data;
        this.type = type;
        this.SenderId = SenderId;
        this.channels = channels;
    }
}
exports.default = Message;
