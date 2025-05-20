import { VoiceMcpServer } from '@/core/voice-mcp-server';
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
    h: 'help',
  },
});

// Validate settings
if (!argv.url || typeof argv.url !== 'string' || argv.url.trim() === '') {
  console.error('❌ Engine URL (--url) must be a valid string!');
  argv.help = true;
}
if (!argv.engine || (argv.engine !== 'aivis' && argv.engine !== 'voicevox')) {
  console.error('❌ Engine type (--engine) must be "aivis" or "voicevox"!');
  argv.help = true;
}
if (argv.help) {
  console.error(`
🎤 Voice MCP Server - Command Line Options 🎤

Usage:
  node server.js [options]

Options:
  --engine, -e    Voice synthesis engine type (aivis or voicevox) [default: aivis]
  --url, -u       Engine base URL [default: http://127.0.0.1:10101]
  --help, -h      Show this help message

Examples:
  node server.js --engine aivis --url http://localhost:10101
  node server.js --engine voicevox --url http://localhost:50021
  `);
  process.exit(1);
}
// Validated settings
const url = argv.url as string;
const engine = argv.engine as 'aivis' | 'voicevox';

// Display settings
console.error(`🎵 Starting Voice MCP Server`);
console.error(`🔍 Engine type: ${argv.engine}`);
console.error(`🔗 Engine URL: ${argv.url}`);

const startServer = async (): Promise<void> => {
  const mcpServer = VoiceMcpServer.create({
    engineUrl: url,
    engineType: engine,
    serverName: `${engine.charAt(0).toUpperCase() + engine.slice(1)} MCP Server`,
    serverVersion: '1.0.0',
  });

  await mcpServer.start();
};

// Start server
startServer().catch(error => {
  console.error('😱 Failed to start MCP server:', error);
  process.exit(1);
});
