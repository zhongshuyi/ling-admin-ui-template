import { PluginOption } from 'vite'

import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

import { configHtmlPlugin } from './html'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  /** 插件数组 */
  const vitePlugins: (PluginOption | PluginOption[])[] = [vue(), WindiCSS()]

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

  return vitePlugins
}
