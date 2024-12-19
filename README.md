# discordjs-modules

Discord.js modules handler that **allows you handle all discord components (like menus, modals and buttons), events and commands in one module directory**. You can easily add new features or remove old ones, just add or remove a module (folder) from the modules directory.

## Installation

via npm

```
npm i discordjs-modules
```

via yarn

```
yarn add discordjs-modules
```

## Getting Started

Import the handler initialization function into the main `index.ts` file

```javascript
// index.ts

import { DiscordJSModules } from "discordjs-modules";
import { Client, GatewayIntentBits, Partials, Collection } from "discord.js";
import config from "./config.json";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages],
});

DiscordJSModules.init(client, config.token, { srcDir: __dirname });

client.login(config.token);
```

After starting the bot, the handler will create a new `modules` directory in the root folder. There you can create your own module as shown below:

```
├───node_modules
├───src
│    ├───index.ts
│    ├───modules <-- this folder will be created automatically
│    │   └───myFirstModule <-- this is a module created by you, name it whatever you want
│    │       ├───commands <-- this is commands directory, must always be named 'commands'
│    │       │   └───ban.ts (command file)
│    │       ├───buttons <-- this is buttons directory, must always be named 'buttons'
│    │       │   └───submit.ts (button file)
│    │       ├───modals <-- this is modals directory, must always be named 'modals'
│    │       │   └───form.ts (modal file)
│    │       ├───events <-- this is events directory, must always be named 'events'
│    │       │   └───messageCreate.ts (event file)
│    │       └───menus <-- this is menus directory, must always be named 'menus'
│    │           └───select-user.ts (menu file)
│    └───utils
│        └───discord
├───package.json
├───package-lock.json
├───config.json
```

> [!IMPORTANT]  
> **Remember!** You must always use the correct directory names:  
> `/commands` for commands files  
> `/events` for events files  
> `/buttons` for buttons files  
> `/menus` for menus files  
> `/modals` for modal files

## Structure of handler components files

Each component requires an appropriate structure of the exported object to work:

`/commands/ban.ts`

```javascript
import { SlashCommandBuilder } from "discord.js";
import { CommandModule } from "discordjs-modules";

module.exports = <CommandModule<SlashCommandBuilder>>{
  data: new SlashCommandBuilder().setName("ban").setDescription("Ban user"),
  cooldown: 5, // (optional cooldown in seconds)
  async autocomplete(interaction) { // (optional)
    // your code to execute when autocomplete option is set to true
  },
  execute(interaction) {
    // your code to execute
  },
};

```

`/events/messageCreate.ts`

```javascript
import { Events } from "discord.js";
import { EventModule } from "discordjs-modules";

module.exports = <EventModule<Events.MessageCreate>>{
  name: Events.MessageCreate,
  async execute(message) {
    // your code to execute
  },
};
```

`/buttons/submit.ts`

> [!NOTE]  
> **Buttons**, **menus** and **modals** have the same file structure.

```javascript
import { ButtonModule } from "discordjs-modules";
// or import { MenuModule } from "discordjs-modules"; if its menu file
// or import { ModalModule } from "discordjs-modules"; if its modal file

module.exports = <ButtonModule>{
  customId: "submit",
  async execute(interaction) {
    // your code to execute
  },
};

```

## Global events and commands

The handler allows you to create global events and commands that do not need to be assigned to any module. All you need to do is create a `commands` or `events` folder in the project's root directory. The files structure is the same as in the modules.

```
├───node_modules
├───src
│    ├───index.ts
│    ├───commands <-- global commands here
│    │   └───globalCommand.ts
│    ├───events <-- global events here
│    │   └───guildMemberAdd.ts
│    ├───modules <-- this folder will be created automatically
│    │   └───myFirstModule <-- this is a module created by you, name it whatever you want
│    │       ├───commands <-- this is commands directory, must always be named 'commands'
│    │       │   └───ban.ts (command file)
│    │       ├───buttons <-- this is buttons directory, must always be named 'buttons'
│    │       │   └───submit.ts (button file)
│    │       ├───modals <-- this is modals directory, must always be named 'modals'
│    │       │   └───form.ts (modal file)
│    │       ├───events <-- this is events directory, must always be named 'events'
│    │       │   └───messageCreate.ts (event file)
│    │       └───menus <-- this is menus directory, must always be named 'menus'
│    │           └───select-user.ts (menu file)
│    └───utils
│        └───discord
├───package.json
├───package-lock.json
├───config.json
```
