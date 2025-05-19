import type { CallToolResult } from '@modelcontextprotocol/sdk/types';
import type { IVoiceSynthesisService } from '@api/voiceSynthesisService';
import { ToolFactory, type IToolFactory } from './tool-factory';
import { z } from 'zod';

/**
 * 話者一覧を取得するツールのファクトリー関数
 * @param voiceService 音声合成サービス
 * @returns 話者一覧取得ツールのファクトリー
 */
export function createListSpeakersFactory(
  voiceService: IVoiceSynthesisService,
): IToolFactory<typeof listSpeakersSchema.shape> {
  // 空のスキーマを定義（パラメータ不要の場合）
  const listSpeakersSchema = z.object({});

  /**
   * 話者一覧を取得するハンドラー
   */
  const listSpeakersHandler = async (
    _params: unknown,
    _extra?: unknown,
  ): Promise<CallToolResult> => {
    try {
      console.error('Fetching available speakers...');

      // 話者一覧を取得
      const speakers = await voiceService.getSpeakers();

      // 話者情報をフォーマット
      const speakerList = speakers
        .map(speaker => {
          const styles = speaker.styles
            .map(style => `  - ${style.name} (ID: ${style.id})`)
            .join('\n');
          return `• ${speaker.name} (UUID: ${speaker.speaker_uuid})\n${styles}`;
        })
        .join('\n\n');

      return {
        content: [
          {
            type: 'text',
            text: `利用可能な話者一覧:\n\n${speakerList}`,
          },
        ],
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('List speakers error:', errorMessage);
      throw new Error(`Failed to get speakers list: ${errorMessage}`);
    }
  };

  return new ToolFactory(
    'list_speakers',
    '利用可能な話者（声優）の一覧を取得します。',
    listSpeakersSchema.shape,
    listSpeakersHandler,
  );
}
