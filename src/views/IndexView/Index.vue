<template>
    <div :class="{dark:switchCheckStatus}">
        <h1 @click="$store.mutations.increase">Index view{{ count }}</h1>
        <div class="w-screen p-[3vw] dark:from-[#2c1a2b] dark:text-[#fff] dark:to-[#1a1c23] bg-gradient-to-b from-[#E6E6FB] to-[#f1f1f1] opacity-0.5" >
            <!-- 头部 -->
            <header class="h-[20vw] flex justify-between items-center box-border relative">
                <icon @click.native="drawerVisible = !drawerVisible" class="z-10 w-[6vw] h-[6vw]" icon="mi:menu"/>
                <div class="w-[75vw] relative">
                    <input type="text" class="dark:from-[#fff] dark:text-[#000] dark:to-[#fff] w-[100%] h-[10vw] pl-[10vw] border rounded-full text-[4.47vw] outline-[pink] bg-gradient-to-l from-purple-200 to-pink-200" :placeholder="search.showKeyword" v-model="userSearchKeywords">
                    <icon @click.native="searchHandler(userSearchKeywords)" class="absolute w-[4.47vw] h-[4.47vw] top-[3vw] left-[3.68vw] z-10" icon="simple-line-icons:magnifier" color="#666" width="17"/>
                    <icon class="absolute top-[3vw] w-[4.47vw] h-[4.47vw] right-[3.68vw]" icon="lucide:scan-line" color="#666" width="17" />
                </div>
                <icon icon="iconamoon:microphone-light" class="w-[6vw] h-[6vw]" />
                <!-- 搜索建议 -->
                <ul v-if="searchSuggestList.length" class="dark:from-[#fff] dark:text-[#000] dark:to-[#fff] absolute top-[16vw] left-[12%] w-[75%] p-[1.2vw] rounded-2xl text-[3vw]  bg-gradient-to-l from-purple-200 to-pink-200 z-10">
                    <li v-for="item in searchSuggestList" :key="item.id" @click="searchHandler(item.name)" class="mb-2">{{ item.name }}</li>
                </ul>
            </header>
            <!-- 轮播图 -->
            <div class="h-[36vw] flex justify-center items-center">
                <van-swipe class="w-[90vw] my-swipe mt-[4.537vw] rounded-2xl overflow-hidden" :autoplay="3000" indicator-color="white">
                    <van-swipe-item v-for="item in bannerList" :key="item"> 
                        <img :src="item.pic" class="w-[100%] h-[100%] mx-auto">
                    </van-swipe-item>
                </van-swipe>
            </div>
            <!-- 菜单 -->
            <div class="scroll-wrapper overflow-hidden mt-6" ref="scroll">
                <div class="scroll-content flex w-[175vw] relative">
                    <menuView v-for="item in menuList" :key="item.id" :menu="item" class="scroll-item mr-[5vw] w-[16vw] flex flex-col items-center"></menuView>
                    <span class="dark:text-[#1a1c23] absolute top-[6.2vw] left-[6.8vw] text-[3.5vw] text-[#fff] font-[800]" style="pointer-events: auto;">{{ new Date().getDate() }}</span>
                </div>
            </div>
            <!-- 推荐歌单 -->   
            <div class="mt-5 border-b pb-4 border-gray-300">
                <div class="h-[12vw] flex justify-between items-center wrapper">
                    <div class="flex items-center">
                        <span class="font-[700] text-[4vw]">推荐歌单</span>
                        <icon icon="ep:arrow-right-bold" class="w-[4vw] h-[4vw]" />
                    </div>
                    <icon @click.native="drawerSongVisible = !drawerSongVisible,info='推荐歌单'" icon="ri:more-2-fill" class="w-[4vw] h-[6vw]" />
                </div>
                <div class="ml-[4.5vw] mt-[4.722vw] scroll-wrapper overflow-hidden" ref="scrollsong">
                    <div class="flex scroll-content w-[200vw]">
                        <div class='relative mr-[2.5vw]'>
                            <div class='w-[30vw] relative z-[1]'>
                            <div class='w-[30vw] h-[30vw] rounded-2xl overflow-hidden relative'>
                                <transition name='abc'  v-for=" (item,index) in songItemSize" :key="item">
                                    <div v-if='animateVisible === index' class='absolute top-0 left-0 mb-[1.3vw]"'>
                                        <img :src='item.uiElement.image.imageUrl' alt='' class='w-[30vw] h-[30vw] rounded-2xl'/>
                                        <Icon icon="ion:play" width="10" class='absolute bottom-[2vw] right-[2.5vw] text-[#fff] w-[5vw] h-[5vw]'/>
                                        <div class='absolute top-[2vw] right-[2.5vw] font-[800] text-[#fff] flex items-center'>
                                            <Icon icon="ion:play" width="10" class='text-[#fff] w-[3vw] h-[3vw]' />
                                            <span class='font-[800] text-[2.5vw]'>{{dataTruncation(item.resourceExtInfo?.playCount)}}</span>
                                        </div>
                                    </div>
                                </transition>
                            </div>
                            <p class='text-[3.2vw] scroll-item mt-[3vw]'>{{resourceData}}</p>
                            </div>
                        </div>
                        <RecommondPlaylistItem class="scroll-item mr-[2.5vw] w-[32.13vw]" v-for="item in songItem" :key="item.id" :source="item"/>
                    </div>
                </div>
            </div>
            <!-- 新歌新碟 -->
            <div class="mt-5 border-b pb-4 border-gray-300">
                <div class="h-[12vw] flex justify-between items-center wrapper">
                    <div class="flex items-center">
                        <span class="font-[700] text-[4vw]">新歌新碟/数字专辑</span>
                        <icon icon="ep:arrow-right-bold" class="w-[4vw] h-[4vw]" />
                    </div>
                    <icon @click.native="drawerSongVisible = !drawerSongVisible,info='新歌新碟/数字专辑'" icon="ri:more-2-fill" class="w-[4vw] h-[6vw]" />
                </div>
                <div class="scroll-wrapper overflow-hidden" ref="newsong">
                    <div class="scroll-content flex w-[630vw]">
                        <newSongView v-for="item in newSong" :key="item.id" :newSongItem="item"/>
                    </div>
                </div>
            </div>
            <!-- 排行榜 -->
            <div class="mt-5 border-b pb-4 border-gray-300">
                <div class="h-[12vw] flex justify-between items-center wrapper">
                    <div class="flex items-center">
                        <span class="font-[700] text-[4vw]">排行榜</span>
                        <icon icon="ep:arrow-right-bold" class="w-[4vw] h-[4vw]" />
                    </div>
                    <icon @click.native="drawerSongVisible = !drawerSongVisible,info='排行榜'" icon="ri:more-2-fill" class="w-[4vw] h-[6vw]" />
                </div>
                <div class="scroll-wrapper overflow-hidden" ref="scrollcharts">
                    <div class="scroll-content flex w-[550vw]">
                        <chartView v-for="item in charts" :key="item.id" :chart="item"/>
                    </div>
                </div>
            </div>
            <!-- 热门话题 -->
            <div class="mt-5 border-b pb-4 border-gray-300">
                <div class="h-[12vw] flex justify-between items-center wrapper">
                    <span class="font-[700] text-[4vw]">热门话题</span>
                    <icon @click.native="drawerSongVisible = !drawerSongVisible,info='热门话题'" icon="ri:more-2-fill" class="w-[4vw] h-[6vw]" />
                </div>
                <div class="h-[28vw] scroll-wrapper overflow-hidden" ref="hot">
                    <ul class="scroll-content flex w-[210vw]">
                        <li class="scroll-item w-[80.61vw] mr-3 p-3 flex flex-col justify-around box-border rounded-2xl bg-gradient-to-b from-[#a0a07d] to-[#b3b599]">
                            <div>
                                <p class="flex items-center w-[47vw] mb-[1vw]">
                                    <Icon icon="solar:chat-round-like-linear" color="white" class="text-[3vw]" />
                                    <span class="text-[#fff] text-[3.5vw] ml-[1.3vw]">最令你感动的那首歌</span>
                                </p>
                                <p class="text-[#c9c9c9] text-[2.6vw]">484万热度</p>
                            </div>
                            <div class="flex justify-between w-[100%]">
                                <div class="flex flex-col justify-end">
                                    <p class="text-[#ececec] text-[2.6vw]">Saint_Denis:今日份的感动</p>
                                    <p class="text-[#ececec] text-[2.6vw]">"我希望我们能永远真诚且热烈"</p>
                                </div>
                                <div>
                                    <img src="http://p1.music.126.net/JtMBJSd2ZFtarcVTAYjUFQ==/109951165550061432.jpg" alt="" class="w-[14vw] h-[14vw] rounded-xl">
                                </div>
                            </div>
                        </li>
                        <li class="scroll-item w-[80.61vw] mr-3 p-3 flex flex-col justify-around  box-border rounded-2xl bg-gradient-to-b from-[#937ea2] to-[#aa95b9]">
                            <div>
                                <p class="flex items-center w-[47vw] mb-[1vw]">
                                    <Icon icon="solar:chat-round-like-linear" width="20" color="white" />
                                    <span class="text-[#fff] text-[3.5vw] ml-[1.3vw]">最令你感动的那首歌</span>
                                </p>
                                <p class="text-[#c9c9c9] text-[2.6vw]">22万热度</p>
                            </div>
                            <div class="flex justify-between w-[100%]">
                                <div class="flex flex-col justify-end">
                                    <p class="text-[#ececec] text-[2.6vw]">辣目小霏:今日份的感动</p>
                                    <p class="text-[#ececec] text-[2.6vw]">you by chance.</p>
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
                <div class="h-[12vw] flex justify-between items-center wrapper">
                    <div class="flex items-center">
                        <span class="font-[700] mr-4 text-[4vw]">音乐日历</span>
                        <div class="w-[13.1vw] h-[5.8vw] bg-[#ccc] opacity-100 dark:opacity-5 rounded-3xl flex  justify-center items-center">
                            <span class="text-[3vw]">更多</span>
                            <icon icon="ep:arrow-right-bold" width="12" />
                        </div>
                    </div>
                    <icon @click.native="drawerSongVisible = !drawerSongVisible,info='音乐日历'" icon="ri:more-2-fill" class="w-[4vw] h-[6vw]" />
                </div>
                <ul class=" dark:bg-gray-600 dark:text-[#fff] bg-white rounded-2xl shadow-inner">
                    <li v-for="(item,index) in calendar" class="flex items-center justify-around h-[20.78vw]">
                        <div class="w-[65.63vw] h-[20vw] ml-[2vw] flex flex-col justify-around">
                            <div v-if="index===0" class="text-[3vw] text-[#ccc]">
                                <span>今天</span>
                                <span v-if="new Date().getMonth()+1<10">0{{ new Date().getMonth()+1 }}/{{ new Date().getDate() }}</span>
                                <span v-else>{{ new Date().getMonth()+1 }}/{{ new Date().getDate() }}</span>
                            </div>
                            <div v-if="index===1" class="text-[3vw] text-[#ccc]">
                                <span>明天</span>
                                <span v-if="new Date().getMonth()+1<10">0{{ new Date().getMonth()+1 }}/{{ new Date().getDate()+1 }}</span>
                                <span v-else>{{ new Date().getMonth()+1 }}/{{ new Date().getDate() }}</span>
                            </div>
                            <div class="font-[700] text-[3.68vw] w-[91%] overflow-hidden whitespace-nowrap text-ellipsis">{{ item.title }}</div>
                        </div>
                        <img :src="item.imgUrl" class="w-[14.83vw] h-[14.83vw] rounded-xl" alt="">
                    </li>
                </ul>
            </div>
            <!-- 左侧抽屉 -->
            <Drawer :visible.sync="drawerVisible" direction="ltr" title="首页" class="bg-[#f5f5f5] dark:bg-[#000]">
                <template #header>
                    <div class="w-[83.89vw] flex justify-between items-center bg-white dark:bg-[#2a2929] fixed  p-[4.26vw]">
                        <div class="flex justify-between items-center">
                            <img class="w-[6.67vw] h-[6.94vw] rounded-[50%] mr-[2.87vw]" src="http://p7.itc.cn/q_70/images03/20201109/416ac76e04e14a979db03a9f624da78f.jpeg" alt="">
                            <div class="flex items-center">
                                <span class="text-[3.5vw]">昵称</span>
                                <icon icon="ep:arrow-right-bold" class="text-[3.5vw]" />
                            </div>
                        </div>
                        <icon icon="lucide:scan-line" class="text-[5vw]" />
                    </div>
                </template>
                <div class="m-[4.26vw] mt-[16vw]">
                    <!-- 黑胶 -->
                    <div class="w-[75.74vw] h-[28.06vw] pt-[3.24vw] px-[4.17vw] pb-[2.87vw] mt-[5.65vw] mb-[4.17vw] flex flex-col justify-between text-[3vw] bg-gradient-to-r from-[#3b3937] to-[#5b504c] rounded-2xl">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="text-[3.89vw] text-[#fce3e1]">开通黑胶VIP</p>
                                <p class="text-[#a08d89]">立享超21项专属特权 ></p>
                            </div>
                            <div class="w-[16.39vw] h-[6.39vw] text-[#a9948e] border-[2px] border-[#a9948e] rounded-[20px] text-center leading-[6.39vw]">会员中心</div>
                        </div>
                        <p class="text-[#a08d89]">专享优惠!黑胶VIP仅￥0.26/天!</p>
                    </div>
                    <div class="mb-[4.17vw] dark:bg-[#3e3d3d] dark:text-[#fff] bg-white rounded-xl px-[4.26vw]">
                        <div class="h-[12.69vw] border-b-[1px] border-[#ccc] flex justify-between items-center">
                            <div class="flex items-center">
                                <Icon icon="solar:letter-linear" class="w-[4vw] h-[4vw]"/>
                                <p class="ml-[3vw] text-[3.5vw]">消息中心</p>
                            </div>
                            <icon icon="ep:arrow-right-bold" color="#ccc" class="w-[4vw] h-[4vw]" />
                        </div>
                        <div class="h-[12.69vw] border-b-[1px] border-[#ccc] flex justify-between items-center">
                            <div class="flex items-center">
                                <Icon icon="simple-icons:shell"  class="w-[4vw] h-[4vw]"/>
                                <p class="ml-[3vw] text-[3.5vw]">云贝中心</p>
                            </div>
                            <icon icon="ep:arrow-right-bold" color="#ccc" class="w-[4vw] h-[4vw]" />
                        </div>
                        <div class="h-[12.69vw] flex justify-between items-center">
                            <div class="flex items-center">
                                <Icon icon="streamline:interface-lighting-light-bulb-on-lighting-light-shine-incandescent-bulb-lights" class="w-[4vw] h-[4vw]" />
                                <p class="ml-[3vw] text-[3.5vw]">创作者中心</p>
                            </div>
                            <icon icon="ep:arrow-right-bold" color="#ccc" class="w-[4vw] h-[4vw]" />
                        </div>
                    </div>
                    <!-- 音乐服务 -->
                    <div class="mb-[4.17vw] dark:bg-[#3e3d3d] dark:text-[#fff] bg-white rounded-xl">
                        <div class="h-[10vw] pl-[4.26vw] border-b-[1px] border-[#ccc] text-[#ccc] text-[3.5vw] leading-[10vw]">音乐服务</div>      
                        <div class="px-[4.26vw]">
                            <div class="h-[12.69vw] flex justify-between items-center">
                                <div class="flex items-center">
                                    <Icon icon="emojione-monotone:dotted-six-pointed-star" class="w-[4vw] h-[4vw]"/>
                                    <p class="ml-[3vw] text-[3.5vw]">趣测</p>
                                </div>
                                <div class="flex">
                                    <span class="text-[#ccc] text-[2.6vw] mr-[2.78vw]">点击查看今日运势</span>
                                    <icon icon="ep:arrow-right-bold" color="#ccc" class="w-[4vw] h-[4vw]" />
                                </div>
                            </div>
                            <div class="h-[12.69vw] flex justify-between items-center">
                                <div class="flex items-center">
                                    <Icon icon="emojione-monotone:admission-tickets" class="w-[4vw] h-[4vw]" />
                                    <p class="ml-[3vw] text-[3.5vw]">云村有票</p>
                                </div>
                                <div class="flex">
                                    <span class="text-[#ccc] text-[2.6vw] mr-[2.78vw]"></span>
                                    <icon icon="ep:arrow-right-bold" color="#ccc" class="w-[4vw] h-[4vw]" />
                                </div>
                            </div>
                            <div class="h-[12.69vw] flex justify-between items-center">
                                <div class="flex items-center">
                                    <Icon icon="system-uicons:cube" class="w-[4vw] h-[4vw]" />
                                    <p class="ml-[3vw] text-[3.5vw]">多多西西口袋</p>
                                </div>
                                <div class="flex">
                                    <span class="text-[#ccc] text-[2.6vw] mr-[2.78vw]"></span>
                                    <icon icon="ep:arrow-right-bold" color="#ccc" class="w-[4vw] h-[4vw]" />
                                </div>
                            </div>
                            <div class="h-[12.69vw] flex justify-between items-center">
                                <div class="flex items-center">
                                    <Icon icon="solar:bag-4-outline" class="w-[4vw] h-[4vw]" />
                                    <p class="ml-[3vw] text-[3.5vw]">商城</p>
                                </div>
                                <div class="flex">
                                    <span class="text-[#ccc] text-[2.6vw] mr-[2.78vw]"></span>
                                    <icon icon="ep:arrow-right-bold" color="#ccc" class="w-[4vw] h-[4vw]" />
                                </div>
                            </div>
                            <div class="h-[12.69vw] flex justify-between items-center">
                                <div class="flex items-center">
                                    <Icon icon="streamline:interface-signal-square-heart-line-stats-beat-square-graph" class="w-[4vw] h-[4vw]" />
                                    <p class="ml-[3vw] text-[3.5vw]">Beat专区</p>
                                </div>
                                <div class="flex">
                                    <span class="text-[#ccc] text-[2.6vw] mr-[2.78vw]">顶尖制作邀你创作</span>
                                    <icon icon="ep:arrow-right-bold" color="#ccc" class="w-[4vw] h-[4vw]" />
                                </div>
                            </div>
                            <div class="h-[12.69vw] flex justify-between items-center">
                                <div class="flex items-center">
                                    <Icon icon="ri:bell-line" class="w-[4vw] h-[4vw]" />
                                    <p class="ml-[3vw] text-[3.5vw]">口袋彩铃</p>
                                </div>
                                <div class="flex">
                                    <span class="text-[#ccc] text-[2.6vw] mr-[2.78vw]"></span>
                                    <icon icon="ep:arrow-right-bold" color="#ccc" class="w-[4vw] h-[4vw]" />
                                </div>
                            </div>
                            <div class="h-[12.69vw] flex justify-between items-center">
                                <div class="flex items-center">
                                    <Icon icon="mingcute:game-2-line" class="w-[4vw] h-[4vw]" />
                                    <p class="ml-[3vw] text-[3.5vw]">游戏专区</p>
                                </div>
                                <div class="flex">
                                    <span class="text-[#ccc] text-[2.6vw] mr-[2.78vw]">音乐浇潘治愈花园</span>
                                    <icon icon="ep:arrow-right-bold" color="#ccc" class="w-[4vw] h-[4vw]" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 其他 -->
                    <div class="mb-[4.17vw] dark:bg-[#3e3d3d] dark:text-[#fff] bg-white rounded-xl">
                        <div class="h-[10vw] pl-[4.26vw] border-b-[1px] border-[#ccc] text-[#ccc] text-[3.5vw] leading-[10vw]">其他</div>      
                        <div class="px-[4.26vw]">
                            <div class="h-[12.69vw] flex justify-between items-center">
                                <div class="flex items-center">
                                    <Icon icon="icon-park-outline:setting-one" class="w-[4vw] h-[4vw]" />
                                    <p class="ml-[3vw] text-[3.5vw]">设置</p>
                                </div>
                                <icon icon="ep:arrow-right-bold" color="#ccc" class="w-[4vw] h-[4vw]" />
                            </div>
                            <div class="h-[12.69vw] flex justify-between items-center">
                                <div class="flex items-center">
                                    <Icon icon="charm:moon" class="w-[4vw] h-[4vw]" />
                                    <p class="ml-[3vw] text-[3.5vw]">深色模式</p>
                                </div>
                                <v-switch v-model="switchCheckStatus"></v-switch>
                            </div>
                            <div class="h-[12.69vw] flex justify-between items-center">
                                <div class="flex items-center">
                                    <Icon icon="zondicons:timer" class="w-[4vw] h-[4vw]" />
                                    <p class="ml-[3vw] text-[3.5vw]">定时关闭</p>
                                </div>
                                <icon icon="ep:arrow-right-bold" color="#ccc" class="w-[4vw] h-[4vw]" />
                            </div>
                            <div class="h-[12.69vw] flex justify-between items-center">
                                <div class="flex items-center">
                                    <Icon icon="streamline:shopping-catergories-dress-clothing-dress-skirt-women" class="w-[4vw] h-[4vw]" />
                                    <p class="ml-[3vw] text-[3.5vw]">个性装扮</p>
                                </div>
                                <icon icon="ep:arrow-right-bold" color="#ccc" class="w-[4vw] h-[4vw]" />
                            </div>
                            <div class="h-[12.69vw] flex justify-between items-center">
                                <div class="flex items-center">
                                    <Icon icon="iconoir:headset-charge" class="w-[4vw] h-[4vw]" />
                                    <p class="ml-[3vw] text-[3.5vw]">边听边存</p>
                                </div>
                                <div class="flex">
                                    <span class="text-[#ccc] text-[2.6vw] mr-[2.78vw]">未开启</span>
                                    <icon icon="ep:arrow-right-bold" color="#ccc" class="w-[4vw] h-[4vw]" />
                                </div>
                            </div>
                            <div class="h-[12.69vw] flex justify-between items-center">
                                <div class="flex items-center">
                                    <Icon icon="material-symbols:nest-wifi-router-outline" class="w-[4vw] h-[4vw]" />
                                    <p class="ml-[3vw] text-[3.5vw]">在线听歌免流量</p>
                                </div>
                                <icon icon="ep:arrow-right-bold" color="#ccc" class="w-[4vw] h-[4vw]" />
                            </div>
                            <div class="h-[12.69vw] flex justify-between items-center">
                                <div class="flex items-center">
                                    <Icon icon="ph:prohibit-bold" class="w-[4vw] h-[4vw]" />
                                    <p class="ml-[3vw] text-[3.5vw]">音乐黑名单</p>
                                </div>
                                <icon icon="ep:arrow-right-bold" color="#ccc" class="w-[4vw] h-[4vw]" />
                            </div>
                            <div class="h-[12.69vw] flex justify-between items-center">
                                <div class="flex items-center">
                                    <Icon icon="icon-park-outline:protect" class="w-[4vw] h-[4vw]" />
                                    <p class="ml-[3vw] text-[3.5vw]">青少年模式</p>
                                </div>
                                <div class="flex">
                                    <span class="text-[#ccc] text-[2.6vw] mr-[2.78vw]">未开启</span>
                                    <icon icon="ep:arrow-right-bold" color="#ccc" class="w-[4vw] h-[4vw]" />
                                </div>
                            </div>
                            <div class="h-[12.69vw] flex justify-between items-center">
                                <div class="flex items-center">
                                    <Icon icon="gala:clock" class="w-[4vw] h-[4vw]" />
                                    <p class="ml-[3vw] text-[3.5vw]">音乐闹钟  </p>
                                </div>
                                <icon icon="ep:arrow-right-bold" color="#ccc" class="w-[4vw] h-[4vw]" />
                            </div>
                        </div>
                    </div>
                    <div class="mb-[4.17vw] dark:bg-[#3e3d3d] dark:text-[#fff] bg-white rounded-xl px-[4.26vw]">
                        <div class="h-[12.69vw] flex justify-between items-center">
                            <div class="flex items-center">
                                <Icon icon="solar:bill-list-linear" class="w-[4vw] h-[4vw]" />
                                <p class="ml-[3vw] text-[3.5vw]">我的订单</p>
                            </div>
                            <icon icon="ep:arrow-right-bold" color="#ccc" class="w-[4vw] h-[4vw]" />
                        </div>
                        <div class="h-[12.69vw] flex justify-between items-center">
                            <div class="flex items-center">
                                <Icon icon="emojione-monotone:admission-tickets" class="w-[4vw] h-[4vw]" />
                                <p class="ml-[3vw] text-[3.5vw]">优惠卷</p>
                            </div>
                            <icon icon="ep:arrow-right-bold" color="#ccc" class="w-[4vw] h-[4vw]" />
                        </div>
                        <div class="h-[12.69vw] flex justify-between items-center">
                            <div class="flex items-center">
                                <Icon icon="ri:customer-service-2-line" class="w-[4vw] h-[4vw]" />
                                <p class="ml-[3vw] text-[3.5vw]">我的客服</p>
                            </div>
                            <icon icon="ep:arrow-right-bold" color="#ccc" class="w-[4vw] h-[4vw]" />
                        </div>
                        <div class="h-[12.69vw] flex justify-between items-center">
                            <div class="flex items-center">
                                <Icon icon="ri:share-circle-fill" class="w-[4vw] h-[4vw]" />
                                <p class="ml-[3vw] text-[3.5vw]">分享网易云音乐</p>
                            </div>
                            <icon icon="ep:arrow-right-bold" color="#ccc" class="w-[4vw] h-[4vw]" />
                        </div>
                        <div class="h-[12.69vw] flex justify-between items-center"> 
                            <div class="flex items-center">
                                <Icon icon="solar:bill-list-linear" class="w-[4vw] h-[4vw]" />
                                <p class="ml-[3vw] text-[3.5vw]">个人信息收集与使用清单</p>
                            </div>
                            <icon icon="ep:arrow-right-bold" color="#ccc" class="w-[4vw] h-[4vw]" />
                        </div>
                        <div class="h-[12.69vw] flex justify-between items-center">
                            <div class="flex items-center">
                                <Icon icon="solar:share-circle-line-duotone" class="w-[4vw] h-[4vw]" />
                                <p class="ml-[3vw] text-[3.5vw]">个人信息第三方共享清单</p>
                            </div>
                            <icon icon="ep:arrow-right-bold" color="#ccc" class="w-[4vw] h-[4vw]" />
                        </div>
                        <div class="h-[12.69vw] flex justify-between items-center">
                            <div class="flex items-center">
                                <Icon icon="streamline:interface-security-shield-2-shield-protection-security-defend-crime-war-cover" class="w-[4vw] h-[4vw]" />
                                <p class="ml-[3vw] text-[3.5vw]">个人信息与隐私保护</p>
                            </div>
                            <icon icon="ep:arrow-right-bold" color="#ccc" class="w-[4vw] h-[4vw]" />
                        </div>
                        <div class="h-[12.69vw] flex justify-between items-center">
                            <div class="flex items-center">
                                <Icon icon="mdi:about-circle-outline" class="w-[4vw] h-[4vw]" />
                                <p class="ml-[3vw] text-[3.5vw]">关于</p>
                            </div>
                            <icon icon="ep:arrow-right-bold" color="#ccc" class="w-[4vw] h-[4vw]" />
                        </div>
                    </div>
                    <div class="h-[12.78vw] mb-[4.17vw] dark:bg-[#3e3d3d] bg-white rounded-xl px-[4.26vw] text-[red] text-[5vw] leading-[12.78vw] text-center">退出登录/关闭</div>
                </div>
            </Drawer>
            <!-- 每个模块的更多 -->
            <Drawer :visible.sync="drawerSongVisible" direction="btt" :title="info" width="100%" class="rounded-t-2xl rounded-r-2xl bg-white dark:bg-gray-800">
                <div class="w-[90%] m-auto m-t-[30px]">
                    <p class="flex items-center h-[12vw]">
                        <Icon class="ml-[3vw] w-[6vw] h-[6vw]" icon="iconamoon:like-light" width="30" />
                        <span class="ml-[5vw] text-[3vw]">优点推荐</span>
                    </p>
                    <p class="flex items-center h-[9vw]"> 
                        <Icon class="ml-[3vw] w-[6vw] h-[6vw]" icon="ion:heart-dislike-outline" width="30" />
                        <span class="ml-[5vw] text-[3vw]">减少推荐</span>
                    </p>
                    <p class="flex items-center h-[9vw]">
                        <Icon class="ml-[3vw] w-[6vw] h-[6vw]" icon="mingcute:more-4-line" />
                        <span class="ml-[5vw] text-[3vw]">更多内容</span>
                    </p>
                </div>
            </Drawer>
        </div>
    </div>
