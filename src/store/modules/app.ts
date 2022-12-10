import { defineStore } from 'pinia'

import { useBreakpoints } from '@vueuse/core'

import { store } from '@/store'
import { ThemeEnum } from '@/enums/appEnum'
import { screenObj, sizeEnum } from '@/enums/breakpointEnum'
import { APP_DARK_MODE_KEY_ } from '@/enums/cacheEnum'
import setting from '@/settings/projectSetting'
import { Ref } from 'vue'

interface AppState {
  theme?: ThemeEnum | string
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    theme: undefined
  }),
  getters: {
    /**
     * 获取主题，获取顺序：store -> localStorage -> defaultSetting
     * @returns 主题
     */
    getTheme(): ThemeEnum | string {
      return this.theme || localStorage.getItem(APP_DARK_MODE_KEY_) || setting.defaultTheme
    },
    /**
     * 获取当前主题，如果是主题跟随系统，则获取真实状态（明或暗）
     * @returns
     */
    getThemeState(): ThemeEnum | string {
      if (this.getTheme === ThemeEnum.SYSTEM) {
        const themeMedia = window.matchMedia('(prefers-color-scheme: light)')
        if (themeMedia.matches) {
          return ThemeEnum.LIGHT
        } else {
          return ThemeEnum.DARK
        }
      } else {
        return this.getTheme
      }
    },
    /** 获取当前宽度是否属于移动端 */
    getIsMobile(): Ref<boolean> {
      return useBreakpoints(screenObj).smaller(sizeEnum.LG)
    }
  },
  actions: {
    /**设置主题 */
    setTheme(mode: ThemeEnum | string): void {
      console.log(mode)
      this.theme = mode
      localStorage.setItem(APP_DARK_MODE_KEY_, mode)
      switch (this.getThemeState) {
        case ThemeEnum.DARK:
          document.documentElement.classList.add('dark')
          break
        case ThemeEnum.LIGHT:
          document.documentElement.classList.remove('dark')
          break
      }
    },
    /** 切换主题 */
    toggleTheme(): void {
      const nextTheme = new Map()
      nextTheme.set(ThemeEnum.DARK, ThemeEnum.LIGHT)
      nextTheme.set(ThemeEnum.LIGHT, ThemeEnum.SYSTEM)
      nextTheme.set(ThemeEnum.SYSTEM, ThemeEnum.DARK)

      this.setTheme(nextTheme.get(this.getTheme))
    }
  }
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
