import Vue from 'vue';
import './index.css';
import { Icon } from '@iconify/vue2';
import App from '@/App.vue';
import router from '@/router';
import Drawer from '@/commponents/Drawer.vue';
import Switch from '@/commponents/Switch.vue';
import { Vant, Swipe, SwipeItem } from 'vant';
import 'vant/lib/index.css';
// import store from '@/store';

Vue.use(Swipe);
Vue.use(SwipeItem);
// Vue.use(Sticky);
Vue.component('Icon', Icon);
Vue.component('Drawer', Drawer);
Vue.component('v-switch', Switch);

const app = new Vue({
    el: '#app',
    router,
    // store,
    components: { App },
    template: '<App/>',
});
