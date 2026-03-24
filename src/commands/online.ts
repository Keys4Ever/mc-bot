import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { apiClient } from '../services/api';

export const data = new SlashCommandBuilder()
  .setName('online')
  .setDescription('Get list of online players');

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply();

  try {
    const players = await apiClient.getOnlinePlayers();

    if (players.length === 0) {
      await interaction.editReply('🌙 No players online right now.');
      return;
    }

    const playerList = players
      .map((p: any) => {
        const mins = Math.floor(p.current_session_seconds / 60);
        return `• **${p.name}** (${mins}m online)`;
      })
      .join('\n');

    const reply = `
🟢 **Online Players (${players.length})**
${playerList}
    `.trim();

    await interaction.editReply(reply);
  } catch (error: any) {
    await interaction.editReply(`❌ Error: ${error.message}`);
  }
}
