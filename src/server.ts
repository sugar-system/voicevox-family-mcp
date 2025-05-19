import { VoiceMcpServer } from '@/core/voice-mcp-server';
import minimist from 'minimist';

// コマンドライン引数をパース
const argv = minimist(process.argv.slice(2), {
  default: {
    engine: 'aivis',
    url: 'http://127.0.0.1:10101',
  },
  alias: {
    e: 'engine',
    u: 'url',
    h: 'help',
  },
});

// 設定値バリデーション
if (!argv.url || typeof argv.url !== 'string' || argv.url.trim() === '') {
  console.error('❌ エンジンのURL (--url) は文字列で指定してください！');
  argv.help = true;
}
if (!argv.engine || (argv.engine !== 'aivis' && argv.engine !== 'voicevox')) {
  console.error('❌ エンジンタイプ (--engine) は "aivis" または "voicevox" を指定してください！');
  argv.help = true;
}
if (argv.help) {
  console.error(`
🎤 Voice MCP Server - Command Line Options 🎤

Usage:
  node server.js [options]

Options:
  --engine, -e    音声合成エンジンの種類 (aivis または voicevox) [default: aivis]
  --url, -u       エンジンのベースURL [default: http://127.0.0.1:10101]
  --help, -h      このヘルプメッセージを表示

Examples:
  node server.js --engine aivis --url http://localhost:10101
  node server.js --engine voicevox --url http://localhost:50021
  `);
  process.exit(1);
}
// バリデーション済み設定値
const url = argv.url as string;
const engine = argv.engine as 'aivis' | 'voicevox';

// 設定値を表示
console.error(`🎵 Voice MCP Server を起動します`);
console.error(`🔍 エンジン種類: ${argv.engine}`);
console.error(`🔗 エンジンURL: ${argv.url}`);

const startServer = async (): Promise<void> => {
  const mcpServer = VoiceMcpServer.create({
    engineUrl: url,
    engineType: engine,
    serverName: `${engine.charAt(0).toUpperCase() + engine.slice(1)} MCP Server`,
    serverVersion: '1.0.0',
  });

  await mcpServer.start();
};

// サーバーを起動
startServer().catch(error => {
  console.error('😱 MCPサーバーの起動に失敗しました:', error);
  process.exit(1);
});
