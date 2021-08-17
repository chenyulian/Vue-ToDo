import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Icon from './components/Icon.vue';
import TaskEditor from './components/TaskEditor.vue';
import { Button, Select,  Input, Popover, DatePicker,
         Tooltip, Tag,Divider,Message,
        Carousel, CarouselItem, Progress} from 'element-ui';

Vue.config.productionTip = false;
Vue.component('Icon', Icon);
Vue.component('TaskEditor', TaskEditor);
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Input.name, Input);
Vue.component(Popover.name, Popover);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Tag.name, Tag);
Vue.component(Divider.name, Divider);
Vue.component(Carousel.name, Carousel);
Vue.component(CarouselItem.name, CarouselItem);
Vue.component(Progress.name, Progress);
Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
