"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleEvents(client, events) {
    for (const event of events.values()) {
        event.once ? client.once(event.name, (...args) => event.execute(...args)) : client.on(event.name, (...args) => event.execute(...args));
    }
}
exports.default = handleEvents;
