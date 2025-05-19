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

import type { RegisteredTool, ToolCallback } from '@modelcontextprotocol/sdk/server/mcp.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import type { ZodRawShape } from 'zod';
import { z } from 'zod';
import axios from 'axios';
import { VoiceSynthesisService } from '../api/voiceSynthesisService';
import type { AudioQuery } from '../api/schema/AudioQuery';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types';

/**
 * MCPサーバーの設定
 */
interface McpServerConfig {
  engineUrl: string;
  engineType: 'aivis' | 'voicevox';
  serverName: string;
  serverVersion: string;
}

/**
 * MCPクライアントからのリクエストパラメータ
 */
export interface SpeakRequestParams {
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

/**
 * 音声合成サービスのインターフェース
 */
interface IVoiceSynthesisService {
  createAudioQuery(params: { text: string; speaker: number }): Promise<AudioQuery>;
  synthesizeSpeech(params: { speaker: number; query: AudioQuery }): Promise<Buffer>;
  playAudio(audioData: Buffer): Promise<void>;
}

/**
 * 音声合成MCPサーバークラス
 */
export class VoiceMcpServer {
  private mcp: McpServer;
  private voiceService: IVoiceSynthesisService;
  private config: McpServerConfig;

  /**
   * MCPサーバーに登録済みのtool（テスト用）
   */
  private registerdTools: Map<string, RegisteredTool> = new Map();

  constructor(config: McpServerConfig, voiceService: IVoiceSynthesisService) {
    this.config = config;
    this.voiceService = voiceService;

    this.mcp = new McpServer({
      name: config.serverName,
      version: config.serverVersion,
    });

    this.setupTools();
  }

  // *================================
  // * ツールハンドラー
  // *================================
  private async speakResponseHandler(
    params: SpeakRequestParams,
    _extra?: unknown,
  ): Promise<CallToolResult> {
    try {
      console.error(`Converting to speech: "${params.text}" with speaker ${params.speaker_id}`);
      console.error(`Using engine: ${this.config.engineType} at ${this.config.engineUrl}`);

      // ステップ1: AudioQueryを作成
      const audioQuery = await this.voiceService.createAudioQuery({
        text: params.text,
        speaker: params.speaker_id,
      });

      // パラメータをカスタマイズ
      audioQuery.intonationScale = params.style_weight;
      audioQuery.speedScale = params.length; // lengthをspeedScaleに変換
      audioQuery.volumeScale = 1.0; // デフォルト音量

      // kanaフィールドに読み上げるテキストを設定
      audioQuery.kana = params.text;

      // ステップ2: 音声合成
      const audioData = await this.voiceService.synthesizeSpeech({
        speaker: params.speaker_id,
        query: audioQuery,
      });

      // 音声を再生
      await this.voiceService.playAudio(audioData);

      return {
        content: [
          {
            type: 'text',
            text: `Successfully spoke: "${params.text}" with speaker ID ${params.speaker_id} using ${this.config.engineType}`,
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
  }

  /**
   * MCPツールを設定する
   */
  private setupTools(): void {
    // デフォルトの話者IDの設定（エンジンタイプによって異なる）
    // Aivis Speech
    // Anneli - ノーマル: 888753760
    //
    // VOICEVOX
    // 四国めたん（あまあま）: 0
    const defaultSpeakerId = this.config.engineType === 'aivis' ? 888753760 : 0;

    this.addTool(
      'speak_response',
      'TTSサーバにより合成した音声を再生します。' +
        '利用可能な話者IDは「list_speakers」ツールで取得できます。',
      {
        text: z.string(),
        style: z.string().default('Neutral'),
        language: z.string().default('JP'),
        speaker_id: z.number().default(defaultSpeakerId),
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
      this.speakResponseHandler.bind(this),
    );
  }

  private addTool<Args extends ZodRawShape>(
    name: string,
    description: string,
    paramsSchema: Args,
    handler: ToolCallback<Args>,
  ): void {
    const registeredTool = this.mcp.tool(name, description, paramsSchema, handler);
    this.registerdTools.set(name, registeredTool);
  }

  /**
   * ファクトリーメソッド
   * @param config サーバー設定
   * @returns VoiceMcpServerのインスタンス
   */
  static create(config: McpServerConfig): VoiceMcpServer {
    const voiceService = VoiceSynthesisService.create(config.engineUrl);
    return new VoiceMcpServer(config, voiceService);
  }

  /**
   * サーバーを起動する
   */
  public async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.mcp.connect(transport);
    console.error(
      `✅ MCP Server "${this.config.serverName}" v${this.config.serverVersion} started`,
    );
    console.error(`🔌 Connected to ${this.config.engineType} engine at: ${this.config.engineUrl}`);
  }

  /**
   * テスト用: ツールのハンドラを取得するよ！(o^―^o)
   * @param name ツール名
   * @returns ツールのハンドラ関数 or undefined
   */
  public getToolHandler(name: string): ToolCallback<undefined | ZodRawShape> | undefined {
    return this.registerdTools.get(name)?.callback;
  }
}
