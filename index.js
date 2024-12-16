"use strict";var R=Object.create;var x=Object.defineProperty;var F=Object.getOwnPropertyDescriptor;var L=Object.getOwnPropertyNames;var q=Object.getPrototypeOf,G=Object.prototype.hasOwnProperty;var K=(o,t)=>{for(var e in t)x(o,e,{get:t[e],enumerable:!0})},A=(o,t,e,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of L(t))!G.call(o,n)&&n!==e&&x(o,n,{get:()=>t[n],enumerable:!(s=F(t,n))||s.enumerable});return o};var u=(o,t,e)=>(e=o!=null?R(q(o)):{},A(t||!o||!o.__esModule?x(e,"default",{value:o,enumerable:!0}):e,o)),J=o=>A(x({},"__esModule",{value:!0}),o);var H={};K(H,{DiscordJSModules:()=>Y});module.exports=J(H);var h=require("discord.js");var k=u(require("path")),y=u(require("fs"));var O=u(require("path")),E=u(require("fs"));var j={red:"\x1B[31m%s\x1B[0m",yellow:"\x1B[33m%s\x1B[0m",green:"\x1B[32m%s\x1B[0m",blue:"\x1B[34m%s\x1B[0m",orange:"\x1B[38;5;208m%s\x1B[0m"};function r(o,t){console.log(t?j[t]:j.yellow,`[DISCORDJS MODULES] --> ${o}`)}async function p(o,t){let e=new Map;for(let s of o)if(s.isDirectory()){let n=O.default.join(s.path,`${s.name}/${t}`);if(E.default.existsSync(n)){let a=E.default.readdirSync(n,{withFileTypes:!0});if(a?.length){for(let d of a)if(d.name.endsWith(".ts")||d.name.endsWith(".js")){let i=`${n}/${d.name}`,l=await require(i);if(e.has(l.customId))throw new Error(`CustomId: ${l.customId} is duplicated! Path: ${i}`);e.set(l.customId,l)}}}}return e.size&&r(`Loaded ${e.size} ${t} files from ${o.length} modules.`,"blue"),e}var w=u(require("path")),C=u(require("fs"));async function I(o,t){let e=new Map,s=w.default.join(t,"events");if(C.default.existsSync(s)){let m=C.default.readdirSync(s,{withFileTypes:!0});if(m?.length){for(let a of m)if(a.name.endsWith(".ts")||a.name.endsWith(".js")){let d=`${s}/${a.name}`,i=await require(d),l=e.get("global")??[];e.set("global",[...l,i])}}}for(let m of o)if(m.isDirectory()){let a=w.default.join(m.path,`${m.name}/events`);if(C.default.existsSync(a)){let i=C.default.readdirSync(a,{withFileTypes:!0});if(i?.length){for(let l of i)if(l.name.endsWith(".ts")||l.name.endsWith(".js")){let g=`${a}/${l.name}`,f=await require(g),z=e.get(m.name)??[];e.set(m.name,[...z,f])}}}}return e.size&&r(`Loaded ${e.size} events files.`,"blue"),e}var b=u(require("path")),M=u(require("fs"));async function $(o,t){let e=new Map,s=b.default.join(t,"commands");if(M.default.existsSync(s)){let m=M.default.readdirSync(s,{withFileTypes:!0});if(m?.length){for(let a of m)if(a.name.endsWith(".ts")||a.name.endsWith(".js")){let d=`${s}/${a.name}`,i=await require(d);if(e.has(i.data.name))throw new Error(`Duplicated command: ${i.data.name}; in ${d}`);e.set(i.data.name,i)}}}for(let m of o)if(m.isDirectory()){let a=b.default.join(m.path,`${m.name}/commands`);if(M.default.existsSync(a)){let i=M.default.readdirSync(a,{withFileTypes:!0});if(i?.length){for(let l of i)if(l.name.endsWith(".ts")||l.name.endsWith(".js")){let g=`${a}/${l.name}`,f=await require(g);if(e.has(f.data.name))throw new Error(`Duplicated command: ${f.data.name}; in ${g}`);e.set(f.data.name,f)}}}}return e.size&&r(`Loaded ${e.size} commands files.`,"blue"),e}async function S(o){let t=o?.srcDir?o.srcDir:process.cwd(),e=k.default.join(t,"/modules");y.default.existsSync(e)||(r(`Modules directory not found. Creating in ${e}....`,"orange"),y.default.mkdirSync(e));let n=y.default.readdirSync(e,{withFileTypes:!0});r("Loading modules files...");let m=await p(n,"buttons"),a=await p(n,"menus"),d=await p(n,"modals"),i=await I(n,t);return{commands:await $(n,t),events:i,buttons:m,menus:a,modals:d}}var N=require("discord.js");function D(o,t){if(t.isChatInputCommand()||t.isContextMenuCommand()){let e=o.commands.get(t.commandName);if(!e){r(`No command matching ${t.commandName} was found.`,"red");return}let{cooldowns:s}=o;s.has(e.data.name)||s.set(e.data.name,new N.Collection);let n=Date.now(),m=s.get(e.data.name),d=(e.cooldown??5)*1e3;if(m&&m.has(t.user.id)){let i=m.get(t.user.id)+d;if(n<i){let l=Math.round(i/1e3);return t.reply({content:`The next use of this command will be possible <t:${l}:R>.`,ephemeral:!0})}}m?.set(t.user.id,n),setTimeout(()=>m?.delete(t.user.id),d);try{e.execute(t)}catch(i){console.error(i),t.reply({content:"An error occurred while executing this command!",ephemeral:!0})}}else if(t.isAutocomplete()){let e=o.commands.get(t.commandName);if(!e){r(`No command matching ${t.commandName} was found.`,"red");return}try{e.autocomplete&&e.autocomplete(t)}catch(s){console.error(s)}}}var v=require("discord.js");async function B(o,t,e){let s=new v.REST({version:"10"}).setToken(t),n=[...e.values()].map(m=>m.data.toJSON());await(async()=>{try{o.user&&(r(`Started refreshing ${n.length} application slash commands...`,"blue"),await s.put(v.Routes.applicationCommands(o.user.id),{body:n}),r(`Successfully reloaded ${n.length} application slash commands.`,"blue"))}catch(m){console.error(m)}})()}var W=require("discord.js");async function T(o,t){r("Creating client events...");let e=[];for(let[s,n]of t)r(`Loaded ${n.length} ${s} events.`,"blue"),e.push(...n);for(let s of Object.values(W.Events)){let n=e.filter(m=>m.name==s);if(n.length){let m=s;r(`Found ${n.length} functions of ${m} event.`,"blue"),n.some(a=>a.once)&&o.once(m,(...a)=>{for(let d of n)d.once&&d.execute(...a)}),n.some(a=>!a.once)&&o.on(m,(...a)=>{for(let d of n)d.once||d.execute(...a)})}}}function P(o,t){if(o.isButton()){let e=process.hrtime(),s=t.buttons.get(o.customId);s?s.execute(o):r(`Button module not found, customId: ${o.customId}.`,"red");let n=process.hrtime(e);r(`Button '${o.customId}' execution time: ${(n[0]*1e9+n[1])/1e6} ms`,"orange")}if(o.isAnySelectMenu()){let e=process.hrtime(),s=t.menus.get(o.customId);s?s.execute(o):r(`Menu module not found, customId: ${o.customId}.`,"red");let n=process.hrtime(e);r(`Menu '${o.customId}' execution time: ${(n[0]*1e9+n[1])/1e6} ms`,"orange")}if(o.isModalSubmit()){let e=process.hrtime(),s=t.modals.get(o.customId);s?s.execute(o):r(`Modal module not found, customId: ${o.customId}.`,"red");let n=process.hrtime(e);r(`Modal '${o.customId}' execution time: ${(n[0]*1e9+n[1])/1e6} ms`,"orange")}}var Y={async init(o,t,e){let s=o;r("Initialization...","green");let n=await S(e);s.commands=n.commands,s.cooldowns=new h.Collection,o.on(h.Events.InteractionCreate,async m=>{try{D(s,m),P(m,n)}catch(a){console.log(a)}}),await T(o,n.events),o.once(h.Events.ClientReady,m=>{r("Synchronizing slash commands on the server..."),B(m,t,n.commands).then(()=>r("EVERYTHING DONE AND READY TO WORK!","green")).catch(a=>console.log(a))})}};0&&(module.exports={DiscordJSModules});
