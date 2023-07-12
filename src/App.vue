<template>
    <div class="w-screen h-screen">
        <router-view />
        <!-- 底部播放组件 -->
        <Player/>
   </div>
</template>
<script>
    import Player from './commponents/Player/Player.vue';
    export default {
        components:{Player},
    }
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
