import { VoiceMcpServer } from '@core/voiceMcpServer';
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

// ヘルプメッセージの表示
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
  process.exit(0);
}

// 設定値を表示
console.error(`🎵 Voice MCP Server を起動します`);
console.error(`🔍 エンジン種類: ${argv.engine}`);
console.error(`🔗 エンジンURL: ${argv.url}`);

const startServer = async (): Promise<void> => {
  const mcpServer = VoiceMcpServer.create({
    engineUrl: argv.url,
    engineType: argv.engine as 'aivis' | 'voicevox',
    serverName: `${argv.engine.charAt(0).toUpperCase() + argv.engine.slice(1)} MCP Server`,
    serverVersion: '1.0.0',
  });

  await mcpServer.start();
};

// サーバーを起動
startServer().catch(error => {
  console.error('😱 MCPサーバーの起動に失敗しました:', error);
  process.exit(1);
});
