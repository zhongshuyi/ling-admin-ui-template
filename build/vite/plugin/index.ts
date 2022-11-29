import { PluginOption } from 'vite'

import vue from '@vitejs/plugin-vue'

import { configHtmlPlugin } from './html'

export function createVitePlugins(_viteEnv: ViteEnv, _isBuild: boolean) {
  /** 插件数组 */
  const vitePlugins: (PluginOption | PluginOption[])[] = [vue()]

  vitePlugins.push(configHtmlPlugin())

  return vitePlugins
}