</template>
<script>
    import _ from 'lodash';
    import BScroll from '@better-scroll/core';
    import {
        fetchHomepageBlockPage,
        fetchHomepageDragonBall,
        fetchCalendar,
        fetchSearchDefault,
        fetchSearchResult,
        fetchSearchSuggest
    } from '@/request/index';
    import menuView from './Components/menuView.vue';
    import newSongView from './Components/newSongView.vue';
    import RecommondPlaylistItem from './Components/RecommondPlaylistItem.vue';
    import chartView from './Components/chartView.vue';
    import { mapState } from '@/vuex';
    export default{
        data(){
            return {
                bannerList:[],//banner数据
                menuList:[],//菜单数据
                songItem:[],//推荐歌单数据
                songItemSize:[],//推荐歌单[0]数据
                resourceData:'',
                animateVisible:0,
                newSong:[],//新歌新碟数据
                charts:[],//排行榜数据
                hot:[],//热门话题数据
                calendar:[],//音乐日历数据
                userSearchKeywords:'',//
                searchSuggestList:[],//搜索建议
                search:{},
                visible:true,
                drawerVisible:false,//控制左侧抽屉
                drawerSongVisible:false,//控制下方抽屉
                info:'',//存title
                switchCheckStatus:false,//控制深色模式
            }
        },
        computed:{
            ...mapState(['count']),
        },
        components:{menuView,newSongView,chartView,RecommondPlaylistItem,
            // songView:()=>import('./Components/songView.vue'),
            // RecommondPlaylistItem:()=>import('./Components/RecommondPlaylistItem.vue'),
        },   
        mounted() {
            new BScroll(this.$refs.scroll);
            this.init(this.$refs.scroll);
            this.init(this.$refs.scrollsong);
            this.init(this.$refs.newsong);
            this.init(this.$refs.scrollcharts);
            this.init(this.$refs.hot);
            // ref + $refs  获取页面上的组件、DOM节点

            this.animateItems();
        },
        beforeDestroy() {
            this.bs.destroy()
        },
        methods:{
            // increase:store.mutations.increase,
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
            fn(e){
                this.drawerVisible = e;
            },
            animateItems() {
                setInterval(() => {
                this.animateVisible++;
                if (this.animateVisible === this.songItemSize.length) {
                    this.animateVisible = 0;
                }
                this.resourceData =
                    this.songItemSize[this.animateVisible].uiElement.mainTitle.title;
                }, 3000);
            },
            dataTruncation(playVolume) {
                if (playVolume > 100000000) {
                    return `${Math.floor(playVolume / 100000000).toFixed(1)}亿`;
                } else if (playVolume > 100000) {
                    return `${Math.floor(playVolume / 10000)}万`;
                } else {
                    return playVolume;
                }
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
            this.songItem = resBanner.data.data.blocks[1].creatives.slice(1); 
            this.songItemSize = resBanner.data.data.blocks[1].creatives[0].resources;  
            this.resourceData = resBanner.data.data.blocks[1].creatives[0].resources[0].uiElement.mainTitle.title;

            // 新歌新碟
            this.newSong = resBanner.data.data.blocks[5].creatives;
            // 排行榜
            this.charts = resBanner.data.data.blocks[3].creatives;
            // 音乐日历
            const res = await fetchCalendar();
            this.calendar = res.data.data.calendarEvents.slice(0,2);
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
    img{
        max-width: none;
    }
    /* 滚动条整体样式 */
    .menu::-webkit-scrollbar {
        height: 0px;
        width: 20px;
    }
    .abc-enter{
        transform: translateY(100%) scale(0.7);
    }
    .abc-enter-active,.abc-leave-active{
        transition: all 1.2s ease-in-out;
    }
    .abc-enter-to{
        /* opacity: 1;
        width: 200px; */
        transform: translateY(0) scale(1);
    }
    .abc-leave{
        transform: translateY(0) scale(1);
    }
    .abc-leave-to{
        /* opacity: 0; */
        transform: translateY(-100%)scale(0.7);
    }
</style>