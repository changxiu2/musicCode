import Index from '@/views/IndexView/Index.vue';
import SearchView from '@/views/SearchView/SearchView.vue';
import playlistView from '@/views/playlistView.vue';
import SinglistDetailsView from '@/views/SinglistDetailsView/SinglistDetailsView.vue';
// import Login from '@/views/Login.vue';
export default [
    // 路径重定向
    {
        path:'/',
        redirect:'/NavView',
    },
    // 首页
    {
        path:'/Index',
        component:Index,
    },
    // 歌单广场页面
    {
        path:'/playlistView',
        component:playlistView,
    },
    // 搜索页面
    {
        path:'/SearchView',
        component:SearchView,
    },
    // 歌单详情页面
    {
        path:'/SinglistDetailsView',
        component:SinglistDetailsView,
    },
    // CD页面
    {
        path:'/MusicPlay',
        component:()=>import('@/views/MusicPlayView/MusicPlay.vue'),
    },
    {
        path:'/Login',
        // 懒加载组件
        component:()=>import('@/views/Login.vue'),
    },
    // 我的页面
    {
        path:'/User',
        component:()=>import('@/views/UserJsx/User'),
    },
    // 编辑个人资料页面
    {
        path:'/Info',
        component:()=>import('@/views/UserJsx/UserInfo'),
    },
    // MV排行榜页面
    {
        path:'/MvView',
        component:()=>import('@/views/MvView.vue'),
    },
    {
        path:'/NavView',
        component:()=>import('@/commponents/NavView.vue'),
    },
    // MV播放页
    {
        path:'/MvPlayView',
        name:'MvPlayView',
        component:()=>import('@/views/MvPlayView.vue'),
    },
]