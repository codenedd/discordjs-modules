"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  DiscordJSModules: () => DiscordJSModules
});
module.exports = __toCommonJS(src_exports);

// src/discordjs-modules.ts
var import_discord3 = require("discord.js");

// src/readers/modules-reader.ts
var import_path4 = __toESM(require("path"));
var import_fs4 = __toESM(require("fs"));

// src/readers/components-reader.ts
var import_path = __toESM(require("path"));
var import_fs = __toESM(require("fs"));
function readComponents(modules, componentsName) {
  const componentsCollection = /* @__PURE__ */ new Map();
  for (const module2 of modules) {
    if (module2.isDirectory()) {
      const compsPath = import_path.default.join(module2.path, `${module2.name}/${componentsName}`);
      const isCompsDirectoryExists = import_fs.default.existsSync(compsPath);
      if (isCompsDirectoryExists) {
        const comps = import_fs.default.readdirSync(compsPath, { withFileTypes: true });
        if (comps?.length) {
          for (const component of comps) {
            if (component.name.endsWith(".ts") || component.name.endsWith(".js")) {
              const componentPath = `${compsPath}/${component.name}`;
              const compData = require(componentPath);
              if (componentsCollection.has(compData.customId))
                throw new Error(`CustomId: ${compData.customId} is duplicated! Path: ${componentPath}`);
              componentsCollection.set(compData.customId, compData);
            }
          }
        }
      }
    }
  }
  if (componentsCollection.size)
    console.log("\x1B[35m%s\x1B[0m", `Loaded ${componentsCollection.size} ${componentsName} files from ${modules.length} modules.`);
  return componentsCollection;
}

// src/readers/events-reader.ts
var import_path2 = __toESM(require("path"));
var import_fs2 = __toESM(require("fs"));
function readEvents(modules, rootDir) {
  const eventsCollection = /* @__PURE__ */ new Map();
  const globalEventsPath = import_path2.default.join(rootDir, `/events`);
  const isGlobalEventsDirectoryExists = import_fs2.default.existsSync(globalEventsPath);
  if (isGlobalEventsDirectoryExists) {
    const globalEvents = import_fs2.default.readdirSync(globalEventsPath, { withFileTypes: true });
    if (globalEvents?.length) {
      for (const globalEvent of globalEvents) {
        if (globalEvent.name.endsWith(".ts") || globalEvent.name.endsWith(".js")) {
          const eventPath = `${globalEventsPath}/${globalEvent.name}`;
          const eventData = require(eventPath);
          eventsCollection.set("global", eventData);
        }
      }
    }
  }
  for (const module2 of modules) {
    if (module2.isDirectory()) {
      const eventsPath = import_path2.default.join(module2.path, `${module2.name}/events`);
      const isEventsDirectoryExists = import_fs2.default.existsSync(eventsPath);
      if (isEventsDirectoryExists) {
        const events = import_fs2.default.readdirSync(eventsPath, { withFileTypes: true });
        if (events?.length) {
          for (const event of events) {
            if (event.name.endsWith(".ts") || event.name.endsWith(".js")) {
              const eventPath = `${eventsPath}/${event.name}`;
              const eventData = require(eventPath);
              eventsCollection.set(`${module2.name}-event-${event.name}`, eventData);
            }
          }
        }
      }
    }
  }
  if (eventsCollection.size)
    console.log("\x1B[35m%s\x1B[0m", `Loaded ${eventsCollection.size} events files.`);
  return eventsCollection;
}

