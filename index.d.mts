import { ButtonInteraction, AnySelectMenuInteraction, ModalSubmitInteraction, ClientEvents, Awaitable, SlashCommandBuilder, ContextMenuCommandBuilder, AutocompleteInteraction, Client, Collection, ChatInputCommandInteraction, ContextMenuCommandInteraction } from 'discord.js';

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
type CommandInteractionType<T> = T extends SlashCommandBuilder ? ChatInputCommandInteraction : T extends ContextMenuCommandBuilder ? ContextMenuCommandInteraction : never;
interface CommandModule<K extends SlashCommandBuilder | ContextMenuCommandBuilder> {
    data: K;
    cooldown?: number;
    execute: (interaction: CommandInteractionType<K>) => Promise<any>;
    autocomplete?(interaction: AutocompleteInteraction): Promise<any>;
}
interface ModulesClient extends Client {
    commands: Map<string, CommandModule<SlashCommandBuilder | ContextMenuCommandBuilder>>;
    cooldowns: Collection<string, Collection<string, number>>;
}
interface InitOptions {
    srcDir?: string;
}

declare const DiscordJSModules: {
    init(client: Client, token: string, options?: InitOptions): void;
};

export { type ButtonModule, type CommandModule, DiscordJSModules, type EventModule, type InitOptions, type MenuModule, type ModalModule, type ModulesClient };
