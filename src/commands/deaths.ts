import { SlashCommandBuilder, CommandInteraction, ChatInputCommandInteraction } from 'discord.js';
import { apiClient } from '../services/api';

export const data = new SlashCommandBuilder()
  .setName('deaths')
  .setDescription('Get a player\'s death count')
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
    const data = await apiClient.getPlayerDeathCount(uuid);

    const reply = `
      💀 **Death Count - ${data.name}**
      Deaths: ${data.death_count}
      🆔 UUID: \`${data.uuid}\`
      `.trim();

    await interaction.editReply(reply);
  } catch (error: any) {
    await interaction.editReply(`❌ Error: ${error.message}`);
  }
}
