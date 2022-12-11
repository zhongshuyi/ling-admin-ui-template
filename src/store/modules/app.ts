import { ThemeEnum } from '@/enums/appEnum'
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
      const isDark = useDark()
      switch (mode) {
        case ThemeEnum.SYSTEM:
          const systemIsDark = usePreferredDark()
          systemIsDark.value ? (isDark.value = true) : (isDark.value = false)
          break
        case ThemeEnum.DARK:
          isDark.value = true
          break
        case ThemeEnum.LIGHT:
          isDark.value = false
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
