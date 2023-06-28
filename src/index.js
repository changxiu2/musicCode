import Vue from 'vue';
import './index.css';
import { Icon } from '@iconify/vue2';
import App from '@/App.vue';
import { Swipe, SwipeItem } from 'vant';

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.component('Icon', Icon);

const vm = new Vue({
    el: '#app',
    components: { App },
    template: '<App/>',
    data: {
        swiper: null
    },
    mounted() {
        this.initSwiper();
    },
    methods:{
        initSwiper() {
            this.swiper = new Swiper(".mySwiper", {
                autoplay: true, // 自动播放
                disableOnInteraction: false, // 鼠标交互后不停止自动播放
                pagination: {
                el: ".swiper-pagination",
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">'  + "</span>";
                },
            },
            });
        }
    },
});
