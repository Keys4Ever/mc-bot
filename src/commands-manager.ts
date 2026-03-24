import { Collection } from 'discord.js';

export const commandsManager = {
  commands: new Collection<string, any>(),

  set(commands: Collection<string, any>) {
    this.commands = commands;
  },

  get(name: string) {
    return this.commands.get(name);
  },

  size() {
    return this.commands.size;
  }
};
