<template>
    <div :class="{dark:switchCheckStatus}">
        <!-- <ul class="w-screen bg-white dark:bg-black h-[14vw] px-[8.53vw] flex items-center justify-between">
            <li @click="()=>{this.$router.push('/Index')}" class="flex flex-col justify-center items-center">
                <Icon class="w-[6.65vw] h-[6.65vw]" icon="ri:netease-cloud-music-fill" color="#f53d5b" :rotate="2" />
                <p>首页</p>
            </li>
            <li @click="()=>{this.$router.push('/MvView')}" class="flex flex-col justify-center items-center">
                <Icon class="w-[6.65vw] h-[6.65vw]" icon="fa6-solid:ranking-star" />
                <p>排行榜</p>
            </li>
            <li @click="()=>{this.$router.push('/Info')}" class="flex flex-col justify-center items-center">
                <Icon class="w-[6.65vw] h-[6.65vw]" icon="mingcute:music-line" />
                <p>我的</p>
            </li>
            <li @click="()=>{this.$router.push('/User')}" class="flex flex-col justify-center items-center">
                <Icon class="w-[6.65vw] h-[6.65vw]" icon="iconoir:user-love" />
                <p>关注</p>
            </li>
        </ul> -->
        <van-tabbar v-if="nav" v-model="active" route active-color="#f53d5b" inactive-color="#949ba1">
                <van-tabbar-item replace to="/Index">
                    <template #icon>
                        <Icon class="w-[5vw] h-[5vw]"  icon="tabler:brand-netease-music" />
                    </template>
                    首页
                </van-tabbar-item>
                <van-tabbar-item replace to="/MvView">
                    <template #icon>
                        <Icon class="w-[5vw] h-[5vw]" icon="fa6-solid:ranking-star" />
                    </template>
                    排行榜
                </van-tabbar-item>
                <van-tabbar-item replace to="/Info">
                    <template #icon>
                        <Icon class="w-[5vw] h-[5vw]" icon="mingcute:music-line" />
                    </template>
                    我的
                </van-tabbar-item>
                <van-tabbar-item replace to="/User">
                    <template #icon>
                        <Icon class="w-[5vw] h-[5vw]" icon="iconoir:user-love" />
                    </template>
                    关注
                </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
    import store from 'storejs';
    export default {
        data() {
            return {
                active:0,
                switchCheckStatus:null,//深色模式
            }
        },
        created(){
            // 深色模式
            this.switchCheckStatus = store.get('switch');
        }
    }
</script>