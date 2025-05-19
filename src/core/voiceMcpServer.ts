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
import type { IVoiceSynthesisService } from '../api/voiceSynthesisService';
import { VoiceSynthesisService } from '../api/voiceSynthesisService';
import type { McpServerConfig } from './mcp-server-config';
import type { IToolFactory } from './tools/tool-factory';
import { createSpeakResponseFactory } from './tools/speak-response';

/**
 * 音声合成MCPサーバークラス
 */
export class VoiceMcpServer {
  private mcp: McpServer;
  private voiceService: IVoiceSynthesisService;
  private config: McpServerConfig;
  private toolFactories: IToolFactory<any>[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any

  /**
   * MCPサーバーに登録済みのtool（テスト用）
   */
  private registerdTools: Map<string, RegisteredTool> = new Map();

  constructor(config: McpServerConfig, voiceService: IVoiceSynthesisService) {
    this.config = config;
    this.voiceService = voiceService;

    this.mcp = new McpServer({
      name: config.serverName,
      version: config.serverVersion,
    });

    this.setupToolFactories();
    this.setupTools();
  }

  private setupToolFactories(): void {
    // 音声合成ツール
    this.toolFactories.push(createSpeakResponseFactory(this.voiceService, this.config));
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
    this.registerdTools.set(factory.name, registeredTool);
  }

  /**
   * ファクトリーメソッド
   * @param config サーバー設定
   * @returns VoiceMcpServerのインスタンス
   */
  static create(config: McpServerConfig): VoiceMcpServer {
    const voiceService = VoiceSynthesisService.create(config.engineUrl);
    return new VoiceMcpServer(config, voiceService);
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
    console.error(`🔌 Connected to ${this.config.engineType} engine at: ${this.config.engineUrl}`);
  }

  /**
   * テスト用: ツールのハンドラを取得するよ！(o^―^o)
   * @param name ツール名
   * @returns ツールのハンドラ関数 or undefined
   */
  public getToolHandler(name: string): ToolCallback<undefined | ZodRawShape> | undefined {
    return this.registerdTools.get(name)?.callback;
  }
}
