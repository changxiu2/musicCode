<template>
    <div class="w-screen h-screen">
        <!-- <IndexView v-if="visibleView === 'IndexView'"/> -->
        <Index v-if="visibleView === 'Index'"/>
    </div>
</template>
<script>
    import IndexView from './views/indexView.vue';
    import PlaylistView from './views/playlistView.vue';
    import Index from './views/IndexView/Index.vue'
    import { loadIcon } from '@iconify/vue2';
    export default {
        components: { IndexView, PlaylistView,Index },
        data() {
            return {
                visibleView: 'Index',
            };
        },
        created() {
            window.vm = this;
        },
        beforeCreate(){
            window.onhashchange = () =>{
                this.visibleView = location.hash.replace('#','')
                console.log(this.visibleView);
            }
        }
    };
</script>
