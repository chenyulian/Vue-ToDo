import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from './components/Nav.vue';
import Sidebar from './components/Sidebar.vue';
import Icon from './components/Icon.vue';
import TaskEditor from './components/TaskEditor.vue';
import { Button, Dialog, Select, Option, FormItem, Form, Input, Popover, DatePicker, Radio, RadioGroup, Cascader, Switch } from 'element-ui';
// import NewTaskDialog from '@/components/NewTaskDialog.vue'

Vue.config.productionTip = false;
Vue.component('Nav', Nav);
Vue.component('Sidebar', Sidebar);
Vue.component('Icon', Icon);
Vue.component('TaskEditor', TaskEditor);
Vue.component(Button.name, Button);
Vue.component(Dialog.name, Dialog);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(FormItem.name, FormItem);
Vue.component(Form.name, Form);
Vue.component(Input.name, Input);
Vue.component(Popover.name, Popover);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Radio.name, Radio);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(Cascader.name, Cascader);
Vue.component(Switch.name, Switch);
// Vue.component('NewTaskDialog', NewTaskDialog);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
