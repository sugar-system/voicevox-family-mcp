beforeAll(() => {
  /**
   * *エラーログの抑制
   * MCPサーバとAIクライアントの通信に通常入出力を使うため
   * 通常のログにもエラー入出力を使用する。
   * 通常のログ出力をjestがエラー発生と判定しないよう抑制する。
   */
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  jest.spyOn(console, 'error').mockRestore();
});
