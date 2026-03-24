import { SlashCommandBuilder, CommandInteraction, ChatInputCommandInteraction } from 'discord.js';
import { apiClient } from '../services/api';

export const data = new SlashCommandBuilder()
  .setName('playtime')
  .setDescription('Get a player\'s total playtime')
  .addStringOption(option =>
    option
      .setName('username')
      .setDescription('Player UUID or name')
      .setRequired(true)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply();

  try {
    const uuid = interaction.options.getString('username') || '';
    const data = await apiClient.getPlayerPlaytime(uuid);

    const hours = Math.floor(data.playtime_seconds / 3600);
    const minutes = Math.floor((data.playtime_seconds % 3600) / 60);
    const seconds = data.playtime_seconds % 60;

    const reply = `
📊 **Playtime - ${data.name}**
⏱️ Total: ${hours}h ${minutes}m ${seconds}s
🆔 UUID: \`${data.uuid}\`
    `.trim();

    await interaction.editReply(reply);
  } catch (error: any) {
    await interaction.editReply(`❌ Error: ${error.message}`);
  }
}
