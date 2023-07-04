import Vue from 'vue';
import './index.css';
import { Icon } from '@iconify/vue2';
import App from '@/App.vue';
import router from '@/router';
import Drawer from '@/commponents/Drawer.vue';
import Switch from '@/commponents/Switch.vue';
import {Vant, Swipe, SwipeItem } from 'vant';
import 'vant/lib/index.css';

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.component('Icon', Icon);
Vue.component('Drawer', Drawer);
Vue.component('v-switch', Switch);

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
});
