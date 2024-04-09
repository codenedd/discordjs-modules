import { Client, Collection, SlashCommandBuilder, ChatInputCommandInteraction, AutocompleteInteraction } from 'discord.js';

interface CommandModule {
    data: SlashCommandBuilder;
    cooldown?: number;
    execute: (interaction: ChatInputCommandInteraction) => Promise<any>;
    autocomplete?(interaction: AutocompleteInteraction): Promise<any>;
}
interface ModulesClient extends Client {
    commands: Map<string, CommandModule>;
    cooldowns: Collection<string, Collection<string, number>>;
}

declare const DiscordJSModules: {
    init(client: ModulesClient, token: string): void;
};

export { DiscordJSModules as default };