// src/readers/commands-reader.ts
var import_path3 = __toESM(require("path"));
var import_fs3 = __toESM(require("fs"));
function readCommands(modules, rootDir) {
  const commandsCollection = /* @__PURE__ */ new Map();
  const globalCommandssPath = import_path3.default.join(rootDir, `/commands`);
  const isGlobalCommandsDirectoryExists = import_fs3.default.existsSync(globalCommandssPath);
  if (isGlobalCommandsDirectoryExists) {
    const globalCommands = import_fs3.default.readdirSync(globalCommandssPath, { withFileTypes: true });
    if (globalCommands?.length) {
      for (const globalCommand of globalCommands) {
        if (globalCommand.name.endsWith(".ts") || globalCommand.name.endsWith(".js")) {
          const commandPath = `${globalCommandssPath}/${globalCommand.name}`;
          const commandData = require(commandPath);
          if (commandsCollection.has(commandData.data.name))
            throw new Error(`Duplicated command: ${commandData.data.name}; in ${commandPath}`);
          commandsCollection.set(commandData.data.name, commandData);
        }
      }
    }
  }
  for (const module2 of modules) {
    if (module2.isDirectory()) {
      const commandsPath = import_path3.default.join(module2.path, `${module2.name}/commands`);
      const isCommandsDirectoryExists = import_fs3.default.existsSync(commandsPath);
      if (isCommandsDirectoryExists) {
        const commands = import_fs3.default.readdirSync(commandsPath, { withFileTypes: true });
        if (commands?.length) {
          for (const command of commands) {
            if (command.name.endsWith(".ts") || command.name.endsWith(".js")) {
              const commandPath = `${commandsPath}/${command.name}`;
              const commandData = require(commandPath);
              if (commandsCollection.has(commandData.data.name))
                throw new Error(`Duplicated command: ${commandData.data.name}; in ${commandPath}`);
              commandsCollection.set(commandData.data.name, commandData);
            }
          }
        }
      }
    }
  }
  if (commandsCollection.size)
    console.log("\x1B[35m%s\x1B[0m", `Loaded ${commandsCollection.size} commands files.`);
  return commandsCollection;
}

// src/readers/modules-reader.ts
function readModules(options) {
  const rootDir = options?.srcDir ? options.srcDir : process.cwd();
  const modulesPath = import_path4.default.join(rootDir, "/modules");
  const modulesExists = import_fs4.default.existsSync(modulesPath);
  if (!modulesExists) {
    console.log("\x1B[33m%s\x1B[0m", `Modules directory not found. Creating in ${modulesPath}....`);
    import_fs4.default.mkdirSync(modulesPath);
  }
  const modules = import_fs4.default.readdirSync(modulesPath, { withFileTypes: true });
  console.log("\x1B[33m%s\x1B[0m", "------------ Loading modules files... ------------");
  const buttons = readComponents(modules, "buttons");
  const menus = readComponents(modules, "menus");
  const modals = readComponents(modules, "modals");
  const events = readEvents(modules, rootDir);
  const commands = readCommands(modules, rootDir);
  return { commands, events, buttons, menus, modals };
}

// src/interactions/buttons-interactions.ts
function handleButtonsInteraction(interaction, buttons) {
  if (interaction.isButton()) {
    console.time("[DISCORDJS MODULES] Button interaction execute time");
    const file = buttons.get(interaction.customId);
    file ? file.execute(interaction) : console.log(`[DISCORDJS MODULES] Button module not found, customId: ${interaction.customId}.`);
    console.timeEnd("[DISCORDJS MODULES] Button interaction execute time");
  }
}

// src/interactions/menus-interactions.ts
function handleMenusInteraction(interaction, menus) {
  if (interaction.isAnySelectMenu()) {
    console.time("[DISCORDJS MODULES] Menu interaction execute time");
    const file = menus.get(interaction.customId);
    file ? file.execute(interaction) : console.log(`[DISCORDJS MODULES] Menu module not found, customId: ${interaction.customId}.`);
    console.timeEnd("[DISCORDJS MODULES] Menu interaction execute time");
  }
}

// src/interactions/modals-interactions.ts
function handleModalsInteraction(interaction, modals) {
  if (interaction.isModalSubmit()) {
    console.time("[DISCORDJS MODULES] Modal interaction execute time");
    const file = modals.get(interaction.customId);
    file ? file.execute(interaction) : console.log(`[DISCORDJS MODULES] Modal module not found, customId: ${interaction.customId}.`);
    console.timeEnd("[DISCORDJS MODULES] Modal interaction execute time");
  }
}

