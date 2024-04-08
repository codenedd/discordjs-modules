"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const modules_reader_1 = __importDefault(require("./readers/modules-reader"));
const buttons_interactions_1 = __importDefault(require("./interactions/buttons-interactions"));
const menus_interactions_1 = __importDefault(require("./interactions/menus-interactions"));
const modals_interactions_1 = __importDefault(require("./interactions/modals-interactions"));
const commands_interactions_1 = __importDefault(require("./interactions/commands-interactions"));
const synchronize_commands_1 = __importDefault(require("./api/synchronize-commands"));
const DiscordJSModules = {
    init(client, token) {
        console.log("\x1b[33m%s\x1b[0m", "--------------------------------------------------");
        console.log("\x1b[33m%s\x1b[0m", "-------- DiscordJS Modules Initialization... -----");
        console.log("\x1b[33m%s\x1b[0m", "--------------------------------------------------");
        const modules = (0, modules_reader_1.default)();
        client.commands = modules.commands;
        client.cooldowns = new discord_js_1.Collection();
        client.once(discord_js_1.Events.ClientReady, (client) => {
            console.log("\x1b[33m%s\x1b[0m", "--------------------------------------------------");
            console.log("\x1b[33m%s\x1b[0m", "--- Synchronizing slash commands on the server ---");
            (0, synchronize_commands_1.default)(client, token, modules.commands).then(() => {
                console.log("\x1b[33m%s\x1b[0m", "--------------------------------------------------");
                console.log("\x1b[33m%s\x1b[0m", "------- Everything done and ready to work! -------");
            });
        });
        client.on(discord_js_1.Events.InteractionCreate, async (interaction) => {
            try {
                await (0, commands_interactions_1.default)(client, interaction, modules.commands);
                (0, buttons_interactions_1.default)(interaction, modules.buttons);
                (0, menus_interactions_1.default)(interaction, modules.menus);
                (0, modals_interactions_1.default)(interaction, modules.modals);
            }
            catch (err) {
                console.log(err);
            }
        });
        console.log("\x1b[33m%s\x1b[0m", "--------------------------------------------------");
        console.log("\x1b[33m%s\x1b[0m", "------------- Creating client events -------------");
        for (const [eventName, eventModule] of modules.events) {
            eventModule.once ? client.once(eventModule.name, (...args) => eventModule.execute(...args)) : client.on(eventModule.name, (...args) => eventModule.execute(...args));
            console.log("\x1b[35m%s\x1b[0m", `Created ${eventModule.name} event from ${eventName} module.`);
        }
    },
};
exports.default = DiscordJSModules;
