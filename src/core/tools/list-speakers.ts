import type { CallToolResult } from '@modelcontextprotocol/sdk/types';
import type { IVoiceSynthesisService, Speaker } from '@/api/voice-synthesis-service';
import { ToolFactory, type IToolFactory } from './tool-factory';
import { z } from 'zod';

/**
 * 話者一覧を取得するツールのファクトリー関数
 * @param voiceServices 音声合成サービスのMap（サーバID -> サービス）
 * @returns 話者一覧取得ツールのファクトリー
 */
export function createListSpeakersFactory(
  voiceServices: Map<string, IVoiceSynthesisService>,
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
      console.error('Fetching available speakers from all servers...');

      // 全サーバーから話者一覧を並列取得
      const serverResults = await Promise.allSettled(
        Array.from(voiceServices.entries()).map(async ([serverId, service]) => {
          console.error(`Fetching speakers from server: ${serverId}`);
          const speakers = await service.getSpeakers();
          return { serverId, speakers };
        }),
      );

      // 成功した結果のみを処理
      const allSpeakers: string[] = [];
      for (const result of serverResults) {
        if (result.status === 'fulfilled') {
          const { serverId, speakers } = result.value;
          const formattedSpeakers = speakers.map(speaker => formatSpeakerInfo(speaker, serverId));
          allSpeakers.push(...formattedSpeakers);
          console.error(`✅ Successfully fetched ${speakers.length} speakers from ${serverId}`);
        } else {
          console.error(`❌ Failed to fetch speakers from a server:`, result.reason);
        }
      }

      if (allSpeakers.length === 0) {
        throw new Error('No speakers available from any server');
      }

      const speakerList = allSpeakers.join('\n');

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
   * @param speaker 話者情報
   * @param serverId サーバID
   */
  function formatSpeakerInfo(speaker: Speaker, serverId: string): string {
    const styles = speaker.styles.map(style => `${style.name}(ID:${style.id})`).join(', ');
    return `Server:${serverId}, Speaker:${speaker.name}, UUID:${speaker.speaker_uuid}, Styles:[${styles}]`;
  }

  return new ToolFactory(
    'list_speakers',
    "Get a list of available speakers (voice actors) from all connected TTS servers. Each speaker's style ID can be used with the speak_response tool along with the server ID.",
    listSpeakersSchema.shape,
    listSpeakersHandler,
  );
}
