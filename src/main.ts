import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from './components/Nav.vue'
import Sidebar from './components/Sidebar.vue'

Vue.config.productionTip = false
Vue.component('Nav', Nav)
Vue.component('Sidebar', Sidebar)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
