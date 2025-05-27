/**
 * サーバー情報
 */
export interface ServerInfo {
  id: string;
  url: string;
  type: 'aivis' | 'voicevox';
}

/**
 * MCPサーバーの設定
 */
export interface McpServerConfig {
  servers: ServerInfo[];
  serverName: string;
  serverVersion: string;
}
