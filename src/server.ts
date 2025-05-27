import { VoiceMcpServer } from '@/core/voice-mcp-server';
import type { ServerInfo } from '@/core/mcp-server-config';
import minimist from 'minimist';

// Parse command line arguments
const argv = minimist(process.argv.slice(2), {
  default: {
    engine: 'aivis',
    url: 'http://127.0.0.1:10101',
  },
  alias: {
    e: 'engine',
    u: 'url',
    s: 'server',
    h: 'help',
  },
});

/**
 * サーバー設定文字列をパースする
 * 形式: "id,url,type"
 */
function parseServerString(serverString: string): ServerInfo {
  const parts = serverString.split(',');
  if (parts.length !== 3) {
    throw new Error(`Invalid server format: "${serverString}". Expected format: "id,url,type"`);
  }

  const [id, url, type] = parts.map(part => part.trim());

  if (!id || !url || !type) {
    throw new Error(
      `Invalid server format: "${serverString}". All parts (id, url, type) must be non-empty`,
    );
  }

  if (!['aivis', 'voicevox'].includes(type)) {
    throw new Error(`Invalid server type: "${type}". Must be one of: aivis, voicevox`);
  }

  return {
    id,
    url,
    type: type as 'aivis' | 'voicevox',
  };
}

/**
 * 複数サーバー設定を構築する（新しい --server 形式）
 */
function buildMultiServerConfigs(): ServerInfo[] {
  const servers: ServerInfo[] = [];

  if (!argv.server) {
    return servers;
  }

  const serverArgs = Array.isArray(argv.server) ? argv.server : [argv.server];

  for (const serverString of serverArgs) {
    if (typeof serverString !== 'string') {
      console.error(`❌ Server argument must be a string: ${serverString}`);
      argv.help = true;
      continue;
    }

    try {
      const serverInfo = parseServerString(serverString);
      servers.push(serverInfo);
    } catch (error) {
      console.error(`❌ ${error instanceof Error ? error.message : 'Unknown error'}`);
      argv.help = true;
    }
  }

  return servers;
}

/**
 * 単一サーバー設定を構築する（従来の --engine/--url 形式、後方互換性）
 */
function buildSingleServerConfig(): ServerInfo | null {
  // 従来形式が指定されていない場合
  if (!argv.engine && !argv.url) {
    return null;
  }

  // 従来形式の検証
  if (!argv.url || typeof argv.url !== 'string' || argv.url.trim() === '') {
    console.error('❌ Engine URL (--url) must be a valid string!');
    argv.help = true;
    return null;
  }

  if (typeof argv?.engine !== 'string' || !['aivis', 'voicevox'].includes(argv.engine)) {
    console.error('❌ Engine type (--engine) must be "aivis" or "voicevox"!');
    argv.help = true;
    return null;
  }

  return {
    id: 'default',
    url: argv.url,
    type: argv.engine as 'aivis' | 'voicevox',
  };
}

/**
 * 起動パラメータから複数サーバー設定を構築する
 */
function buildServerConfigs(): ServerInfo[] {
  // 新しい --server 形式を優先
  const multiServers = buildMultiServerConfigs();
  if (multiServers.length > 0) {
    return multiServers;
  }

  // 後方互換性: 従来の --engine/--url 形式
  const singleServer = buildSingleServerConfig();
  if (singleServer) {
    return [singleServer];
  }

  return [];
}

// サーバー設定を構築
const servers = buildServerConfigs();

// ヘルプまたはエラーの場合
if (argv.help || servers.length === 0) {
  console.error(`
🎤 Voice MCP Server - Command Line Options 🎤

Usage:
  node server.js [options]

New Multi-Server Format:
  --server, -s    Server configuration in format "id,url,type"
                  Can be specified multiple times for multiple servers
                  Types: aivis, voicevox

Legacy Single-Server Format (for backward compatibility):
  --engine, -e    Voice synthesis engine type (aivis or voicevox) [default: aivis]
  --url, -u       Engine base URL [default: http://127.0.0.1:10101]

Other Options:
  --help, -h      Show this help message

Examples:
  # Multi-server setup
  node server.js \\
    --server "voicevox-main,http://localhost:50021,voicevox" \\
    --server "aivis-local,http://localhost:10101,aivis" \\
    --server "sharevox,http://localhost:50025,voicevox"

  # Legacy single-server setup
  node server.js --engine aivis --url http://localhost:10101
  node server.js --engine voicevox --url http://localhost:50021
  `);
  process.exit(1);
}

// Display settings
console.error(`🎵 Starting Voice MCP Server`);
console.error(`🔍 Configured servers: ${servers.length}`);
for (const server of servers) {
  console.error(`   - ${server.id}: ${server.type} at ${server.url}`);
}

const startServer = async (): Promise<void> => {
  const mcpServer = VoiceMcpServer.create({
    servers,
    serverName: `Voice MCP Server (${servers.length} server${servers.length === 1 ? '' : 's'})`,
    serverVersion: '1.0.0',
  });

  await mcpServer.start();
};

// Start server
startServer().catch(error => {
  console.error('😱 Failed to start MCP server:', error);
  process.exit(1);
});
