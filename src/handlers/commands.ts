import { Collection, Client } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

// Extend Discord Client to include commands collection
declare module 'discord.js' {
  interface Client {
    commands: Collection<any, any>;
  }
}

export async function loadCommands(client: Client) {
  const commands = new Collection();
  const commandsPath = join(__dirname, '../commands');
  const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const command = await import(filePath);

    if ('data' in command && 'execute' in command) {
      commands.set(command.data.name, command);
    }
  }

  client.commands = commands;
  console.log(`✅ Loaded ${commands.size} commands`);
}

export async function handleCommand(interaction: any) {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands?.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!' });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!' });
    }
  }
}
