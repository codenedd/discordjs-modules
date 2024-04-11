import { ButtonInteraction, AnySelectMenuInteraction, ModalSubmitInteraction, ClientEvents, Awaitable, SlashCommandBuilder, ChatInputCommandInteraction, AutocompleteInteraction, Client, Collection } from 'discord.js';

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
interface EventModule<E extends keyof ClientEvents> {
    name: E;
    once?: boolean;
    execute: (...args: ClientEvents[E]) => Awaitable<void>;
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
interface InitOptions {
    srcDir?: string;
}

declare const DiscordJSModules: {
    init(client: Client, token: string, options?: InitOptions): void;
};

export { type ButtonModule, type CommandModule, DiscordJSModules, type EventModule, type InitOptions, type MenuModule, type ModalModule, type ModulesClient };
