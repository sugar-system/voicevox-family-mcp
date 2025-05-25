// Polyfill a minimal global 'window' for Node.js (do this before any other imports)
const _window = {
  location: {
    protocol: 'http:',
    hostname: 'localhost',
    port: '10101',
    href: 'http://localhost:10101/',
  },
};

if (typeof global.window === 'undefined') {
  global.window = _window as unknown as Window & typeof globalThis;
}

import type { RegisteredTool, ToolCallback } from '@modelcontextprotocol/sdk/server/mcp.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import type { ZodRawShape } from 'zod';
import type { IVoiceSynthesisService } from '@api/voice-synthesis-service';
import { VoiceSynthesisService } from '@api/voice-synthesis-service';
import type { McpServerConfig } from './mcp-server-config';
import type { IToolFactory } from './tools/tool-factory';
import { createSpeakResponseFactory } from './tools/speak-response';
import { createListSpeakersFactory } from './tools/list-speakers';

/**
 * 音声合成MCPサーバークラス
 */
export class VoiceMcpServer {
  private mcp: McpServer;
  private voiceServices: Map<string, IVoiceSynthesisService>;
  private config: McpServerConfig;
  private toolFactories: IToolFactory<any>[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any

  /**
   * MCPサーバーに登録済みのtool（テスト用）
   */
  private registeredTools: Map<string, RegisteredTool> = new Map();

  constructor(config: McpServerConfig, voiceServices: Map<string, IVoiceSynthesisService>) {
    this.config = config;
    this.voiceServices = voiceServices;

    this.mcp = new McpServer({
      name: config.serverName,
      version: config.serverVersion,
    });

    this.setupToolFactories();
    this.setupTools();
  }

  private setupToolFactories(): void {
    // 音声合成ツール
    this.toolFactories.push(createSpeakResponseFactory(this.voiceServices, this.config));
    this.toolFactories.push(createListSpeakersFactory(this.voiceServices));
  }

  /**
   * MCPツールを設定する
   */
  private setupTools(): void {
    for (const factory of this.toolFactories) {
      this.registerTool(factory);
    }
  }

  /**
   * MCPサーバーにツールを登録する
   */
  private registerTool<T extends ZodRawShape>(factory: IToolFactory<T>): void {
    const registeredTool = this.mcp.tool(
      factory.name,
      factory.description,
      factory.schema,
      factory.handler,
    );
    this.registeredTools.set(factory.name, registeredTool);
  }

  /**
   * ファクトリーメソッド
   * @param config サーバー設定
   * @returns VoiceMcpServerのインスタンス
   */
  static create(config: McpServerConfig): VoiceMcpServer {
    const voiceServices = new Map<string, IVoiceSynthesisService>();

    // 各サーバーのVoiceSynthesisServiceを作成
    for (const server of config.servers) {
      const voiceService = VoiceSynthesisService.create(server.url);
      voiceServices.set(server.id, voiceService);
    }

    return new VoiceMcpServer(config, voiceServices);
  }

  /**
   * サーバーを起動する
   */
  public async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.mcp.connect(transport);
    console.error(
      `✅ MCP Server "${this.config.serverName}" v${this.config.serverVersion} started`,
    );

    // 接続されたサーバー一覧を表示
    for (const server of this.config.servers) {
      console.error(`🔌 Connected to ${server.type} engine "${server.id}" at: ${server.url}`);
    }
  }

  /**
   * テスト用: ツールのハンドラを取得
   * @param name ツール名
   * @returns ツールのハンドラ関数 or undefined
   */
  public getToolHandler(name: string): ToolCallback<undefined | ZodRawShape> | undefined {
    return this.registeredTools.get(name)?.callback;
  }
}
