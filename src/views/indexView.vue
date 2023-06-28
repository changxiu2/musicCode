<template>
    <div class="w-screen p-4 bg-gradient-to-b from-purple-100 to-pink-100">
        <div class="max-w-[1000px] m-auto">
            <!-- 头部 -->
            <header class="h-[30px] flex justify-between box-border mb-[17px] relative">
                <icon icon="mi:menu" color="black" width="25" />
                <div class="w-[70%] relative">
                    <input type="text" class="w-[100%] h-[30px] pl-[35px] border rounded-full text-[14px] outline-[pink] bg-gradient-to-l from-purple-200 to-pink-200" :placeholder="search.showKeyword" v-model="userSearchKeywords">
                    <icon @click.native="searchHandler(userSearchKeywords)" class="absolute top-[7px] left-[12px] z-10" icon="simple-line-icons:magnifier" color="#666" width="17"/>
                    <icon class="absolute top-[7px] right-[12px]" icon="lucide:scan-line" color="#666" width="17" />
                </div>
                <icon icon="iconamoon:microphone-light" color="black" width="25" />
                <!-- 搜索建议 -->
                <ul v-if="searchSuggestList.length" class="absolute top-[40px] left-[15%] w-[70%] p-[1vw] rounded-xl bg-gradient-to-l from-purple-200 to-pink-200 z-10">
                    <li v-for="item in searchSuggestList" :key="item.id" @click="searchHandler(item.name)" class="mb-2">{{ item.name }}</li>
                </ul>
            </header>
            <!-- 轮播图 -->
            <div class="swiper mySwiper h-[35vw] mt-[4.537vw] rounded-xl overflow-hidden">
                <div class="swiper-wrapper">
                    <div class="swiper-slide " v-for="item in bannerList" :key="item.id">
                        <img :src="item.pic" alt="" class="w-[95%] h-[100%] m-auto rounded-xl">
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
            <!-- 菜单 -->
            <div class="scroll-wrapper overflow-hidden mt-6" ref="scroll">
                <ul class="scroll-content flex w-[109vw]">
                    <li class="scroll-item mr-6 w-[10vw] flex flex-col items-center" v-for="item in menuList" :key="item.id">
                        <img :src="item.iconUrl" class="red-image w-[10vw] h-[10vw]" alt="">
                        <p class="text-[1.7vw] text-[#888]">{{item.name}}</p>
                    </li>
                </ul>
            </div>
            <!-- 推荐歌单 -->
            <div class="mt-5 border-b pb-4 border-gray-300">
                <div class="flex justify-between wrapper mb-5">
                    <div class="flex items-center">
                        <span class="font-[700] text-[18px]">推荐歌单</span>
                        <icon icon="ep:arrow-right-bold" color="black" width="15" />
                    </div>
                    <icon icon="ri:more-2-fill" color="black" width="15" />
                </div>
                <div class="scroll-wrapper overflow-hidden" ref="scrollsong">
                    <ul class="scroll-content flex w-[210vw]">
                        <li v-for="item in song" :key="item.id" class="scroll-item w-[32vw] mr-4 ">
                            <img :src="item.picUrl" alt="" class="w-[100%] rounded-2xl">
                            <p class="w-[100%] text-[13px]">{{item.name}}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 新歌新碟 -->
            <div class="mt-5 border-b pb-4 border-gray-300">
                <div class="flex justify-between wrapper mb-5">
                    <div class="flex items-center">
                        <span class="font-[700] text-[18px]">新歌新碟/数字专辑</span>
                        <icon icon="ep:arrow-right-bold" color="black" width="15" />
                    </div>
                    <icon icon="ri:more-2-fill" color="black" width="15" />
                </div>
                <div class="scroll-wrapper overflow-hidden" ref="newsong">
                    <div class="scroll-content flex w-[550vw]">
                        <ul v-for="item in newSong" :key="item.id" class="scroll-item w-[89vw]">
                            <li class=" w-[89vw] h-[14.17vw] mb-4 flex" v-for="item2 in item.resources" :key="item2.id">
                                <img :src="item2.uiElement.image.imageUrl" alt="" class="w-[14.17vw] h-[14.17vw] rounded-xl">
                                <div class="ml-2 ">
                                    <p class="font-[700] text-[#000]">{{ item2.uiElement.mainTitle.title }}</p>
                                    <p class="text-[13px] text-[#666]">{{item2.uiElement.subTitle.title}}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 排行榜 -->
            <div class="mt-5 border-b pb-4 border-gray-300">
                <div class="flex justify-between wrapper mb-4">
                    <div class="flex items-center">
                        <span class="font-[700] text-[18px]">排行榜</span>
                        <icon icon="ep:arrow-right-bold" color="black" width="15" />
                    </div>
                    <icon icon="ri:more-2-fill" color="black" width="15" />
                </div>
                <div class="scroll-wrapper overflow-hidden" ref="scrollcharts">
                    <div class="scroll-content flex w-[550vw]">
                        <ul v-for="item in charts" :key="item.id" class="scroll-item w-[85vw] p-[4vw] mr-2 bg-[#fff] rounded-xl shadow-inner">
                            <li class="flex justify-between mb-5">
                                <div class="font-[700] flex items-center">
                                    <p>{{ item.uiElement.mainTitle?.title }}</p>
                                    <icon icon="ep:arrow-right-bold" color="black" width="15" />
                                </div>
                                <p class="text-[11px] text-[#ccc]">{{ item.uiElement.mainTitle?.titleDesc }}</p>
                            </li>
                            <li class="w-[78vw] h-[14.17vw] mb-4 flex justify-between items-center" v-for="(item2,index) in item.resources" :key="item2.id">
                                <div class="ml-2 flex justify-start items-center">
                                    <img :src="item2.uiElement.image.imageUrl" alt="" class="w-[14.17vw] h-[14.17vw] rounded-xl">
                                    <p class="ml-4 mr-5 font-[800] text-[#cb9d3b]" v-if="index+1 === 1">{{ index+1 }}</p>
                                    <p class="ml-4 mr-5 font-[800] text-[#7b83a5]" v-else-if="index+1 === 2">{{ index+1 }}</p>
                                    <p class="ml-4 mr-5 font-[800] text-[#c07748]" v-else="index+1 === 3">{{ index+1 }}</p>
                                    <div class="w-[38vw]">
                                        <p class="w-[40vw] h-[5vw] font-[700] text-[#000] text-[13px] overflow-hidden whitespace-normal text-ellipsis">{{ item2.uiElement.mainTitle.title }}</p>
                                        <p class="text-[13px] text-[#666]">{{item2.resourceExtInfo?.artists[0].name}}</p>
                                    </div>
                                </div>
                                <p v-if="item2.uiElement.labelText?.text === '热门'" class="text-[#ed4241]">{{item2.uiElement.labelText?.text}}</p>
                                <p v-if="item2.uiElement.labelText?.text === '新晋'" class="text-[#38b284]" >{{item2.uiElement.labelText?.text}}</p>
                                <p v-if="item2.uiElement.labelText?.text === '霸榜'" class="text-[#ed4241]">{{item2.uiElement.labelText?.text}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 热门话题 -->
            <div class="mt-5 border-b pb-4 border-gray-300">
                <div class="flex justify-between wrapper mb-4">
                    <span class="font-[700] text-[18px]">热门话题</span>
                    <icon icon="ri:more-2-fill" color="black" width="15" />
                </div>
                <div class="scroll-wrapper overflow-hidden" ref="scrollsong">
                    <ul class="scroll-content flex w-[210vw]">
                        <li class="scroll-item w-[80.61vw] h-[35.44vw] mr-3 p-3 flex flex-col justify-around box-border rounded-2xl bg-gradient-to-b from-[#a0a07d] to-[#b3b599]">
                            <div>
                                <p class="flex items-center w-[47vw] mb-[1vw]">
                                    <Icon icon="solar:chat-round-like-linear" width="20" color="white" />
                                    <span class="text-[#fff]  ml-[1.3vw]">最令你感动的那首歌</span>
                                </p>
                                <p class="text-[#c9c9c9] text-[13px]">484万热度</p>
                            </div>
                            <div class="flex justify-between w-[100%]">
                                <div class="flex flex-col justify-end">
                                    <p class="text-[#ececec]">Saint_Denis:今日份的感动</p>
                                    <p class="text-[#ececec]">"我希望我们能永远真诚且热烈"</p>
                                </div>
                                <div>
                                    <img src="http://p1.music.126.net/JtMBJSd2ZFtarcVTAYjUFQ==/109951165550061432.jpg" alt="" class="w-[14vw] h-[14vw] rounded-xl">
                                </div>
                            </div>
                        </li>
                        <li class="scroll-item w-[80.61vw] h-[35.44vw] mr-3 p-3 flex flex-col justify-around  box-border rounded-2xl bg-gradient-to-b from-[#937ea2] to-[#aa95b9]">
                            <div>
                                <p class="flex items-center w-[47vw] mb-[1vw]">
                                    <Icon icon="solar:chat-round-like-linear" width="20" color="white" />
                                    <span class="text-[#fff]  ml-[1.3vw]">最令你感动的那首歌</span>
                                </p>
                                <p class="text-[#c9c9c9] text-[13px]">22万热度</p>
                            </div>
                            <div class="flex justify-between w-[100%]">
                                <div>
                                    <p class="text-[#ececec]">辣目小霏:今日份的感动</p>
                                    <p class="text-[#ececec]">you by chance.</p>
                                </div>
                                <div>
                                    <img src="http://p1.music.126.net/JtMBJSd2ZFtarcVTAYjUFQ==/109951165550061432.jpg" alt="" class="w-[14vw] h-[14vw] rounded-xl">
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 音乐日历 -->
            <div class="mt-5 border-b pb-4 border-gray-300">
                <div class="flex justify-between wrapper mb-4">
                    <div class="flex items-center">
                        <span class="font-[700] mr-4 text-[18px]">音乐日历</span>
                        <div class="w-[13.1vw] h-[5.8vw] bg-[#ccc] rounded-3xl flex  justify-center items-center">
                            <span class="text-[12px]">更多</span>
                            <icon icon="ep:arrow-right-bold" color="black" width="12" />
                        </div>
                    </div>
                    <icon icon="ri:more-2-fill" color="black" width="15" />
                </div>
                <ul class="bg-white rounded-2xl shadow-inner">
                    <li v-for="(item,index) in calendar" class="flex items-center justify-around h-[20.78vw]">
                        <div class="text-[13px] text-[#ccc] w-[65.63vw] h-[20vw] border-b border-gray-200 ml-[2vw] flex flex-col justify-center">
                            <div v-if="index===0">
                                <span>今天</span>
                                <span v-if="new Date().getMonth()+1<10">0{{ new Date().getMonth()+1 }}/{{ new Date().getDate() }}</span>
                                <span v-else>{{ new Date().getMonth()+1 }}/{{ new Date().getDate() }}</span>
                            </div>
                            <div v-if="index===1">
                                <span>明天</span>
                                <span v-if="new Date().getMonth()+1<10">0{{ new Date().getMonth()+1 }}/{{ new Date().getDate()+1 }}</span>
                                <span v-else>{{ new Date().getMonth()+1 }}/{{ new Date().getDate() }}</span>
                            </div>
                            <div class="font-[700] text-[#000] text-[15px] w-[91%] h-[20px] overflow-hidden whitespace-normal text-ellipsis">{{ item.title }}</div>
                        </div>
                        <img :src="item.imgUrl" class="w-[14.83vw] h-[14.83vw] rounded-xl" alt="">
                    </li>
                </ul>
            </div>
        </div>
        
    </div>
</template>
<script>
    import _ from 'lodash';
    import BScroll from '@better-scroll/core';
    import {
        fetchHomepageBlockPage,
        fetchHomepageDragonBall,
        fetchPersonalizedLimit,
        fetchCalendar,
        fetchSearchDefault,
        fetchSearchResult,
        fetchSearchSuggest
    } from '@/request/index';
    export default{
        data(){
            return {
                bannerList:[],//banner数据
                menuList:[],//菜单数据
                song:[],//推荐歌单数据
                newSong:[],//新歌新碟数据
                charts:[],//排行榜数据
                hot:[],//热门话题数据
                calendar:[],//音乐日历数据
                userSearchKeywords:'',//
                searchSuggestList:[],//搜索建议
                search:{},
            }
        },
        mounted() {
            this.init(this.$refs.scroll);
            this.init(this.$refs.scrollsong);
            this.init(this.$refs.newsong);
            this.init(this.$refs.scrollcharts);
        },
        beforeDestroy() {
            this.bs.destroy()
        },
        methods:{
            init(name) {
                this.bs = new BScroll(name, {
                    scrollX: true,
                    probeType: 3,
                })
            },
            async searchHandler(keywords){
                const res = await fetchSearchResult({
                    keywords:keywords || this.search.realkeyword
                })
            },
        },
        async created(){
            // 搜索
            const resSearch = await fetchSearchDefault();
            this.search = resSearch.data.data;
            // 轮播图
            const resBanner = await fetchHomepageBlockPage();
            this.bannerList = resBanner.data.data.blocks[0].extInfo.banners;
            // 菜单
            const resMenu = await fetchHomepageDragonBall();
            this.menuList = resMenu.data.data;
            // 推荐歌单
            const resSong = await fetchPersonalizedLimit();
            this.song = resSong.data.result;
            // 新歌新碟
            this.newSong = resBanner.data.data.blocks[5].creatives;
            // 排行榜
            this.charts = resBanner.data.data.blocks[3].creatives;
            // 音乐日历
            const res = await fetchCalendar();
            this.calendar = res.data.data.calendarEvents.slice(0,2);
            console.log(this.calendar);
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
    /* scoped 样式隔离 只作用于当前页面，不影响全局的样式 */
    .swiper-pagination-bullet {
        background-color: #fff;
        --swiper-theme-color: #fff
    }
    img{
        max-width: none;
    }
    /* 滚动条整体样式 */
    .menu::-webkit-scrollbar {
        height: 0px;
        width: 20px;
    }
    .red-image {
        filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='colorize'><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter></svg>#colorize");
    }
    
</style>