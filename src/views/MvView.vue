<template>
    <div :class="{dark:switchCheckStatus}">
        <div class="w-[100vw] h-[100%] dark:bg-[#151515] dark:text-white pb-[27vw]">
            <!-- 头部 -->
            <header class="w-screen z-[2] h-[15.46vw] px-[4.7vw] fixed bg-white dark:bg-[#2C2C2C] top-0 left-0 flex items-center justify-start text-[4.85vw] font-[800] mb-[5vw]">
                <Icon @click.native="IndexFn" class="w-[5.98vw] h-[5.6vw] font-[800] mr-[5.42vw]" icon="icon-park-outline:arrow-left" />
                <p>MV排行榜</p>
            </header>
            <!-- 榜单 -->
            <van-tabs v-model="active" @change="changeTab" swipeable animated sticky offset-top="15.46vw">
                <van-tab v-for="item in nav" :key="item.id" :title="item" title-style="text-[#565656] font-[800]">
                    <div class="px-[4.7vw] mt-[20vw]">
                        <p class="flex items-center text-[3.95vw] font-[800] mt-[8.69vw] mb-[5.42vw]">
                            <span>更新时间：{{ new Date().getMonth()+1 }}月{{ new Date().getDate() }}日</span>
                            <Icon class="w-[3.95vw] h-[3.95vw] ml-[1.47vw] text-[#bbb]" icon="icon-park-outline:attention" :rotate="2" />
                        </p>
                        <div v-for="(item2,index) in MvList" :key="item2.id">
                            <div @click="showThisVideo(item2.id)" class="relative">
                                <img class="w-[91.2vw] h-[51.13vw] rounded-[2.3vw]" :src="item2.cover" alt="">
                                <div class='absolute top-[2vw] right-[2.5vw] font-[800] text-[#fff] flex items-center'>
                                    <Icon icon="ion:play" width="10" class='text-[#fff] w-[3vw] h-[3vw]' />
                                    <p>{{ dataTruncation(item2.playCount) }}</p>
                                </div>
                            </div>
                            <div class="flex items-center justify-start h-[18.74vw]">
                                <div class="w-[9.59vw] flex flex-col justify-center relative">
                                    <p v-if="index+1<=3" class="text-[4.74vw] font-[900] text-[#f73b40]">{{covering(index+1)}}</p>
                                    <p v-else class="text-[4.74vw] font-[900] text-[#919191]">{{covering(index+1)}}</p>
                                    <!-- 排名提示 -->
                                    <div class="flex relative items-center">
                                        <span v-if="item2.lastRank == index + 1" class="text-[#898989] flex" >
                                            <Icon icon="ci:line-m" :rotate="1"/></span>
                                        <span v-else-if="item2.lastRank <= index + 1 && item2.lastRank != -1" class="text-[#71b3e2] flex text-[2.5vw] items-center" >
                                            <Icon icon="ph:triangle-fill" :rotate="2" /><i>{{   index + 1 - item2.lastRank }}</i>
                                            </span>
                                        <span v-else-if="item2.lastRank >= index + 1" class="text-[#e66263] flex text-[2.5vw] items-center" >
                                            <Icon icon="ph:triangle-fill" />
                                            <i>{{ item2.lastRank - (index + 1) }}</i>
                                        </span>
                                        <span v-else class="text-[#6d9c65] text-[2vw] absolute right-[4vw] bottom-[-2.5vw]" >NEW</span>
                                    </div>
                                </div>
                                <!-- item2.lastRank -  -->
                                <div class="flex flex-col">
                                    <p class="w-[77.99vw] truncate text-[4.18vw] font-[700]">{{ item2.name }}</p>
                                    <p class="text-[3.05vw] text-[#9e9e9e]">{{ item2.artistName }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>
    import store from 'storejs';
    import { fetchMvList } from '@/request';
    export default {
        data() {
            return {
                switchCheckStatus:null,//深色模式
                active: 0,
                nav:['内地','港台','欧美','韩国','日本'],
                MvList:[],
                initial:'内地',
            }
        },
        async created() {
            // 深色模式
            this.switchCheckStatus = store.get('switch');
            // 数据
            const res = await fetchMvList(this.initial);
            this.MvList = res.data.data;
        },
        methods:{
            // 返回首页
            IndexFn(){
                this.$router.push('/Index')
            },
            changeTab(title) {
                this.initial = this.nav[title];
            },
            // 个位数前加0补位
            covering(num){
                return num<10 ? '0'+num : num;
            },
            // 转换点击数
            dataTruncation(playVolume) {
                if (playVolume > 100000000) {
                    return `${Math.floor(playVolume / 100000000)}亿`;
                } else if (playVolume > 10000) {
                    return `${Math.floor(playVolume / 10000)}万`;
                } else {
                    return playVolume;
                }
            },
            // 跳转到MV播放页面
            showThisVideo(id){
                this.$router.push({name:'MvPlayView',params:{id}})
            },
        },
        watch: {
            initial(value) {
                fetchMvList(value).then((res) => {
                    this.MvList = res.data.data;
                });
            },
        },
    }
</script>
<style>
    /* 导航深色模式 */
    .dark .van-tabs__wrap .van-tabs__nav{
        background-color: #2C2C2C !important;
    }
    /* 导航浅色模式 */
    .van-tabs__wrap .van-tabs__nav{
        background-color: #fff !important;
    }
    /* 导航字体模式 */
    .van-tab .van-tab__text--ellipsis{
        font-size:4vw;
        color:#656565;
    }
    /* 导航红色底杠 */
    .van-tabs__nav .van-tabs__line {
        bottom: 22px;
        left: 0;
        z-index: 1;
        width: 26px;
        height: 5px;
    }
    /* 选中标题加粗 */
    .van-tab--active .van-tab__text.van-tab__text--ellipsis{
        font-weight: 800;
        color: #000;
    }
    .van-tabs .van-sticky--fixed {
        z-index: 10 !important;
    }
</style>