<template>
    <div class="w-screen h-screen">
        <!-- 声明式导航 -->
        <!-- 完整写法 需要传参选完整写法 -->
        <!-- <router-link :to="{path:'/Index/123'}">点击跳转</router-link>
        <router-link :to="{path:'/playlistView'}">go to playlistView</router-link>
         -->
        <router-view />
   </div>
</template>
<script>
    // import IndexView from './views/indexView.vue';
    // import PlaylistView from './views/playlistView.vue';
    // import Index from './views/IndexView/Index.vue'
    // import { loadIcon } from '@iconify/vue2';
    // export default {
    //     components: { IndexView, PlaylistView,Index },
    //     data() {
    //         return {
    //             visibleView: 'Index',
    //         };
    //     },
    //     created() {
    //         window.vm = this;
    //     },
    //     beforeCreate(){
    //         window.onhashchange = () =>{
    //             this.visibleView = location.hash.replace('#','')
    //             console.log(this.visibleView);
    //         }
    //     }
    // };
</script>
