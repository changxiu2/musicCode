import Index from '@/views/IndexView/Index.vue';
import SearchView from '@/views/SearchView/SearchView.vue';
import playlistView from '@/views/playlistView.vue';
import SinglistDetailsView from '@/views/SinglistDetailsView/SinglistDetailsView.vue';
// import Login from '@/views/Login.vue';
export default [
    // 路径重定向
    {
        path:'/',
        redirect:'/Index',
    },
    {
        // path:'/Index/:id',
        path:'/Index',
        component:Index,
    },
    {
        path:'/playlistView',
        component:playlistView,
    },
    {
        path:'/SearchView',
        component:SearchView,
    },
    {
        path:'/SinglistDetailsView',
        component:SinglistDetailsView,
    },
    {
        path:'/Login',
        // 懒加载组件
        component:()=>import('@/views/Login.vue'),
    },
    {
        path:'/User',
        // 懒加载组件
        component:()=>import('@/views/UserJsx/User'),
    },
    {
        path:'/Info',
        // 懒加载组件
        component:()=>import('@/views/UserJsx/UserInfo'),
    }
]