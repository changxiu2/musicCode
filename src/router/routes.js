import Index from '@/views/IndexView/Index.vue';
import indexView from '@/views/indexView.vue';
import playlistView from '@/views/playlistView.vue';
export default [
    // 路径重定向
    {
        path:'/',
        redirect:'/0708',
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
    },
    {
        path:'/Rest',
        // 懒加载组件,需要时再加载
        component:()=>import(/* webpackChunkName:'rest'*/'@/views/Rest.vue')
    },
    {
        path:'/JSX',
        // 懒加载组件,需要时再加载
        component:()=>import('@/views/JSX.jsx')
    },
    {
        path:'/0708',
        // 懒加载组件,需要时再加载
        component:()=>import('@/views/feat-0708.vue')
    },
    {
        path:'/0708jsx',
        // 懒加载组件,需要时再加载
        component:()=>import('@/views/feat-0708.jsx')
    }
]