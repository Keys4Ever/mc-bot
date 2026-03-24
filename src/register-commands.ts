import { REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { config } from './config';

async function registerCommands() {
  const commands: any[] = [];
  const commandsPath = join(__dirname, 'commands');
  const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const command = await import(filePath);

    if ('data' in command) {
      commands.push(command.data.toJSON());
    }
  }

  const rest = new REST().setToken(config.botToken);

  try {
    console.log(`🔄 Started registering ${commands.length} application (/) commands.`);

    const data = await rest.put(
      Routes.applicationGuildCommands(config.appId, config.guildId),
      { body: commands }
    );

    console.log(`✅ Successfully registered ${(data as any).length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
}

registerCommands();
