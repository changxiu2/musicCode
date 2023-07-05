import Index from '@/views/IndexView/Index.vue';
import indexView from '@/views/indexView.vue';
import playlistView from '@/views/playlistView.vue';
export default [
    // 路径重定向
    {
        path:'/',
        redirect:'/Foo',
    },
    {
        path:'/Index/:id',
        component:Index,
    },
    {
        path:'/playlistView',
        component:playlistView,
    },
    {
        path:'/indexView',
        component:indexView,
    },
    {
        path:'/Foo',
        // 懒加载组件
        component:()=>import('@/views/Foo.vue')
    },
    {
        path:'/Login',
        // 懒加载组件
        component:()=>import('@/views/Login.vue')
    }
]