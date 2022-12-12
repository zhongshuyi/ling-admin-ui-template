import App from './App.vue'

import 'virtual:windi.css'
import '@/design/index.less'

import { initAppConfigStore } from './logics/initAppConfig'
import { setupRouter } from './router'

import '@purge-icons/generated'
import 'virtual:svg-icons-register'

const app = createApp(App)

// 配置 store，如果不需要Vue devtools支持、SSR支持则不需要配置
setupStore(app)

// 初始化内部系统配置
initAppConfigStore()

// Configure routing
// 配置路由
setupRouter(app)

app.mount('#app', true)
