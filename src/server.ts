// Polyfill a minimal global 'window' for Node.js (do this before any other imports)
const _window = {
  location: {
    protocol: 'http:',
    hostname: 'localhost',
    port: '10101',
    href: 'http://localhost:10101/',
  },
};

if (typeof global.window === 'undefined') {
  global.window = _window as unknown as Window & typeof globalThis;
}

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { exec } from 'child_process';
import { promisify } from 'util';
import axios from 'axios';
import * as path from 'path';
import * as os from 'os';

const execAsync = promisify(exec);
const API_BASE_URL = 'http://127.0.0.1:10101'; // AivisSpeechのデフォルトAPIポート

interface AudioQueryParams {
  text: string;
  speaker: number;
}

interface SynthesisParams {
  speaker: number;
  query: any; // AudioQueryオブジェクト
}

interface SpeakRequestParams {
  text: string;
  language: string;
  speaker_id: number;
  model_id: number;
  assist_text_weight: number;
  auto_split: boolean;
  length: number;
  noise: number;
  noisew: number;
  sd_ratio: number;
  split_interval: number;
  style: string;
  style_weight: number;
}

class AivisSpeechTTSServer {
  private mcp: McpServer;

  constructor() {
    this.mcp = new McpServer({
      name: 'AivisSpeech MCP Server',
      version: '1.0.0',
    });

    this.setupTools();
  }

  private setupTools(): void {
    this.mcp.tool(
      'speak_response',
      {
        text: z.string(),
        style: z.string().default('Neutral'),
        language: z.string().default('JP'),
        speaker_id: z.number().default(0),
        model_id: z.number().default(0),
        style_weight: z.number().default(1.0),
        sd_ratio: z.number().default(0.2),
        noise: z.number().default(0.6),
        noisew: z.number().default(0.8),
        length: z.number().default(1.0),
        auto_split: z.boolean().default(false),
        split_interval: z.number().default(0.5),
        assist_text_weight: z.number().default(1.0),
      },
      async (params: SpeakRequestParams) => {
        try {
          console.log(`Converting to speech: "${params.text}" with speaker ${params.speaker_id}`);

          // ステップ1: AudioQueryを作成
          const audioQueryResponse = await this.createAudioQuery({
            text: params.text,
            speaker: params.speaker_id,
          });

          // サーバーから取得したAudioQueryをカスタマイズ
          const audioQuery = audioQueryResponse;
          
          // 日本語以外の言語は対応していない場合が多いため、
          // ここではlanguageパラメータは無視して日本語として処理します
          
          // 以下のパラメータを更新
          audioQuery.intonationScale = params.style_weight;
          audioQuery.speedScale = params.length; // lengthをspeedScaleに変換
          audioQuery.volumeScale = 1.0; // デフォルト音量
          
          // ここでkanaフィールドに読み上げるテキストを設定（APIドキュメントに従って）
          audioQuery.kana = params.text;

          // ステップ2: 音声合成
          const wavData = await this.synthesizeSpeech({
            speaker: params.speaker_id,
            query: audioQuery,
          });

          // 音声データを一時ファイルに保存
          const tempAudioPath = path.join(os.tmpdir(), `aivis_output_${Date.now()}.wav`);
          console.log(`Saving audio to temporary file: ${tempAudioPath}`);

          const fs = await import('fs/promises');
          await fs.writeFile(tempAudioPath, wavData);

          // 音声を再生
          await this.playAudio(tempAudioPath);

          // 一時ファイルを削除
          await fs.unlink(tempAudioPath);

          return {
            content: [
              {
                type: 'text',
                text: `Successfully spoke: "${params.text}" with speaker ID ${params.speaker_id}`,
              },
            ],
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.error('TTS Error:', errorMessage);
          if (axios.isAxiosError(error) && error.response) {
            console.error('API Response Status:', error.response.status);
            console.error('API Response Data:', error.response.data);
          }
          throw new Error(`TTS failed: ${errorMessage}`);
        }
      },
    );
  }

  /**
   * AivisSpeechのAudio Query APIを呼び出す
   */
  private async createAudioQuery(params: AudioQueryParams): Promise<any> {
    const apiUrl = `${API_BASE_URL}/audio_query`;
    
    try {
      const response = await axios.post(
        apiUrl,
        null,
        {
          params: {
            text: params.text,
            speaker: params.speaker,
          },
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error creating audio query:', error);
      throw error;
    }
  }

  /**
   * AivisSpeechのSynthesis APIを呼び出す
   */
  private async synthesizeSpeech(params: SynthesisParams): Promise<Buffer> {
    const apiUrl = `${API_BASE_URL}/synthesis`;
    
    try {
      const response = await axios.post(
        apiUrl,
        params.query, // AudioQueryオブジェクト
        {
          params: {
            speaker: params.speaker,
          },
          responseType: 'arraybuffer',
        }
      );
      
      return Buffer.from(response.data);
    } catch (error) {
      console.error('Error synthesizing speech:', error);
      throw error;
    }
  }

  private async playAudio(audioPath: string): Promise<void> {
    try {
      console.log('Playing audio from:', audioPath);

      switch (process.platform) {
        case 'darwin':
          await execAsync(`afplay "${audioPath}"`);
          break;
        case 'linux':
          // PulseAudio用のpaplayを試す
          const XDG_RUNTIME_DIR = process.env.XDG_RUNTIME_DIR ?? '/run/user/1000';
          const env = {
            ...process.env,
            PULSE_SERVER: `unix:${XDG_RUNTIME_DIR}/pulse/native`,
            PULSE_COOKIE: `${process.env.HOME}/.config/pulse/cookie`,
          };
          await execAsync(`paplay "${audioPath}"`, { env });
          break;
        case 'win32':
          await execAsync(
            `powershell -c (New-Object Media.SoundPlayer '${audioPath.replace(/\\/g, '\\\\')}').PlaySync()`,
          );
          break;
        default:
          throw new Error(`Unsupported platform: ${process.platform}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Audio playback error:', errorMessage);
      throw new Error(`Audio playback failed: ${errorMessage}`);
    }
  }

  public async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.mcp.connect(transport);
  }
}

const server = new AivisSpeechTTSServer();
await server.start();
