import axios, { AxiosInstance } from 'axios';
import { config } from '../config';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.apiBaseUrl,
      timeout: 5000
    });
  }

  /**
   * GET /players/:uuid
   * Get player info (name, death count, playtime)
   */
  async getPlayer(uuid: string) {
    try {
      const response = await this.client.get(`/players/${uuid}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Player not found');
      }
      throw new Error(`Failed to fetch player: ${error}`);
    }
  }

  /**
   * GET /players/:uuid/playtime
   * Get player playtime
   */
  async getPlayerPlaytime(uuid: string) {
    try {
      const response = await this.client.get(`/players/${uuid}/playtime`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Player not found');
      }
      throw new Error(`Failed to fetch playtime: ${error}`);
    }
  }

  /**
   * GET /players/:uuid/deathcount
   * Get player death count
   */
  async getPlayerDeathCount(uuid: string) {
    try {
      const response = await this.client.get(`/players/${uuid}/deathcount`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Player not found');
      }
      throw new Error(`Failed to fetch death count: ${error}`);
    }
  }

  /**
   * GET /online-players
   * Get list of online players
   */
  async getOnlinePlayers() {
    try {
      const response = await this.client.get('/online-players');
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to fetch online players: ${error}`);
    }
  }

  /**
   * GET /daily
   * Get daily stats
   */
  async getDailyStats() {
    try {
      const response = await this.client.get('/daily');
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to fetch daily stats: ${error}`);
    }
  }
}

export const apiClient = new ApiClient();
