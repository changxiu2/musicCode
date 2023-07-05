<template>
    <div class="">
        <div class="w-screen h-[80.07vw] pl-[3.91vw] pr-[4.09vw] bg-gradient-to-b from-[#8e5f4a] to-[#a97660]">
            <!-- 头部 -->
            <header class="flex h-[11.19vw] pt-[3.63vw] items-center justify-between pl-[1.24vw] mb-[6.21vw]">
                <div class="w-[20.65vw] flex justify-between items-center">
                    <Icon @click.native="IndexFn" class="w-[5vw] h-[5.6vw] text-white font-[800]" icon="iconoir:arrow-left" />
                    <p class="text-white text-[4.44vw]">歌单</p>
                </div>
                <div class="flex w-[15.81vw] justify-between items-center">
                    <Icon class="w-[5vw] h-[5.6vw] text-white font-[800]" icon="iconoir:search" />
                    <Icon class="w-[5vw] h-[5.6vw] text-white font-[800]" icon="ri:more-2-fill" />
                </div>
            </header>
            <!--  -->
            <div class="h-[28.4vw] flex justify-between">
                <div class="w-[27.77vw] h-[27.88vw] bg-red-400 relative rounded-2xl overflow-hidden">
                    <img class="w-[27.77vw] h-[27.88vw]" :src="detailsDate.coverImgUrl" alt="">
                    <div class='absolute top-[2vw] right-[2.5vw] font-[800] text-[#fff] flex items-center'>
                        <Icon icon="ion:play" width="10" class='text-[#fff] w-[3vw] h-[3vw]' />
                        <span class='font-[800] text-[2.5vw]'>{{dataTruncation(detailsDate.playCount)}}</span>
                    </div>
                </div>
                <div class="w-[60.05vw]">
                    <div class="flex justify-between items-center">
                        <p class="w-[48.53vw] text-[4.29vw] font-[800] text-white">{{detailsDate.name}}</p>
                        <div class="w-[5.64vw] h-[5.64vw] rounded-[50%] flex justify-center items-center" style="background: rgba(255,255,255, 0.2)">
                            <Icon class="text-white w-[2.71vw] h-[1.69vw] opacity-[1]" icon="ep:arrow-down-bold" />
                        </div>
                    </div>
                    <div class="h-[6.88vw] mt-[3.05vw] flex items-center">
                        <img class="w-[6.88vw] h-[6.88vw] rounded-[50%]" :src="detailsDate.creator.avatarUrl" alt="">
                        <p class="ml-[2.94vw] mr-[1.24vw] text-[3.11vw] text-[#e1c1af]">{{ detailsDate.creator.nickname }}</p>
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
                <Icon class="w-[2.49vw] h-[2.49vw]" icon="ep:arrow-right-bold" />
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
        <div class="w-screen bg-red-300 ">
            <header class="w-screen h-[10.66vw] pl-[3.11vw] pr-[4.88vw] flex items-center justify-between rounded-t-[3vw] relative top-[-3.02vw] left-0 bg-[#e6e8e0]">
                <div class="flex">
                    <div class="w-[6.22vw] h-[6.22vw] rounded-[50%] bg-[#ff3a3c] flex items-center justify-center mr-[2.75vw]">
                        <Icon class="w-[2.31vw] h-[2.49vw] text-white" icon="ion:play" />
                    </div>
                    <div class="w-[27.62vw] flex justify-between items-center">
                        <p class="text-[3.91vw] font-[800]">(123)</p>
                        <p class="text-[3vw]">(123)</p>
                    </div>
                </div>
                <div class="flex">
                    <Icon icon="circum:save-down-1" />
                    <Icon icon="solar:list-down-minimalistic-bold" />
                </div>
            </header>
            <ul class="mt-[11vw]">
                <li class="h-[21.94vw] flex items-center justify-between"></li>
            </ul>
        </div>
    </div>
</template>
<script>
    import {fethchSingDetails} from '@/request/index';
    export default {
        data(){
            return {
                detailsDate:{},
                tags:[],//标签
            }
        },
        async created(){
            // console.log(this.$route);
            const resDetails = await fethchSingDetails(this.$route.query.id);
            this.detailsDate = resDetails.data.playlist;
            // this.tags = resDetails.data.playlist.algTags
            this.tags = resDetails.data.playlist.tags
            let data= resDetails.data.playlist
            console.log(data);
            // console.log(this.detailsDate);
        },
        methods:{
            // 返回首页
            IndexFn(){
                this.$router.push('/Index')
            },
            dataTruncation(playVolume) {
                if (playVolume > 100000000) {
                    return `${Math.floor(playVolume / 100000000)}亿`;
                } else if (playVolume > 100000) {
                    return `${Math.floor(playVolume / 10000)}万`;
                } else {
                    return playVolume;
                }
            },
        }

    }
</script>