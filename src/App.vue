<template>
    <div class="w-screen h-screen">
        <router-view />
        <!-- 底部播放组件 -->
        <div v-if="Div" class="w-screen fixed bottom-[-1vw] left-0 z-10 bg-white">
            <Player class="z-[30] h-[13.4vw]" v-if="PlayFn"/>
            <!-- 导航 -->
            <van-tabbar v-model="active" v-if="nav" route :fixed="false">
                <van-tabbar-item replace to="/Index">
                    <template #icon>
                        <span class="flex items-center w-[5.75vw] h-[5.75vw] rounded-[50%] p-[1vw]">
                            <Icon class="w-[5vw] h-[5vw]"  icon="tabler:brand-netease-music" />
                        </span>
                        </template>
                    首页
                </van-tabbar-item>
                <van-tabbar-item replace to="/MvView">
                    <template #icon>
                        <span class="flex items-center w-[5.75vw] h-[5.75vw] rounded-[50%] p-[1vw]">
                            <Icon class="w-[5vw] h-[5vw]" icon="fa6-solid:ranking-star" />
                        </span>
                        </template>
                    排行榜
                </van-tabbar-item>
                <van-tabbar-item replace to="/User">
                    <template #icon>
                        <span class="flex items-center w-[5.75vw] h-[5.75vw] rounded-[50%] p-[1vw]">
                            <Icon class="w-[5vw] h-[5vw]" icon="mingcute:music-line" />
                        </span>
                        </template>
                    我的
                </van-tabbar-item>
                <van-tabbar-item replace to="/MvPlayView">
                    <template #icon>
                        <span class="flex items-center w-[5.75vw] h-[5.75vw] rounded-[50%] p-[1vw]">
                            <Icon class="w-[5vw] h-[5vw]" icon="iconoir:user-love" />
                        </span>
                        </template>
                    关注
                </van-tabbar-item>
            </van-tabbar>
        </div>
   </div>
</template>
<script>
    import Player from './commponents/Player/Player.vue';
    export default {
        data(){
            return{
                active:0,
            }
        },
        components:{Player},
        computed:{
            PlayFn(){
                return this.$route.path !== '/MusicPlay' && this.$route.push !== '/Login' && this.$route.path !== '/MvPlayView' && this.$route.path !== '/Info';
            },
            nav(){
                return this.$route.path !== '/User' && this.$route.path !== '/Info' && this.$route.path !== '/MvPlayView' && this.$route.path !== '/SinglistDetailsView' && this.$route.path !== '/MusicPlay' && this.$route.path !== '/Login' && this.$route.path !== '/MvView';
            },
            Div(){
                return this.$route.path !== '/MvPlayView';
            }
        }
    }
</script>
<style>
    .van-tabbar-item--active .van-tabbar-item__icon span{
        background-color: #e94855 !important;
    }
    .van-tabbar-item--active .van-tabbar-item__icon{
        color: #fff !important;
    }
    .van-tabbar-item--active .van-tabbar-item__text{
        color: #e94855 !important;
    }
</style>
