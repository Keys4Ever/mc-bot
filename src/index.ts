import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { config } from './config';
import { loadCommands, handleCommand } from './handlers/commands';
import { setupEventServer } from './handlers/events';

declare module 'discord.js' {
  interface Client {
    commands: Collection<any, any>;
  }
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.commands = new Collection();

client.once('ready', () => {
  console.log(`✅ Bot logged in as ${client.user?.tag}`);
});

client.on('interactionCreate', async (interaction: any) => {
  await handleCommand(interaction);
});

async function start() {
  try {
    console.log('🚀 Starting bot...');
    await loadCommands(client);
    setupEventServer(client);
    await client.login(config.botToken);
  } catch (error) {
    console.error('Failed to start bot:', error);
    process.exit(1);
  }
}

start();
