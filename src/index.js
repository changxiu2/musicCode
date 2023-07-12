import Vue from 'vue';
import './index.css';
import { Icon } from '@iconify/vue2';
import App from '@/App.vue';
import router from '@/router';
import Drawer from '@/commponents/Drawer.vue';
import Switch from '@/commponents/Switch.vue';
import { Swipe, SwipeItem, Popup, Area, DatetimePicker, Picker ,NoticeBar,Circle } from 'vant';
import 'vant/lib/index.css';
import formateTime from '@/utils/formateTime';
// import store from '@/store';

Vue.use(Swipe).use(SwipeItem).use(Popup).use(Area).use(formateTime).use(DatetimePicker).use(Picker).use(NoticeBar).use(Circle);
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
