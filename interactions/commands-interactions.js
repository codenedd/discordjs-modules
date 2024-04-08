"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
async function handleCommandsInteraction(client, interaction, commands) {
    if (interaction.isChatInputCommand()) {
        console.time("[DISCORDJS MODULES] Command interaction execute time");
        const command = client.commands.get(interaction.commandName);
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
        const { cooldowns } = client;
        if (!cooldowns.has(command.data.name)) {
            cooldowns.set(command.data.name, new discord_js_1.Collection());
        }
        const now = Date.now();
        const timestamps = cooldowns.get(command.data.name);
        const defaultCooldownDuration = 5;
        const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;
        if (timestamps && timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
            if (now < expirationTime) {
                const expiredTimestamp = Math.round(expirationTime / 1000);
                return interaction.reply({ content: `The next use of this command will be possible <t:${expiredTimestamp}:R>.`, ephemeral: true });
            }
        }
        timestamps?.set(interaction.user.id, now);
        setTimeout(() => timestamps?.delete(interaction.user.id), cooldownAmount);
        try {
            await command.execute(interaction);
        }
        catch (error) {
            console.error(error);
            await interaction.reply({ content: "An error occurred while executing this command!", ephemeral: true });
        }
    }
    else if (interaction.isAutocomplete()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
        try {
            if (command.autocomplete)
                await command.autocomplete(interaction);
        }
        catch (error) {
            console.error(error);
        }
        console.timeEnd("[DISCORDJS MODULES] Command interaction execute time");
    }
}
exports.default = handleCommandsInteraction;
