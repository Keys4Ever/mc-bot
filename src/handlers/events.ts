import express, { Express, Request, Response } from 'express';
import { Client, ChannelType } from 'discord.js';
import { config } from '../config';

export function setupEventServer(client: Client): Express {
  const app = express();

  app.use(express.json());

  /**
   * POST /events/command
   * Receive command events from the Minecraft server
   */
  app.post('/events/command', (req: Request, res: Response) => {
    try {
      const { timestamp, player_uuid, command, executed } = req.body;

      if (!timestamp || typeof command !== 'string' || typeof executed !== 'boolean') {
        return res.status(400).json({ error: 'Invalid payload' });
      }

      const eventMessage = `**Command Event**\n` +
        `Timestamp: ${timestamp}\n` +
        `Player: ${player_uuid || 'Server'}\n` +
        `Command: \`${command}\`\n` +
        `Executed: ${executed}`;
      
      client.channels.fetch(config.channelId).then(ch => {
        if (ch && ch.type === ChannelType.GuildText) {
          ch.send(eventMessage).catch(err => console.error('Failed to send message:', err));
        }
      }).catch(err => console.error('Failed to fetch channel:', err));

      res.json({ success: true });
    } catch (error: any) {
      console.error('Error processing command event:', error.message);
      res.status(500).json({ error: 'Failed to process event' });
    }
  });

  /**
   * Health check
   */
  app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok' });
  });

  app.listen(config.botPort, () => {
    console.log(`🌐 Event server listening on http://localhost:${config.botPort}`);
  });

  return app;
}
