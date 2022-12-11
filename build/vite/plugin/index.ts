import { PluginOption } from 'vite'

import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

import { configHtmlPlugin } from './html'

import { configComponentsPlugin } from './components'
import { autoImportPlugin } from './autoImport'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  /** 插件数组 */
  const vitePlugins: (PluginOption | PluginOption[])[] = [vue()]

  // API 自动引入
  vitePlugins.push(autoImportPlugin())

  // 自动按需引入组件
  vitePlugins.push(configComponentsPlugin())

  // 添加 windicss
  vitePlugins.push(WindiCSS())

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

  return vitePlugins
}
