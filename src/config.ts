import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  botToken: process.env.DISCORD_BOT_TOKEN || '',
  guildId: process.env.GUILD_ID || '',
  channelId: process.env.DISCORD_CHANNEL_ID || '',
  apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
  appId: process.env.APPLICATION_ID || '',
  botPort: parseInt(process.env.BOT_PORT || '3001', 10)
};

if (!config.botToken) {
  throw new Error('DISCORD_BOT_TOKEN is not set in .env file');
}

if (!config.guildId) {
  throw new Error('GUILD_ID is not set in .env file');
}

if (!config.appId) {
  throw new Error('APPLICATION_ID is not set in .env file');
}
