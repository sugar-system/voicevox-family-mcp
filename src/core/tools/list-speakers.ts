import type { CallToolResult } from '@modelcontextprotocol/sdk/types';
import type { IVoiceSynthesisService, Speaker } from '@/api/voice-synthesis-service';
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
  // 空スキーマ
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

      // 話者情報をシンプルな形式でフォーマット（AI解析用）
      const speakerList = speakers.map(formatSpeakerInfo).join('\n');

      return {
        content: [
          {
            type: 'text',
            text: speakerList,
          },
        ],
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('List speakers error:', errorMessage);
      throw new Error(`Failed to get speakers list: ${errorMessage}`);
    }
  };

  /**
   * 話者情報をAIが解析しやすいシンプルな形式にフォーマットする
   */
  function formatSpeakerInfo(speaker: Speaker): string {
    const styles = speaker.styles.map(style => `${style.name}(ID:${style.id})`).join(', ');
    return `Speaker:${speaker.name}, UUID:${speaker.speaker_uuid}, Styles:[${styles}]`;
  }

  return new ToolFactory(
    'list_speakers',
    "Get a list of available speakers (voice actors). Each speaker's style ID can be used with the speak_response tool.",
    listSpeakersSchema.shape,
    listSpeakersHandler,
  );
}
