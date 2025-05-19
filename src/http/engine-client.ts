import axios from 'axios';

/**
 * 音声合成エンジンとの通信を担当するクラス
 */
export class EngineClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * 音声合成エンジンのエンドポイントにPOSTリクエストを送信するよ！
   *
   * @template T 送信するデータの型だよ
   * @template R 期待するレスポンスの型だよ
   * @param endpoint エンドポイントのパス（例: '/synthesize' など）
   * @param data 送信するデータ（なければ null でもOK！）
   * @param params クエリパラメータ（必要なら指定してね）
   * @param options レスポンスの型（'json' か 'arraybuffer'）を選べるよ
   * @returns サーバーから返ってきたデータ（型Rだと信じて返すよ！）
   * @throws 通信エラーやサーバーエラーが発生した場合に投げるよ
   *
   * @remarks
   * 実際のレスポンスの中身が本当にR型かどうかは保証できないから、
   * 必要なら呼び出し側で型チェックやバリデーションしてね！
   * 型アサーション（as R）で返してるから、油断は禁物だよ〜！(๑˃̵ᴗ˂̵)
   */
  public async post<T, R>(
    endpoint: string,
    data: T | null,
    params?: Record<string, unknown>,
    options?: { responseType?: 'json' | 'arraybuffer' },
  ): Promise<R> {
    try {
      const url = `${this.baseUrl}${endpoint}`;

      const response = await axios.post(url, data, {
        params,
        responseType: options?.responseType === 'arraybuffer' ? 'arraybuffer' : 'json',
      });

      return response.data as R;
    } catch (error) {
      console.error(`Error making POST request to ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * 音声合成エンジンのエンドポイントにGETリクエストを送信するよ！
   *
   * @template R 期待するレスポンスの型だよ
   * @param endpoint エンドポイントのパス（例: '/status' など）
   * @param params クエリパラメータ（必要なら指定してね）
   * @returns サーバーから返ってきたデータ（型Rだと信じて返すよ！）
   * @throws 通信エラーやサーバーエラーが発生した場合に投げるよ
   *
   * @remarks
   * 実際のレスポンスの中身が本当にR型かどうかは保証できないから、
   * 必要なら呼び出し側で型チェックやバリデーションしてね！
   * 型アサーション（as R）で返してるから、油断は禁物だよ〜！(๑˃̵ᴗ˂̵)
   */
  public async get<R>(endpoint: string, params?: Record<string, unknown>): Promise<R> {
    try {
      const url = `${this.baseUrl}${endpoint}`;

      const response = await axios.get(url, {
        params,
      });

      return response.data as R;
    } catch (error) {
      console.error(`Error making GET request to ${endpoint}:`, error);
      throw error;
    }
  }
}
