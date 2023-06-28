<template>
    <div class="w-screen h-screen">
        <IndexView v-if="visibleView === 'IndexView'"/>
    </div>
</template>
<script>
    import IndexView from './views/indexView.vue';
    import PlaylistView from './views/playlistView.vue';
    import { loadIcon } from '@iconify/vue2';
    export default {
        components: { IndexView, PlaylistView },
        data() {
            return {
                visibleView: 'IndexView',
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
