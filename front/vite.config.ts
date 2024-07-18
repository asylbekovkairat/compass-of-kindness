/// <reference types="vitest" />

import fs from 'fs';
import path from 'path';

import { defineConfig, loadEnv } from 'vite';
// import ssr from 'vite-plugin-ssr/plugin';

import react from '@vitejs/plugin-react';
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label';
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh';
import checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint';
import { VitePWAOptions } from 'vite-plugin-pwa';
import { VitePluginRadar } from 'vite-plugin-radar';
import svgr from 'vite-plugin-svgr';

const rootPath = __dirname;

const basePath = path.resolve(rootPath, './src');
const srcDirs = fs
  .readdirSync(basePath)
  .filter((name) => fs.lstatSync(path.join(basePath, name)).isDirectory());

const srcAliases = srcDirs.reduce(
  (acc: any, name: any) => ({
    ...acc,
    [`~${name}`]: `${path.resolve(rootPath, 'src')}/${name}`,
  }),
  {}
);

export default ({ mode }: { mode: string }) => {
  const viteEnv = loadEnv(mode, './envs');
  process.env = { ...process.env, ...viteEnv };

  return defineConfig({
    plugins: [
      react({
        babel: {
          plugins: ['@emotion/babel-plugin', jotaiDebugLabel, jotaiReactRefresh],
        },
      }),
      VitePluginRadar({
        analytics: {
          id: process.env.VITE_GOOGLE_ANALYTICS || 'G-AAAAAAAAAA',
        },
      }),
      // VitePWA(manifestForPlugIn),
      // ssr(),
      checker({
        typescript: true,
      }),
      eslint(),
      svgr(),
    ],
    envDir: './envs',
    // build: {
    //   sourcemap: false,
    // },
    resolve: {
      alias: {
        ...srcAliases,
      },
    },
    base: process.env.VITE_BASE,
    server: {
      port: 3000,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/shared/lib/test/setup.ts',
    },
  });
};
