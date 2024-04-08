import {
  ButtonInteraction,
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
  SlashCommandBuilder,
  AutocompleteInteraction,
  AnySelectMenuInteraction,
  ClientEvents,
  Client,
  Collection,
} from "discord.js";

export interface ButtonModule {
  customId: string;
  execute: (interaction: ButtonInteraction) => Promise<unknown>;
}

export interface MenuModule {
  customId: string;
  execute: (interaction: AnySelectMenuInteraction) => Promise<unknown>;
}

export interface ModalModule {
  customId: string;
  execute: (interaction: ModalSubmitInteraction) => Promise<unknown>;
}

export interface EventModule {
  name: keyof ClientEvents;
  once?: boolean;
  execute: (...args: any[]) => Promise<void>;
}

export interface CommandModule {
  data: SlashCommandBuilder;
  cooldown?: number;
  execute: (interaction: ChatInputCommandInteraction) => Promise<any>;
  autocomplete?(interaction: AutocompleteInteraction): Promise<any>;
}

export interface ModulesClient extends Client {
  commands: Map<string, CommandModule>;
  cooldowns: Collection<string, Collection<string, number>>;
}
