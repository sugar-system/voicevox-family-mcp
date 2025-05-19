import { EngineClient } from '@http/engineClient';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';
import { exec } from 'child_process';
import { promisify } from 'util';
import type { AudioQuery } from '@api/schema/AudioQuery';
import { isAudioQuery } from '@api/schema/AudioQuery';

const execAsync = promisify(exec);

export interface AudioQueryParams {
  text: string;
  speaker: number;
}

export interface SynthesisParams {
  speaker: number;
  query: unknown; // AudioQueryオブジェクト
}

export interface Speaker {
  name: string;
  speaker_uuid: string;
  styles: Array<{
    name: string;
    id: number;
  }>;
  version?: string;
}

/**
 * 音声合成エンジンとの通信を抽象化するインターフェース
 */
export interface IEngineClient {
  post<T, R>(
    endpoint: string,
    data: T | null,
    params?: Record<string, unknown>,
    options?: { responseType?: 'json' | 'arraybuffer' },
  ): Promise<R>;
  get<R>(endpoint: string, params?: Record<string, unknown>): Promise<R>;
  // 必要に応じて他のメソッドも追加してね！
}

/**
 * 音声合成サービスのインターフェース
 */
export interface IVoiceSynthesisService {
  createAudioQuery(params: { text: string; speaker: number }): Promise<AudioQuery>;
  synthesizeSpeech(params: { speaker: number; query: AudioQuery }): Promise<Buffer>;
  playAudio(audioData: Buffer): Promise<void>;
}

/**
 * 音声合成エンジンのAPI処理を担当するクラス
 */
export class VoiceSynthesisService {
  private engineClient: IEngineClient;

  /**
   * @param engineClient 音声合成エンジンとの通信クライアント
   */
  constructor(engineClient: IEngineClient) {
    this.engineClient = engineClient;
  }

  /**
   * ファクトリーメソッド
   * @param baseUrl エンジンのベースURL
   * @returns VoiceSynthesisServiceのインスタンス
   */
  static create(baseUrl: string): VoiceSynthesisService {
    const engineClient = new EngineClient(baseUrl);
    return new VoiceSynthesisService(engineClient);
  }

  /**
   * 音声合成用のAudioQueryを作成する
   */
  public async createAudioQuery(params: AudioQueryParams): Promise<AudioQuery> {
    try {
      const result = await this.engineClient.post<null, unknown>('/audio_query', null, {
        text: params.text,
        speaker: params.speaker,
      });
      if (!isAudioQuery(result)) {
        throw new Error('API response is not a valid AudioQuery');
      }
      return result;
    } catch (error) {
      console.error('Error creating audio query:', error);
      throw error;
    }
  }

  /**
   * AudioQueryを使って音声を合成する
   */
  public async synthesizeSpeech(params: SynthesisParams): Promise<Buffer> {
    try {
      const audioData = await this.engineClient.post<unknown, ArrayBuffer>(
        '/synthesis',
        params.query,
        {
          speaker: params.speaker,
        },
        { responseType: 'arraybuffer' },
      );

      return Buffer.from(audioData);
    } catch (error) {
      console.error('Error synthesizing speech:', error);
      throw error;
    }
  }

  /**
   * 利用可能な話者の一覧を取得する
   */
  public async getSpeakers(): Promise<Speaker[]> {
    try {
      return await this.engineClient.get<Speaker[]>('/speakers');
    } catch (error) {
      console.error('Error getting speakers:', error);
      throw error;
    }
  }

  /**
   * 音声を再生する
   */
  public async playAudio(audioData: Buffer): Promise<void> {
    // 音声データを一時ファイルに保存
    const tempAudioPath = path.join(os.tmpdir(), `audio_output_${Date.now()}.wav`);

    try {
      console.error(`Saving audio to temporary file: ${tempAudioPath}`);
      await fs.writeFile(tempAudioPath, audioData);

      await this.playAudioFile(tempAudioPath);

      // 一時ファイルを削除
      await fs.unlink(tempAudioPath);
    } catch (error) {
      console.error('Error playing audio:', error);
      // エラーがあっても一時ファイルを削除しようとする
      try {
        await fs.unlink(tempAudioPath);
      } catch {
        // 削除エラーは無視
      }
      throw error;
    }
  }

  /**
   * ファイルパスから音声を再生する
   */
  private async playAudioFile(audioPath: string): Promise<void> {
    try {
      console.error('Playing audio from:', audioPath);

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
}
