"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const components_reader_1 = __importDefault(require("./components-reader"));
const events_reader_1 = __importDefault(require("./events-reader"));
const commands_reader_1 = __importDefault(require("./commands-reader"));
function readModules() {
    const modulesPath = path_1.default.join(__dirname, "../modules");
    const modulesExists = fs_1.default.existsSync(modulesPath);
    if (!modulesExists) {
        console.log("\x1b[33m%s\x1b[0m", "Modules directory not found. Creating....        |");
        fs_1.default.mkdirSync(modulesPath);
    }
    const modules = fs_1.default.readdirSync(modulesPath, { withFileTypes: true });
    console.log("\x1b[33m%s\x1b[0m", "------------ Loading modules files... ------------");
    const buttons = (0, components_reader_1.default)(modules, "buttons");
    const menus = (0, components_reader_1.default)(modules, "menus");
    const modals = (0, components_reader_1.default)(modules, "modals");
    const events = (0, events_reader_1.default)(modules);
    const commands = (0, commands_reader_1.default)(modules);
    return { commands, events, buttons, menus, modals };
}
exports.default = readModules;
