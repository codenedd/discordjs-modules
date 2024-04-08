"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function readCommands(modules) {
    const commandsCollection = new Map();
    // LOADING COMMANDS FROM GLOBAL DIRECTORY
    const globalCommandssPath = path_1.default.join(path_1.default.dirname(__dirname), `/commands`);
    const isGlobalCommandsDirectoryExists = fs_1.default.existsSync(globalCommandssPath);
    if (isGlobalCommandsDirectoryExists) {
        const globalCommands = fs_1.default.readdirSync(globalCommandssPath, { withFileTypes: true });
        if (globalCommands?.length) {
            for (const globalCommand of globalCommands) {
                if (globalCommand.name.endsWith(".ts") || globalCommand.name.endsWith(".js")) {
                    const commandPath = `${globalCommandssPath}/${globalCommand.name}`;
                    const commandData = require(commandPath);
                    if (commandsCollection.has(commandData.data.name))
                        throw new Error(`Duplicated command: ${commandData.data.name}; in ${commandPath}`);
                    commandsCollection.set(commandData.data.name, commandData);
                }
            }
        }
    }
    // LOADING COMMANDS FROM MODULES DIRECTORIES
    for (const module of modules) {
        if (module.isDirectory()) {
            const commandsPath = path_1.default.join(module.path, `${module.name}/commands`);
            const isCommandsDirectoryExists = fs_1.default.existsSync(commandsPath);
            if (isCommandsDirectoryExists) {
                const commands = fs_1.default.readdirSync(commandsPath, { withFileTypes: true });
                if (commands?.length) {
                    for (const command of commands) {
                        if (command.name.endsWith(".ts") || command.name.endsWith(".js")) {
                            const commandPath = `${commandsPath}/${command.name}`;
                            const commandData = require(commandPath);
                            if (commandsCollection.has(commandData.data.name))
                                throw new Error(`Duplicated command: ${commandData.data.name}; in ${commandPath}`);
                            commandsCollection.set(commandData.data.name, commandData);
                        }
                    }
                }
            }
        }
    }
    if (commandsCollection.size)
        console.log("\x1b[35m%s\x1b[0m", `Loaded ${commandsCollection.size} commands files.`);
    return commandsCollection;
}
exports.default = readCommands;
