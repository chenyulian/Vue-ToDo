import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from './components/Nav.vue';
import Sidebar from './components/Sidebar.vue';
import Icon from './components/Icon.vue';
import { Button, Select } from 'element-ui';

Vue.config.productionTip = false;
Vue.component('Nav', Nav);
Vue.component('Sidebar', Sidebar);
Vue.component('Icon', Icon);
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
