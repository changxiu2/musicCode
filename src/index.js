import Vue from 'vue';
import './index.css';
import { Icon } from '@iconify/vue2';
import App from '@/App.vue';
import Drawer from './commponents/Drawer.vue';
import Switch from './commponents/Switch.vue'
import {Vant, Swipe, SwipeItem } from 'vant';
import 'vant/lib/index.css';
// Vue.use(Vant);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.component('Icon', Icon);
Vue.component('Drawer', Drawer);
Vue.component('v-switch', Switch);

const vm = new Vue({
    el: '#app',
    components: { App },
    template: '<App/>',
});
