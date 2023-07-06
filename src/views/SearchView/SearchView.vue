<template>
    <div :class="{dark:switchCheckStatus}">
        <div class="w-screen h-[100vh] bg-[#F7F8FC] dark:text-[#fff] dark:bg-[#181B22]">
            <div class="fixed top-0 left-0 bg-[#F7F8FC] dark:bg-[#181B22] z-10 pb-[5vw]">
                <!-- 头部 -->
                <header class="h-[20vw] flex justify-between items-center box-border relative px-[3vw]">
                    <Icon @click.native="IndexFn" class="z-10 w-[6vw] h-[6vw]" icon="ph:arrow-left-bold" />
                    <div class="w-[75vw] relative">
                        <div class="w-[75vw] relative">
                            <input type="text" class="bg-white dark:text-[#fff] dark:bg-[#2E3138] w-[100%] h-[10vw] pl-[10vw] border rounded-full text-[4.47vw] outline-[pink]" :placeholder="search.showKeyword" v-model="userSearchKeywords">
                            <Icon @click.native="searchHandler(userSearchKeywords)" class="absolute w-[4.47vw] h-[4.47vw] top-[3vw] left-[3.68vw] text-[3vw] text-[#666] z-10"  icon="ri:search-line" />
                        </div>
                    </div>
                    <div class="text-[5vw]">搜索</div>
                    <!-- 搜索建议 -->
                    <ul v-if="searchSuggestList.length" class="bg-white dark:bg-[#31333a] dark:text-[#fff] absolute top-[16vw] left-[12%] w-[75%] p-[1.2vw] rounded-2xl text-[3.5vw] z-10">
                        <li v-for="item in searchSuggestList" :key="item.id" @click="searchHandler(item.name)" class="mb-2">{{ item.name }}</li>
                    </ul>
                </header>
                <!-- 导航 -->
                <nav class="flex items-center justify-between mt-[4.17vw] h-[3.64vw]">
                    <div class="w-[25.13vw] flex justify-center" v-for="(item,index) in SingDate" :key="item.id" :style="{'border-left':index === 0 ? 'none' : '0.32vw solid #ccc'}">
                    <Icon class="w-[4.09vw] h-[4.09vw] mr-[2.22vw] text-[#ff3136]" :icon=item.icon />   
                    <p class="text-[3.29vw] font-[800]">{{ item.title }}</p>  
                    </div>
                </nav>
            </div>
            <!-- 猜你喜欢 -->
            <div class="mt-[30.8vw] mb-[5.06vw] p-[3vw]">
                <header class="flex justify-between items-center">
                    <p class="text-[3.73vw] font-[800]">猜你喜欢</p>
                    <Icon @click.native="LoveFn" icon="ic:baseline-refresh" class="w-[5vw] h-[5vw] text-[4vw] text-[#ccc]" />
                </header>
                <ul class="flex items-center mt-[3.11vw]">
                    <li class="bg-white dark:bg-[#2F3239] rounded-[7vw] mr-[3vw] px-[2.93vw] py-[1.95vw] text-[3.36vw]" v-for="item in lovesDate" :key="item.id">{{ item.searchWord }}</li>
                </ul>
            </div>
            <!-- 榜单 -->
            <div class="mb-[10vw] px-[3vw] pb-[5vw] bg-[#F7F8FC] dark:bg-[#181B22]">
                <van-swipe :loop="false" width="270" :show-indicators="false">
                    <van-swipe-item v-for="(item,index) in rankDate" :key="item.id" class="w-[64.3vw]">
                        <div class="w-[64.3vw] mr-[2.87vw] px-[4vw] bg-white dark:bg-[#31333a] rounded-xl">
                            <div class="text-[4.26vw] font-[800] h-[18vw] border-b-[0.32vw] leading-12 flex items-center"> {{ item.name }}
                                <p v-if="index===0" class="text-[2.84vw] w-[12.97vw] h-[5.68vw] rounded-xl ml-[3.02vw] bg-[#F0F5F6] dark:bg-[#393C43] flex items-center justify-center mt-[1vw]">播放<Icon icon="mdi:play" /></p>
                            </div>
                            <ul class="w-[64.3vw] ">
                                <li class="h-[13.56vw] leading-[13.56vw] flex items-center" v-for="(item2,index2) in item.tracks.slice(0,20)">
                                    <p v-if="index2+1<=3" class="text-[#dd4147] w-[3.95vw] text-[3.27vw] font-[800]">{{ index2+1 }}</p>
                                    <p v-if="index2+1>3" class="text-[#9a9a9d] w-[3.95vw] text-[3.27vw] font-[800]">{{ index2+1 }}</p>
                                    <p class="ml-[5.93vw] text-[3.46vw] w-[47.74vw] overflow-hidden whitespace-nowrap text-ellipsis">{{item2.name}}</p>
                                </li>
                            </ul>
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    import store from 'storejs';
    import {
        fetchSearchDefault,
        fetchSearchResult,
        fetchSearchSuggest,
        fetchSearchRank,
        fetchSearchLove
    } from '@/request/index';
    export default {
        data(){
            return{
                switchCheckStatus:null,//控制日/夜间模式
                userSearchKeywords:'',//搜索关键字
                searchSuggestList:[],//搜索建议
                search:{},
                SingDate:[//导航歌手数据
                    {icon:'majesticons:user',title:'歌手'},
                    {icon:'fontisto:apple-music',title:'曲风'},
                    {icon:'fluent-emoji-high-contrast:musical-notes',title:'专区'},
                    {icon:'bxs:microphone-alt',title:'识曲'},
                ],
                // 猜你喜欢数据
                loves:null,
                lovesDate:[],
                rank:[],
                rankDate:[],
            }
        },
        methods:{
            // 返回首页
            IndexFn(){
                this.$router.push('/Index')
            },
            // 更换喜欢
            LoveFn(){
                this.loves.push(...this.loves.splice(0,4));
                this.lovesDate = this.loves.slice(0,4);
            },
            async searchHandler(keywords){
                const res = await fetchSearchResult({
                    keywords:keywords || this.search.realkeyword
                })
            },
        },
        async created(){
            // 深色模式
            this.switchCheckStatus = store.get('switch');
            // 搜索
            const resSearch = await fetchSearchDefault();
            this.search = resSearch.data.data;
            // 猜你喜欢
            const resLove = await fetchSearchLove();
            this.loves = resLove.data.data;
            this.lovesDate = this.loves.slice(0,4);
            // 搜索页面排行榜
            const resSearchRank = await fetchSearchRank();
            this.rank = resSearchRank.data.list;
            const playlist = await Promise.all(this.rank.map(({id}) => axios.get('https://netease-cloud-music-api-five-roan-88.vercel.app/playlist/detail', {params: {id}})));
            this.rankDate = playlist.map(item => item.data.playlist).slice(0,11);
        },
        watch:{
            userSearchKeywords:_.debounce(async function(keywords){
                const res = await fetchSearchSuggest(keywords);
                this.searchSuggestList = res.data.result.songs;
            },300)
        }
    }
</script>
<style scoped>
</style>