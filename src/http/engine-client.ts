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
   * 音声合成エンジンのエンドポイントにPOSTリクエストを送信する
   *
   * @template T 送信するデータの型
   * @template R 期待するレスポンスの型
   * @param endpoint エンドポイントのパス（例: '/synthesize' など）
   * @param data 送信するデータ
   * @param params クエリパラメータ
   * @param options レスポンスの型（'json' か 'arraybuffer'）
   * @returns サーバーから返ってきたデータ
   * @throws 通信エラーやサーバーエラーが発生した場合に投げる
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
   * 音声合成エンジンのエンドポイントにGETリクエストを送信する
   *
   * @template R 期待するレスポンスの型
   * @param endpoint エンドポイントのパス
   * @param params クエリパラメータ
   * @returns サーバーから返ってきたデータ
   * @throws 通信エラーやサーバーエラーが発生した場合に投げる
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
