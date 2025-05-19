/**
 * MCPサーバーの設定
 */
export interface McpServerConfig {
  engineUrl: string;
  engineType: 'aivis' | 'voicevox';
  serverName: string;
  serverVersion: string;
}
