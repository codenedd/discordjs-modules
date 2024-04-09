import { ButtonInteraction, AnySelectMenuInteraction, ModalSubmitInteraction, ClientEvents, SlashCommandBuilder, ChatInputCommandInteraction, AutocompleteInteraction, Client, Collection } from 'discord.js';

interface ButtonModule {
    customId: string;
    execute: (interaction: ButtonInteraction) => Promise<unknown>;
}
interface MenuModule {
    customId: string;
    execute: (interaction: AnySelectMenuInteraction) => Promise<unknown>;
}
interface ModalModule {
    customId: string;
    execute: (interaction: ModalSubmitInteraction) => Promise<unknown>;
}
interface EventModule {
    name: keyof ClientEvents;
    once?: boolean;
    execute: (...args: any[]) => Promise<void>;
}
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

export { type ButtonModule, type CommandModule, DiscordJSModules, type EventModule, type MenuModule, type ModalModule, type ModulesClient };
