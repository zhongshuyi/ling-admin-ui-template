import { PluginOption } from 'vite'
import Components from 'unplugin-vue-components/vite'

export function configComponentsPlugin() {
  const componentsPlugin: PluginOption = Components({
    dts: 'types/components.d.ts'
  })

  return componentsPlugin
}
