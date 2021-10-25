"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, socket, profile) {
        this.parseJson = (content) => JSON.parse(content);
        this.parseToString = (object) => JSON.stringify(object);
        this.id = id;
        this.socket = socket;
        this.profile = profile;
    }
    send(data) {
        data.profile = this.profile;
        this.socket.send(this.parseToString(data));
    }
}
exports.default = User;
