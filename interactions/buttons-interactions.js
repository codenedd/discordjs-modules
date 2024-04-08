"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleButtonsInteraction(interaction, buttons) {
    if (interaction.isButton()) {
        console.time("[DISCORDJS MODULES] Button interaction execute time");
        const file = buttons.get(interaction.customId);
        file ? file.execute(interaction) : console.log(`[DISCORDJS MODULES] Button module not found, customId: ${interaction.customId}.`);
        console.timeEnd("[DISCORDJS MODULES] Button interaction execute time");
    }
}
exports.default = handleButtonsInteraction;
