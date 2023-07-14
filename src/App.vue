<template>
    <div class="w-screen h-screen">
        <router-view />
        <!-- 底部播放组件 -->
        <Player class="z-[55] h-[13.4vw]" v-if="PlayFn"/>
        <Nav></Nav>
   </div>
</template>
<script>
    import Player from './commponents/Player/Player.vue';
    import NavView from './views/NavView.vue';
    export default {
        components:{Player,NavView},
        computed:{
            PlayFn(){
                return this.$route.path !== '/MusicPlay';
            }
        }
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
