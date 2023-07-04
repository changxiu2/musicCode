<template>
    <div class="w-screen h-screen">
        <!-- 声明式导航 -->
        <!-- 完整写法 需要传参选完整写法 -->
        <router-link :to="{path:'/Index/123'}">go to Index</router-link>
        <router-link :to="{path:'/Foo'}">go to Foo</router-link>
        <!-- 简单写法 只需简单跳转 -->
        <!-- <router-link to="/index">go to index</router-link> -->

        <router-view />
        <!-- <h1>{{ a }}</h1> -->
        <!-- 内置组件 component：渲染其他的组件的组件 -->
        <!-- <component :is="currentComponent" /> -->
        <!-- component组件的is指向谁就渲染谁  -->
        <!-- <IndexView v-if="visibleView === 'IndexView'"/> -->
        <!-- <Index v-if="visibleView === 'Index'"/> -->
    </div>
</template>
<script>
    export default {
        created(){
            // setTimeout(()=>{
            //     // 编程式导航
            //     this.$router.push('Index');
            // },1000) 
        }
    }
    // import router from '@/router';
    // export default {
    //     // 混合   弊端：数据来源不清晰，无法直观看到是谁提供的数据
    //     // mixins:[router],
    //     data(){
    //         return {
    //             a:123
    //         };
    //     },
    //     created() {
    //         window.vm = this;
    //     }
    //     // ...router,
    // }


    // import IndexView from './views/indexView.vue';
    // import PlaylistView from './views/playlistView.vue';
    // import Index from './views/IndexView/Index.vue'
    // import { loadIcon } from '@iconify/vue2';
    // const viewMap = {
    //     IndexView,PlaylistView,Index
    // }
    // export default {
    //     // components: { IndexView, PlaylistView,Index },
    //     data() {
    //         return {
    //             visibleView: 'Index',
    //         };
    //     },
    //     // 动态返回一个数据的data
    //     // component === mwthods + data
    //      computed:{
    //         currentComponent(){
    //             // 某一程度上相当于data，保留了计算属性
    //             return viewMap[this.visibleView];
    //         }
    //     },
    //     beforeCreate(){
    //         window.onhashchange = () =>{
    //             this.visibleView = location.hash.replace('#','')
    //             console.log(this.visibleView);
    //         }
    //     },
        // created() {
        //     window.vm = this;
        // }
    // };
</script>
