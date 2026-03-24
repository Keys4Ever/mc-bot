import { SlashCommandBuilder, CommandInteraction } from 'discord.js';
import { apiClient } from '../services/api';

export const data = new SlashCommandBuilder()
  .setName('daily')
  .setDescription('Get daily stats for all players');

export async function execute(interaction: CommandInteraction) {
  await interaction.deferReply();

  try {
    const stats = await apiClient.getDailyStats();

    if (stats.length === 0) {
      await interaction.editReply('📊 No data for today yet.');
      return;
    }

    const statLines = stats
      .slice(0, 10)
      .map((s: any) => {
        const nameMap: any = {};
        const hours = Math.floor(s.playtime_seconds / 3600);
        const mins = Math.floor((s.playtime_seconds % 3600) / 60);
        return `• **${nameMap[s.uuid] || s.uuid}** - ${hours}h ${mins}m | Deaths: ${s.death_count}`;
      })
      .join('\n');

    const reply = `
📊 **Daily Stats (Today)**
${statLines}
${stats.length > 10 ? `\n... and ${stats.length - 10} more players` : ''}
    `.trim();

    await interaction.editReply(reply);
  } catch (error: any) {
    await interaction.editReply(`❌ Error: ${error.message}`);
  }
}
