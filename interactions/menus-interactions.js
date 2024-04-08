"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleMenusInteraction(interaction, menus) {
    if (interaction.isAnySelectMenu()) {
        console.time("[DISCORDJS MODULES] Menu interaction execute time");
        const file = menus.get(interaction.customId);
        file ? file.execute(interaction) : console.log(`[DISCORDJS MODULES] Menu module not found, customId: ${interaction.customId}.`);
        console.timeEnd("[DISCORDJS MODULES] Menu interaction execute time");
    }
}
exports.default = handleMenusInteraction;
