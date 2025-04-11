import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css'

import * as ElIcons from '@element-plus/icons-vue';

const app = createApp(App);

for (const name in ElIcons){
    app.component(name,(ElIcons as any)[name])
}


app.use(router).use(pinia).use(ElementPlus).mount('#app');