// src/interactions/commands-interactions.ts
var import_discord = require("discord.js");
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
      cooldowns.set(command.data.name, new import_discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name);
    const defaultCooldownDuration = 5;
    const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1e3;
    if (timestamps && timestamps.has(interaction.user.id)) {
      const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
      if (now < expirationTime) {
        const expiredTimestamp = Math.round(expirationTime / 1e3);
        return interaction.reply({ content: `The next use of this command will be possible <t:${expiredTimestamp}:R>.`, ephemeral: true });
      }
    }
    timestamps?.set(interaction.user.id, now);
    setTimeout(() => timestamps?.delete(interaction.user.id), cooldownAmount);
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: "An error occurred while executing this command!", ephemeral: true });
    }
  } else if (interaction.isAutocomplete()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }
    try {
      if (command.autocomplete)
        await command.autocomplete(interaction);
    } catch (error) {
      console.error(error);
    }
    console.timeEnd("[DISCORDJS MODULES] Command interaction execute time");
  }
}

// src/api/synchronize-commands.ts
var import_discord2 = require("discord.js");
async function synchronizeSlashCommands(client, token, commands) {
  const rest = new import_discord2.REST({ version: "10" }).setToken(token);
  const commandsData = [...commands.values()].map((cmd) => cmd.data.toJSON());
  await (async () => {
    try {
      if (client.user) {
        console.log("\x1B[35m%s\x1B[0m", `Started refreshing ${commandsData.length} application slash commands.`);
        await rest.put(import_discord2.Routes.applicationCommands(client.user.id), { body: commandsData });
        console.log("\x1B[35m%s\x1B[0m", `Successfully reloaded ${commandsData.length} application slash commands.`);
      }
    } catch (error) {
      console.error(error);
    }
  })();
}

// src/discordjs-modules.ts
var DiscordJSModules = {
  init(client, token, options) {
    const moduleClient = client;
    console.log("\x1B[33m%s\x1B[0m", "--------------------------------------------------");
    console.log("\x1B[33m%s\x1B[0m", "-------- DiscordJS Modules Initialization... -----");
    console.log("\x1B[33m%s\x1B[0m", "--------------------------------------------------");
    const modules = readModules(options);
    moduleClient.commands = modules.commands;
    moduleClient.cooldowns = new import_discord3.Collection();
    client.once(import_discord3.Events.ClientReady, (client2) => {
      console.log("\x1B[33m%s\x1B[0m", "--------------------------------------------------");
      console.log("\x1B[33m%s\x1B[0m", "--- Synchronizing slash commands on the server ---");
      synchronizeSlashCommands(client2, token, modules.commands).then(() => {
        console.log("\x1B[33m%s\x1B[0m", "--------------------------------------------------");
        console.log("\x1B[33m%s\x1B[0m", "------- Everything done and ready to work! -------");
      });
    });
    client.on(import_discord3.Events.InteractionCreate, async (interaction) => {
      try {
        await handleCommandsInteraction(moduleClient, interaction, modules.commands);
        handleButtonsInteraction(interaction, modules.buttons);
        handleMenusInteraction(interaction, modules.menus);
        handleModalsInteraction(interaction, modules.modals);
      } catch (err) {
        console.log(err);
      }
    });
    console.log("\x1B[33m%s\x1B[0m", "--------------------------------------------------");
    console.log("\x1B[33m%s\x1B[0m", "------------- Creating client events -------------");
    for (const [eventName, eventModule] of modules.events) {
      eventModule.once ? client.once(eventModule.name, (...args) => eventModule.execute(...args)) : client.on(eventModule.name, (...args) => eventModule.execute(...args));
      console.log("\x1B[35m%s\x1B[0m", `Created ${eventModule.name} event from ${eventName} module.`);
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DiscordJSModules
});
