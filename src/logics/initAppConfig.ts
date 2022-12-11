import { useAppStoreWithOut } from '@/store/modules/app'

export function initAppConfigStore() {
  const appStore = useAppStoreWithOut()

  // 设置项目主题
  appStore.setTheme(appStore.getTheme)
}
