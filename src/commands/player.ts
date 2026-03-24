import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { apiClient } from '../services/api';

export const data = new SlashCommandBuilder()
  .setName('player')
  .setDescription('Get complete player info')
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
    const data = await apiClient.getPlayer(uuid);

    const hours = Math.floor(data.playtime_seconds / 3600);
    const minutes = Math.floor((data.playtime_seconds % 3600) / 60);

    const reply = `
👤 **Player Info - ${data.name}**
🆔 UUID: \`${data.uuid}\`
⏱️ Playtime: ${hours}h ${minutes}m
💀 Deaths: ${data.death_count}
    `.trim();

    await interaction.editReply(reply);
  } catch (error: any) {
    await interaction.editReply(`❌ Error: ${error.message}`);
  }
}
