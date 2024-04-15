var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// src/discordjs-modules.ts
import { Collection as Collection2, Events } from "discord.js";

// src/readers/modules-reader.ts
import path4 from "path";
import fs4 from "fs";

// src/readers/components-reader.ts
import path from "path";
import fs from "fs";
function readComponents(modules, componentsName) {
  const componentsCollection = /* @__PURE__ */ new Map();
  for (const module of modules) {
    if (module.isDirectory()) {
      const compsPath = path.join(module.path, `${module.name}/${componentsName}`);
      const isCompsDirectoryExists = fs.existsSync(compsPath);
      if (isCompsDirectoryExists) {
        const comps = fs.readdirSync(compsPath, { withFileTypes: true });
        if (comps?.length) {
          for (const component of comps) {
            if (component.name.endsWith(".ts") || component.name.endsWith(".js")) {
              const componentPath = `${compsPath}/${component.name}`;
              const compData = __require(componentPath);
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
import path2 from "path";
import fs2 from "fs";
function readEvents(modules, rootDir) {
  const eventsCollection = /* @__PURE__ */ new Map();
  const globalEventsPath = path2.join(rootDir, `/events`);
  const isGlobalEventsDirectoryExists = fs2.existsSync(globalEventsPath);
  if (isGlobalEventsDirectoryExists) {
    const globalEvents = fs2.readdirSync(globalEventsPath, { withFileTypes: true });
    if (globalEvents?.length) {
      for (const globalEvent of globalEvents) {
        if (globalEvent.name.endsWith(".ts") || globalEvent.name.endsWith(".js")) {
          const eventPath = `${globalEventsPath}/${globalEvent.name}`;
          const eventData = __require(eventPath);
          const existsEvents = eventsCollection.get("global") ?? [];
          eventsCollection.set("global", [...existsEvents, eventData]);
        }
      }
    }
  }
  for (const module of modules) {
    if (module.isDirectory()) {
      const eventsPath = path2.join(module.path, `${module.name}/events`);
      const isEventsDirectoryExists = fs2.existsSync(eventsPath);
      if (isEventsDirectoryExists) {
        const events = fs2.readdirSync(eventsPath, { withFileTypes: true });
        if (events?.length) {
          for (const event of events) {
            if (event.name.endsWith(".ts") || event.name.endsWith(".js")) {
              const eventPath = `${eventsPath}/${event.name}`;
              const eventData = __require(eventPath);
              const existsEvents = eventsCollection.get(module.name) ?? [];
              eventsCollection.set(module.name, [...existsEvents, eventData]);
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
import path3 from "path";
import fs3 from "fs";
function readCommands(modules, rootDir) {
  const commandsCollection = /* @__PURE__ */ new Map();
  const globalCommandssPath = path3.join(rootDir, `/commands`);
  const isGlobalCommandsDirectoryExists = fs3.existsSync(globalCommandssPath);
  if (isGlobalCommandsDirectoryExists) {
    const globalCommands = fs3.readdirSync(globalCommandssPath, { withFileTypes: true });
    if (globalCommands?.length) {
      for (const globalCommand of globalCommands) {
        if (globalCommand.name.endsWith(".ts") || globalCommand.name.endsWith(".js")) {
          const commandPath = `${globalCommandssPath}/${globalCommand.name}`;
          const commandData = __require(commandPath);
          if (commandsCollection.has(commandData.data.name))
            throw new Error(`Duplicated command: ${commandData.data.name}; in ${commandPath}`);
          commandsCollection.set(commandData.data.name, commandData);
        }
      }
    }
  }
  for (const module of modules) {
    if (module.isDirectory()) {
      const commandsPath = path3.join(module.path, `${module.name}/commands`);
      const isCommandsDirectoryExists = fs3.existsSync(commandsPath);
      if (isCommandsDirectoryExists) {
        const commands = fs3.readdirSync(commandsPath, { withFileTypes: true });
        if (commands?.length) {
          for (const command of commands) {
            if (command.name.endsWith(".ts") || command.name.endsWith(".js")) {
              const commandPath = `${commandsPath}/${command.name}`;
              const commandData = __require(commandPath);
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
  const modulesPath = path4.join(rootDir, "/modules");
  const modulesExists = fs4.existsSync(modulesPath);
  if (!modulesExists) {
    console.log("\x1B[33m%s\x1B[0m", `Modules directory not found. Creating in ${modulesPath}....`);
    fs4.mkdirSync(modulesPath);
  }
  const modules = fs4.readdirSync(modulesPath, { withFileTypes: true });
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
import { Collection } from "discord.js";
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
      cooldowns.set(command.data.name, new Collection());
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
import { REST, Routes } from "discord.js";
async function synchronizeSlashCommands(client, token, commands) {
  const rest = new REST({ version: "10" }).setToken(token);
  const commandsData = [...commands.values()].map((cmd) => cmd.data.toJSON());
  await (async () => {
    try {
      if (client.user) {
        console.log("\x1B[35m%s\x1B[0m", `Started refreshing ${commandsData.length} application slash commands.`);
        await rest.put(Routes.applicationCommands(client.user.id), { body: commandsData });
        console.log("\x1B[35m%s\x1B[0m", `Successfully reloaded ${commandsData.length} application slash commands.`);
      }
    } catch (error) {
      console.error(error);
    }
  })();
}

// src/interactions/events-interactions.ts
function handleEvents(client, events) {
  console.log("\x1B[33m%s\x1B[0m", "--------------------------------------------------");
  console.log("\x1B[33m%s\x1B[0m", "------------- Creating client events -------------");
  for (const [moduleName, eventArr] of events) {
    console.log("\x1B[33m%s\x1B[0m", `--------- ${moduleName} events ---------`);
    for (const event of eventArr) {
      event.once ? client.once(event.name, (...args) => event.execute(...args)) : client.on(event.name, (...args) => event.execute(...args));
      console.log("\x1B[35m%s\x1B[0m", `Created ${event.name} event.`);
    }
  }
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
    moduleClient.cooldowns = new Collection2();
    client.once(Events.ClientReady, (client2) => {
      console.log("\x1B[33m%s\x1B[0m", "--------------------------------------------------");
      console.log("\x1B[33m%s\x1B[0m", "--- Synchronizing slash commands on the server ---");
      synchronizeSlashCommands(client2, token, modules.commands).then(() => {
        console.log("\x1B[33m%s\x1B[0m", "--------------------------------------------------");
        console.log("\x1B[33m%s\x1B[0m", "------- Everything done and ready to work! -------");
      });
    });
    client.on(Events.InteractionCreate, async (interaction) => {
      try {
        await handleCommandsInteraction(moduleClient, interaction, modules.commands);
        handleButtonsInteraction(interaction, modules.buttons);
        handleMenusInteraction(interaction, modules.menus);
        handleModalsInteraction(interaction, modules.modals);
      } catch (err) {
        console.log(err);
      }
    });
    handleEvents(client, modules.events);
  }
};
export {
  DiscordJSModules
};
