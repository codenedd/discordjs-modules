"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
async function synchronizeSlashCommands(client, token, commands) {
    const rest = new discord_js_1.REST({ version: "10" }).setToken(token);
    const commandsData = [...commands.values()].map((cmd) => cmd.data.toJSON());
    await (async () => {
        try {
            if (client.user) {
                console.log("\x1b[35m%s\x1b[0m", `Started refreshing ${commandsData.length} application slash commands.`);
                await rest.put(discord_js_1.Routes.applicationCommands(client.user.id), { body: commandsData });
                console.log("\x1b[35m%s\x1b[0m", `Successfully reloaded ${commandsData.length} application slash commands.`);
            }
        }
        catch (error) {
            console.error(error);
        }
    })();
}
exports.default = synchronizeSlashCommands;
