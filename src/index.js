import Vue from 'vue';
import './index.css';
import { Icon } from '@iconify/vue2';
import App from '@/App.vue';
import router from '@/router';
// 1.引入路由插件
// import VueRouter from 'vue-router';
// 2.注册路由所提供的全局组件 router-view（渲染）   router-link（跳转）
// Vue.use(VueRouter);
// 3.实例化
// import Index from '@/views/IndexView/Index.vue';
// import indexView from '@/views/indexView.vue';
// import playlistView from '@/views/playlistView.vue';
// const router = new VueRouter(/**配置核心*/)
// const router = new VueRouter({
//     // 相当于刚刚自己定义的viewMap
//     routes:[//{}表示一个hash值所代表的实例
//         // 路径重定向
//         {
//             path:'/',
//             redirect:'/playlistView',
//         },
//         {
//             path:'/Index/:id',
//             component:Index,
//         },
//         {
//             path:'/playlistView',
//             component:playlistView,
//         },
//         {
//             path:'/indexView',
//             component:indexView,
//         },
//     ]
// })
import Drawer from './components/Drawer';
import Switch from './components/Switch'
// import Dialog from './components/Dialog'
import {Swipe, SwipeItem } from 'vant';
import 'vant/lib/index.css';
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.component('Icon', Icon);
// Vue.component('Drawer', Drawer);
// Vue.component('v-switch', Switch);
Vue.use(Switch);
Vue.use(Drawer);
// Vue.use(Dialog);

// // Vue.extend给vue构造函数配置项设置默认值
// const Children = Vue.extend({
//     template:'<h1>{{msg}}</h1>'
// })

// new Children({
//     el:'#app',
//     data(){
//         return {
//             msg:'abc',
//         }
//     }
// })

// const app = new Vue.extend({
//     el:'#app',
//     components: { App },
//     template: '<App/>',
// });

const app = new Vue({
    el: '#app',
    // 4.将router注入到root中
    // 提供了两个vue（全局的）实例属性 $router === router 、$route
    router,
    components: { App },
    template: '<App/>',
});

// app.$mount();//把模板编译为浏览器能够识别的html片段并赋值给app的$el属性
// setTimeout(()=>{
//     document.querySelector('body').appendChild(app.$el)
// },5000)
// window.app = app;
// console.log(app);


// class V {
//     static component(name,comp){
//         console.log(`注册${name}组件`);
//     }
//     static use(plugin){
//         console.log(this);
//         if(!plugin)return;
//         if(typeof plugin.install === 'function'){
//             plugin.install(this)
//         }
//         if(typeof plugin === 'function'){
//             plugin(this)
//         }
//     }
// }

// V.use(function(A){
//     A.component('abc',{})
// })

// V.use({
//     install(A){
//         A.component('abc',{})
//     }
// })