"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleModalsInteraction(interaction, modals) {
    if (interaction.isModalSubmit()) {
        console.time("[DISCORDJS MODULES] Modal interaction execute time");
        const file = modals.get(interaction.customId);
        file ? file.execute(interaction) : console.log(`[DISCORDJS MODULES] Modal module not found, customId: ${interaction.customId}.`);
        console.timeEnd("[DISCORDJS MODULES] Modal interaction execute time");
    }
}
exports.default = handleModalsInteraction;
