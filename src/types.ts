/**
 * Types for Discord Bot
 */

export interface MinecraftPlayer {
  uuid: string;
  name: string;
  playtime_seconds: number;
  death_count: number;
}

export interface OnlinePlayer {
  uuid: string;
  name: string;
  current_session_seconds: number;
}

export interface DailyStats {
  uuid: string;
  name: string;
  playtime_seconds: number;
  death_count: number;
}

export interface CommandEvent {
  timestamp: string;
  player_uuid: string | null;
  command: string;
  executed: boolean;
}
