/**
 * VoiceMcpServerの本格テストだよ！(o^―^o)
 * engineClientをモックにしてVoiceMcpServerとVoiceSynthesisServiceの連携をテストするよ！
 */
import { VoiceMcpServer } from '../voiceMcpServer';
import type { IEngineClient } from '../../api/voiceSynthesisService';
import { VoiceSynthesisService } from '../../api/voiceSynthesisService';
import type { AudioQuery } from '../../api/schema/AudioQuery';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types';

// ダミーAudioQueryを作るよ！
const dummyAudioQuery: AudioQuery = {
  accent_phrases: [],
  speedScale: 1,
  intonationScale: 1,
  pitchScale: 1,
  volumeScale: 1,
  prePhonemeLength: 0.1,
  postPhonemeLength: 0.1,
  outputSamplingRate: 24000,
  outputStereo: false,
  kana: 'テスト',
};

describe('VoiceMcpServer', () => {
  it('speak_responseツールでTTSが呼ばれるよ！', async () => {
    // engineClientのモックを作るよ
    const engineClientMock: IEngineClient = {
      post: jest.fn().mockImplementation((endpoint, _data, _params, _options) => {
        if (endpoint === '/audio_query') {
          return Promise.resolve(dummyAudioQuery);
        }
        if (endpoint === '/synthesis') {
          return Promise.resolve(Buffer.from('dummy audio'));
        }
        return Promise.reject(new Error('Unknown endpoint'));
      }),
      get: jest.fn().mockResolvedValue([]),
    };

    // VoiceSynthesisServiceをDIで作るよ
    const voiceService = new VoiceSynthesisService(engineClientMock);

    // playAudioもモックにしちゃう！
    const _playAudio = jest.fn().mockResolvedValue(undefined);
    voiceService.playAudio = _playAudio;

    // VoiceMcpServerを作るよ
    const config = {
      engineUrl: 'http://dummy-engine',
      engineType: 'aivis' as const,
      serverName: 'テストサーバー',
      serverVersion: '1.0.0',
    };
    const server = new VoiceMcpServer(config, voiceService);

    // speak_responseツールのハンドラをgetterで取得するよ！
    const handler = server.getToolHandler('speak_response');
    expect(handler).toBeDefined();

    const params = {
      text: 'こんにちは！',
      style: 'Neutral',
      language: 'JP',
      speaker_id: 1,
      model_id: 0,
      style_weight: 1.0,
      sd_ratio: 0.2,
      noise: 0.6,
      noisew: 0.8,
      length: 1.0,
      auto_split: false,
      split_interval: 0.5,
      assist_text_weight: 1.0,
    };

    const result: CallToolResult = await (handler as any)!(params); // eslint-disable-line

    // playAudioが呼ばれたかチェック！
    expect(_playAudio).toHaveBeenCalled();
    // 結果の内容もチェック！
    expect(result.content[0].text).toContain('Successfully spoke');
  });
});
