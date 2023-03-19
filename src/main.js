import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'


const app = createApp(App)

app.use(router)
   .use(vuetify)

loadFonts()

app.mount('#app')
