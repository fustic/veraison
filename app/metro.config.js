// The app imports shared code from ../core and generated content from ./src/generated.
// Metro only watches the app folder by default, so add the repo root.
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const repoRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);
config.watchFolders = [path.resolve(repoRoot, 'core'), path.resolve(repoRoot, 'content')];
// core/ has no dependencies of its own; resolve everything from the app's node_modules.
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, 'node_modules')];

// Web: expo-sqlite runs SQLite as WebAssembly, which needs .wasm assets and a cross-origin
// isolated page (SharedArrayBuffer). Production hosts send the same headers (public/_headers).
config.resolver.assetExts.push('wasm');
// The sign-in page (public/signin.html) is left out: Google's popup does not work there otherwise.
config.server.enhanceMiddleware = (middleware) => (req, res, next) => {
  if (!(req.url || '').startsWith('/signin')) {
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  }
  return middleware(req, res, next);
};

module.exports = config;
