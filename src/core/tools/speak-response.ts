import type { CallToolResult } from '@modelcontextprotocol/sdk/types';
import type { IVoiceSynthesisService } from '@api/voiceSynthesisService';
import type { McpServerConfig } from '@core/mcp-server-config';
import { ToolFactory, type IToolFactory } from './tool-factory';
import { z } from 'zod';
import axios from 'axios';
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

export function createSpeakResponseFactory(
  voiceService: IVoiceSynthesisService,
  config: McpServerConfig,
): IToolFactory<typeof speakRequestParamsSchema.shape> {
  // デフォルトの話者IDの設定（エンジンタイプによって異なる）
  // Aivis Speech
  // Anneli - ノーマル: 888753760
  //
  // VOICEVOX
  // 四国めたん（あまあま）: 0
  const defaultSpeakerId = config.engineType === 'aivis' ? 888753760 : 0;

  const speakRequestParamsSchema = z.object({
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
  });

  const speakResponseHandler = async (
    params: SpeakRequestParams,
    _extra?: unknown,
  ): Promise<CallToolResult> => {
    try {
      console.error(`Converting to speech: "${params.text}" with speaker ${params.speaker_id}`);
      console.error(`Using engine: ${config.engineType} at ${config.engineUrl}`);

      // ステップ1: AudioQueryを作成
      const audioQuery = await voiceService.createAudioQuery({
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
      const audioData = await voiceService.synthesizeSpeech({
        speaker: params.speaker_id,
        query: audioQuery,
      });

      // 音声を再生
      await voiceService.playAudio(audioData);

      return {
        content: [
          {
            type: 'text',
            text: `Successfully spoke: "${params.text}" with speaker ID ${params.speaker_id} using ${config.engineType}`,
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
  };

  return new ToolFactory(
    'speak_response',
    'TTSサーバにより合成した音声を再生します。' +
      '利用可能な話者IDは「list_speakers」ツールで取得できます。',
    speakRequestParamsSchema.shape,
    speakResponseHandler,
  );
}
