<template>
    <div :class="{dark:switchCheckStatus}">
        <div class="w-screen pb-[10vw] bg-gradient-to-b from-[#8C8B48] to-[#A9A95F] dark:from-[#5C5B2F] dark:to-[#6E6D3D]">
            <div class="w-screen pt-[15vw] pb-[6vw]">
                <!-- 头部 -->
                <header class="w-screen flex h-[11.19vw] bg-[#8C8B48] dark:bg-[#5C5B2F] py-[3.63vw] pl-[5.04vw] pr-[4.09vw] fixed top-0 left-0 z-[3] items-center justify-between mb-[6.21vw]">
                    <div class="w-[68.65vw] text-white flex justify-start items-center">
                        <Icon @click.native="IndexFn" class="w-[5vw] h-[5.6vw] font-[800]" icon="iconoir:arrow-left" />
                        <div v-if="check">
                            <p class=" text-[4.44vw] ml-[4.85vw]">歌单</p>
                        </div>
                        <div v-else class="flex justify-start items-center">
                            <van-notice-bar delay="0.5" scrollable background="#8C8B48" color="#fff" :text="detailsDate.name" class="text-[4.44vw] w-[39vw] h-[5vw] leading-[5vw]"/>
                            <div class="w-[16.6vw] h-[6.67vw] rounded-[5vw] flex justify-center items-center ml-[2.48vw] text-[3.16vw]"  style="background: rgba(255,255,255, 0.2)">
                                <Icon class="w-[3.08vw] h-[3.19vw] mr-[1.35vw]" icon="material-symbols:add-box" />
                                收藏
                            </div>
                        </div>
                    </div>
                    <div class="flex w-[15.81vw] justify-between items-center">
                        <Icon class="w-[5vw] h-[5.6vw] text-white font-[800]" icon="iconoir:search" />
                        <Icon class="w-[5vw] h-[5.6vw] text-white font-[800]" icon="ri:more-2-fill" />
                    </div>
                </header>
                <!-- 歌单详情 -->
                <div class="top-[11.19vw] pl-[3.91vw] pr-[4.09vw]" ref="head">
                    <div v-if="terent">
                        <div class="h-[29.35vw] flex justify-between">
                            <div class="w-[27.77vw] h-[29vw] rounded-xl relative overflow-hidden shadow-md -top-2">
                                <div class="relative">
                                    <div class="w-[25.81vw] h-[27.35vw] absolute top-0 left-[1vw] rounded-2xl" style="background: rgba(255,255,255, 0.2)"></div>
                                    <img class="w-[27.77vw] h-[27.88vw] z-[0] rounded-xl absolute top-[1.3vw] left-0" :src="detailsDate.coverImgUrl" alt="">
                                </div>
                                <div class='absolute top-[2vw] right-[2.5vw] font-[800] text-[#fff] flex items-center'>
                                    <Icon icon="ion:play" width="10" class='text-[#fff] w-[3vw] h-[3vw]' />
                                    <span class='font-[800] text-[2.5vw]'>{{dataTruncation(detailsDate.playCount)}}</span>
                                </div>
                            </div>
                            <div class="w-[60.05vw]">
                                <div class="flex justify-between">
                                    <p class="w-[48.53vw] text-[3.4vw] font-[800] text-white">{{detailsDate.name}}</p>
                                    <div @click="lb" class="w-[5.64vw] h-[5.64vw] rounded-[50%] flex justify-center items-center" style="background: rgba(255,255,255, 0.2)">
                                        <Icon class="text-white w-[3vw] h-[3vw] opacity-[1]" icon="ep:arrow-down-bold" />
                                    </div>
                                </div>
                                <div class="h-[6.88vw] mt-[3.05vw] flex items-center">
                                    <img class="w-[6.88vw] h-[6.88vw] rounded-[50%]" :src="detailsDate.creator?.avatarUrl" alt="">
                                    <p class="ml-[2.94vw] mr-[1.24vw] text-[3.11vw] text-[#e1c1af]">{{ detailsDate.creator?.nickname }}</p>
                                    <div class="h-[5.15vw] w-[12.17vw] flex items-center justify-center text-white rounded-[5vw]" style="background: rgba(255,255,255, 0.2)">
                                        <Icon class="w-[2.49vw] h-[2.58vw] font-[800]" icon="ic:twotone-add" />
                                        <span class="text-[2.58vw] mt-[0.5vw]">关注</span>
                                    </div>
                                </div>
                                <ul class="h-[6.32vw] flex mt-[1.69vw] text-white">
                                    <li v-for="item in tags" :key="item.id" class="flex justify-center items-center text-[2.82vw] px-[1.47vw] py-[0.9vw] mr-[1.69vw] rounded-[1vw] font-[800]" style="background: rgba(255,255,255, 0.2)">
                                        <span>{{item}}</span>
                                        <Icon icon="ep:arrow-right-bold" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="mt-[3.82vw] mb-[5.6vw] text-[3.39vw] flex items-center text-[#e2b2ad]">
                            <p class="mr-[2.13vw] overflow-hidden whitespace-nowrap text-ellipsis">{{detailsDate.description}}</p>
                            <Icon class="w-[8.49vw] h-[3.49vw]" icon="ep:arrow-right-bold" />
                        </div>
                    </div>
                    <div v-show="!terent">
                        <div class="flex justify-between mb-[2.82vw]">
                            <p class="text-[3.5vw] text-[#dbcea3]">喜欢这个歌单的用户也听了</p>
                            <span @click="lb" class="w-[5.64vw] h-[5.64vw] rounded-[50%] flex justify-center items-center" style="background: rgba(255,255,255, 0.2)">
                                <Icon icon="ep:arrow-up"  class="text-white w-[3vw] h-[3vw] opacity-[1]"  />
                            </span>
                        </div>
                        <div class="scroll-wrapper overflow-hidden text-white" ref="song">
                            <div class="scroll-content w-[158vw] flex justify-around">
                                <div v-for="item in musicBanner" :key="item.tom" class="w-[28vw] scroll-item ">
                                    <div class="h-[31.38vw] mr-[2.5vw]">
                                        <div class="relative">
                                            <div class="w-[25.81vw] h-[27.35vw] absolute top-0 left-[1vw] rounded-2xl" style="background: rgba(255,255,255, 0.2)"></div>
                                            <img class="w-[27.65vw] h-[27.65vw] z-[2] rounded-xl absolute top-[1.3vw] left-0" :src="item.coverImgUrl" alt="">
                                        </div>
                                    </div>   
                                    <p class="text-[3.16vw]">{{item.name}}</p>
                                </div>
                            </div>
                         
                        </div>
                    </div>
                    <!-- 分享收藏评论 -->
                    <ul class="flex justify-around items-center text-white font-[800] text-[2.84vw]">
                        <li class="w-[28.6vw] h-[10.12vw] flex items-center justify-center rounded-[6vw]" style="background: rgba(255,255,255, 0.2)">
                            <Icon class="w-[5.08vw] h-[5.19vw]" icon="ion:arrow-redo" />
                            <p class="ml-[2.04vw]">{{detailsDate.shareCount}}</p>
                        </li>
                        <li class="w-[28.6vw] h-[10.12vw] flex items-center justify-center rounded-[6vw]" style="background: rgba(255,255,255, 0.2)">
                            <Icon class="w-[5.08vw] h-[5.19vw]" icon="ant-design:message-filled" />
                            <p class="ml-[2.04vw]">{{detailsDate.commentCount}}</p>
                        </li>
                        <li class="w-[28.6vw] h-[10.12vw] flex items-center justify-center rounded-[6vw] bg-[#f9393f]">
                            <Icon class="w-[5.08vw] h-[5.19vw]" icon="material-symbols:add-box" />
                            <p class="ml-[2.04vw]">{{detailsDate.subscribedCount}}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 歌曲列表 -->
            <div class="w-screen dark:text-white">
                <div class="w-screen bg-[#8C8B48] dark:bg-opacity-0 sticky top-[10.4vw]">
                    <!-- bg-gradient-to-b from-[#F7F7EF] to-[#FFFFFD] -->
                    <header class="w-screen h-[10.66vw] relative top-[1vw] bg-white dark:bg-[#7D7C4E] pl-[3.11vw] pr-[4.88vw] flex items-center justify-between rounded-t-[4vw]">
                        <div @click="playAll" class="flex">
                            <div class="w-[6.22vw] h-[6.22vw] rounded-[50%] bg-[#ff3a3c] flex items-center justify-center mr-[2.75vw]">
                                <Icon class="w-[4vw] h-[4vw] ml-[0.6vw] text-white" icon="ion:play" />
                            </div>
                            <div class="w-[27.62vw] flex items-center">
                                <p class="text-[3.91vw] font-[800]">播放全部</p>
                                <p class="text-[3vw] ml-[1.78vw] mt-[1.2vw]">({{ detailsDate.trackIds?.length }})</p>
                            </div>
                        </div>
                        <div class="flex font-[800]">
                            <Icon class="w-[4.44vw] h-[4.53vw] mr-[4.88vw]" icon="circum:save-down-1" />
                            <Icon class="w-[3.91vw] h-[4.53vw]" icon="solar:list-down-minimalistic-bold" />
                        </div>
                    </header>
                </div>
                <ul class="pl-[3.11vw] pr-[4.88vw] mb-[5vw] bg-white dark:bg-white dark:bg-opacity-[0.1] rounded-b-[4vw]">
                    <li v-for="(item,index) in singDate" :key="item.id" class="h-[17.94vw] flex items-center justify-between">
                        <div @click="playId(item)" class="flex items-center">
                            <img v-if="item.id === $player._currentTrack.id" class="redImage" src="/static/wave.gif" alt="">
                            <span v-else class="text-[#999898] font-[800] w-[5.3vw] text-center mr-[2vw] text-[3.02vw]">{{ index+1 }}</span>
                            <div class="flex flex-col w-[63.04vw]">
                                <p :class="item.id === $player._currentTrack.id ? 'text-[#D15B57]' : ''" class="text-[4.09vw] truncate">{{ item.name }}</p>
                                <div>
                                    <div class="text-[2.93vw] text-[#908f97] dark:text-[#BABAA2] flex truncate">
                                        <p v-for="(item2,index) in item.ar" :key="item2.id">
                                            <!-- <span v-if="index>0">{{ item2.name }}\</span> -->
                                            <span class="truncate">{{ item2.name }}</span>
                                        </p>
                                        <span class="mx-[0.5vw] truncate">-</span>
                                        <p class="truncate">{{ item.al.name }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <Icon class="w-[4.44vw] h-[4.17vw] mr-[4.88vw] text-[#b1b0b0]" icon="jam:play-square" color="#ccc" />
                            <Icon class="w-[3.91vw] h-[4.17vw] text-[#b1b0b0]" icon="ri:more-2-fill" color="#ccc" />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import store from 'storejs';
    import BScroll from '@better-scroll/core'
    import {fetchSingDetails, fetchSingQus,musicSlider} from '@/request/index';
    export default {
        data(){
            return {
                switchCheckStatus:null,//深色模式
                detailsDate:{},//头部歌单信息数据
                tags:[],//标签
                singDate:{},//歌单歌曲数据
                musicBanner:[],//歌单类似推荐数据
                terent:true,
                display:false,
                check:true,//头部歌单名滚动
            }
        },
        async created(){
            // 深色模式
            this.switchCheckStatus = store.get('switch');
            // 头部数据
            // console.log(this.$route);
            const resDetails = await fetchSingDetails(this.$route.query.id);
            this.detailsDate = resDetails.data.playlist;
            this.tags = resDetails.data.playlist.algTags;
            // this.tags = resDetails.data.playlist.tags
            // 歌曲列表数据
            const resSingDates = await fetchSingQus(this.$route.query.id);
            this.singDate = resSingDates.data.songs;
            // 存歌曲
            store.set('songs',resSingDates.data.songs);
            console.log(this.singDate);
            // 小轮播数据
            const resMinBanner = await musicSlider(this.$route.query.id)
            this.musicBanner = resMinBanner.data.playlists
            // console.log(this.musicBanner);
        },
        beforeDestroy() {
            this.bs.destroy();
            window.removeEventListener('scroll',this.handleScroll);
        },
        updated() {
            this.bs.refresh();
        },
        methods:{
            // 返回首页
            IndexFn(){
                this.$router.push('/Index')
            },
            // 点赞收藏数转换
            dataTruncation(playVolume) {
                if (playVolume > 100000000) {
                    return `${Math.floor(playVolume / 100000000)}亿`;
                } else if (playVolume > 100000) {
                    return `${Math.floor(playVolume / 10000)}万`;
                } else {
                    return playVolume;
                }
            },
            // 歌单推荐切换
            lb(){
                this.terent = !this.terent;
            },
            handleScroll(){
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                // 如果滚动高度超过阈值，则固定在顶部，否则取消固定
                this.check = scrollTop > this.$refs.head.offsetHeight/2 ? false : true;
            },
            // 滚动条插件
            init(name) {
                this.bs = new BScroll(name, {
                    scrollX: true,
                    scrollY: true,
                    probeType: 3,
                    click:true,
                })
            },
            // 从头播放
            playAll() {
                this.$player.replacePlaylist(this.singDate.map((song) => song?.id),'','')
            },
            playId(item){
                this.$player.replacePlaylist(this.singDate.map((song) => song.id),'','',item.id)
            }
        },
        mounted(){
            new BScroll(this.$refs.song);
            this.init(this.$refs.head);
            this.init(this.$refs.song);
            window.addEventListener('scroll',this.handleScroll);
        },
    }
</script>