"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function readComponents(modules, componentsName) {
    const componentsCollection = new Map();
    for (const module of modules) {
        if (module.isDirectory()) {
            const compsPath = path_1.default.join(module.path, `${module.name}/${componentsName}`);
            const isCompsDirectoryExists = fs_1.default.existsSync(compsPath);
            if (isCompsDirectoryExists) {
                const comps = fs_1.default.readdirSync(compsPath, { withFileTypes: true });
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
        console.log("\x1b[35m%s\x1b[0m", `Loaded ${componentsCollection.size} ${componentsName} files from ${modules.length} modules.`);
    return componentsCollection;
}
exports.default = readComponents;
