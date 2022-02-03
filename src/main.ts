import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { keycloak } from './services'

keycloak.init({ onLoad: 'check-sso' }).then(() => {
  createApp(App)
    .use(router)
    .mount('#app')
}).catch(err => {
  console.log(err)
})
