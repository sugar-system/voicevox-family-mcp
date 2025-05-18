const esbuild = require('esbuild');
const fs = require('fs');

// コマンドライン引数をチェック～ウォッチモードかな？(⌒▽⌒)
const watch = process.argv.includes('--watch');

// ビルド設定をまとめたよ～♡
const buildOptions = {
  // エントリーポイントはserver.ts♪
  entryPoints: ['src/server.ts'],

  // 出力先はdist/server.js～
  outfile: 'dist/server.js',

  // バンドルするよ～全部まとめちゃう！(✿╹◡╹)
  bundle: true,

  // Node.js向けだよ～
  platform: 'node',

  // Node.js 14以上をサポート♡
  target: 'node14',

  // CommonJS形式で出力～ESMだとrequireで問題が起きちゃうから！
  format: 'cjs',

  // ファイルサイズを小さくするよ～
  minify: process.env.NODE_ENV !== 'development',

  // ソースマップは開発時だけ♪
  sourcemap: process.env.NODE_ENV === 'development',

  // コンソールにかわいくログを出すよ～
  logLevel: 'info',

  // メタデータを保持して、パッケージとして使いやすくするの！
  metafile: true,
};

// ウォッチモードの設定～ファイルが変わったら自動でビルドし直すよ～(≧▽≦)
if (watch) {
  buildOptions.watch = {
    onRebuild(error, result) {
      if (error) {
        console.error('ビルドでエラーが出ちゃった(´・ω・｀):', error);
      } else {
        console.log('✨ 変更を検知してビルドし直したよ～！ ✨');
        addShebang();
      }
    },
  };
}

// シバン(#!)を追加する関数～npmパッケージとして使えるようにするの！(｡･ω･)ﾉ
function addShebang() {
  const filePath = 'dist/server.js';
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    if (!content.startsWith('#!/usr/bin/env node')) {
      fs.writeFileSync(filePath, '#!/usr/bin/env node\n' + content);
      console.log('✨ シバンを追加したよ～！ ✨');
    }
  } catch (error) {
    console.error('シバン追加でエラーが出ちゃった(´・ω・｀):', error);
  }
}

// ビルド実行～！(⌒▽⌒)
async function runBuild() {
  try {
    if (watch) {
      // ウォッチモード開始～
      const ctx = await esbuild.context(buildOptions);
      await ctx.watch();
      console.log('👀 ウォッチモード開始！ファイルの変更を監視中だよ～ 👀');
    } else {
      // 普通にビルドするよ～
      const result = await esbuild.build(buildOptions);
      console.log('✨ ビルド成功！すごーい！ ✨');
      addShebang();
    }
  } catch (error) {
    console.error('ビルドでエラーが出ちゃった(´・ω・｀):', error);
    process.exit(1);
  }
}

// さぁ、ビルド開始だよ～！(≧▽≦)
runBuild();
