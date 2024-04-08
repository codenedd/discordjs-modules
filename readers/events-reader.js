"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function readEvents(modules) {
    const eventsCollection = new Map();
    // LOADING EVENTS FROM GLOBAL DIRECTORY
    const globalEventsPath = path_1.default.join(path_1.default.dirname(__dirname), `/events`);
    const isGlobalEventsDirectoryExists = fs_1.default.existsSync(globalEventsPath);
    if (isGlobalEventsDirectoryExists) {
        const globalEvents = fs_1.default.readdirSync(globalEventsPath, { withFileTypes: true });
        if (globalEvents?.length) {
            for (const globalEvent of globalEvents) {
                if (globalEvent.name.endsWith(".ts") || globalEvent.name.endsWith(".js")) {
                    const eventPath = `${globalEventsPath}/${globalEvent.name}`;
                    const eventData = require(eventPath);
                    eventsCollection.set("global", eventData);
                }
            }
        }
    }
    // LOADING EVENTS FROM MODULES DIRECTORIES
    for (const module of modules) {
        if (module.isDirectory()) {
            const eventsPath = path_1.default.join(module.path, `${module.name}/events`);
            const isEventsDirectoryExists = fs_1.default.existsSync(eventsPath);
            if (isEventsDirectoryExists) {
                const events = fs_1.default.readdirSync(eventsPath, { withFileTypes: true });
                if (events?.length) {
                    for (const event of events) {
                        if (event.name.endsWith(".ts") || event.name.endsWith(".js")) {
                            const eventPath = `${eventsPath}/${event.name}`;
                            const eventData = require(eventPath);
                            eventsCollection.set(module.name, eventData);
                        }
                    }
                }
            }
        }
    }
    if (eventsCollection.size)
        console.log("\x1b[35m%s\x1b[0m", `Loaded ${eventsCollection.size} events files.`);
    return eventsCollection;
}
exports.default = readEvents;
