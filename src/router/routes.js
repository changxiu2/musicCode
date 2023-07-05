import Index from '@/views/IndexView/Index.vue';
import SearchView from '@/views/SearchView/SearchView.vue';
import SinglistDetailsView from '@/views/SinglistDetailsView/SinglistDetailsView.vue';
import playlistView from '@/views/playlistView.vue';
export default [
    // 路径重定向
    {
        path:'/',
        redirect:'/Login',
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
        component:Login,
    },
]