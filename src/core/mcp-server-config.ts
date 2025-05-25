/**
 * サーバー情報
 */
export interface ServerInfo {
  id: string;
  url: string;
  type: 'aivis' | 'voicevox' | 'coeiroink_v2';
}

/**
 * MCPサーバーの設定
 */
export interface McpServerConfig {
  servers: ServerInfo[];
  serverName: string;
  serverVersion: string;
}
