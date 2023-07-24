<template>
    <div class="w-[100%] h-screen" :class="{dark:switchCheckStatus}">
        <div class="w-[100%] relative z-[3] px-[5.3vw] pt-[5.3vw] text-white">
            <!-- 头部 -->
            <header class="h-[12.22vw] flex items-center justify-between">
                <Icon @click.native="ExitFn" class="w-[5.64vw] h-[5.47vw]" icon="ep:arrow-down-bold" />
                <div class="flex flex-col items-center">
                    <p class="w-[63.5vw] truncate text-[5.02vw] text-center">{{$player._currentTrack.name}}</p>
                    <div class="text-[3.5vw] flex items-center justify-center">
                        <span class="text-[#b7bbbf]">{{$player._currentTrack.ar[0].name}}</span>
                        <div class="w-[7.86vw] h-[4.27vw] rounded-[1vw] ml-[1.43vw]  text-[2.48vw] leading-[4.27vw] flex items-center justify-center" style="background-color: rgba(255, 255, 255, .5);">关注</div>
                    </div>
                </div>
                <Icon class="w-[5.64vw] h-[5.47vw]" icon="ri:share-circle-fill" />
            </header>
            <!-- CD -->
            <div v-if="!lyricsSwitching"  @click="lyricsSwitching = !lyricsSwitching" class="w-[100%] h-[80vw] relative mt-[16.07vw]">
                <img :class="$player._playing ? 'rotateCD' : '' " class="w-[21.54vw] cd h-[35.47vw] absolute left-[40vw] z-[10]" src="/static/needle-ab.png" alt="">
                <div class="w-[71.45vw] h-[71.45vw] relative top-[16.07vw] left-[10vw]">
                    <img class="w-[71.45vw] h-[71.45vw] rounded-[50%] absolute" src="/static/record2.png" alt="">
                    <img class="w-[71.45vw] h-[71.45vw] rounded-[50%] absolute" src="/static/disc_light.png" alt="">
                    <img class="w-[45vw] h-[45vw] rounded-[50%] absolute top-[13.16vw] left-[13.16vw]" :src="$player._currentTrack.al.picUrl" :class="$player._playing ? 'rotate' : '' " alt="">
                </div>
            </div>
            <!-- 歌词 -->
            <div class="h-[140vw] flex items-center flex-wrap justify-center overflow-hidden relative internalShadow" v-if="lyricsSwitching" @click="lyricsSwitching = !lyricsSwitching">
                <div class="absolute top-0 transition-all duration-1000" :style="$player._playing ? { top: -$player.lineHieght + 'vw'} : { top: -$player.lineHieght + 'vw'}">
                    <div v-for="(item, index) in $player.lyricLines" :key="item.id" class="text-[hsla(0,0%,88.2%,.8)] line-clamp-2 w-[100%] h-[12vw] px-[4vw] flex justify-center text-center" :style="{color:index ===  $player.lineIndex ? '#fff' : 'hsla(0,0%,88.2%,.7)'}">{{ item.txt }}</div>
                </div>
            </div>
            <!-- 按键 -->
            <div class="w-[100%] h-[54.7vw] fixed bottom-0 left-0  px-[5.3vw]">
                <ul class="w-[100%] h-[12.99vw] flex items-center justify-between">
                    <!-- 喜欢 -->
                    <li @click="love = !love" class="w-[7.5vw] h-[12.99vw] flex items-center justify-between">
                        <Icon v-if="love" class="w-[10.64vw] h-[8.73vw]" icon="icon-park-outline:like" />
                        <Icon v-else class="w-[10.64vw] h-[8.73vw]" icon="icon-park-solid:like" color="red" />
                    </li>
                    <!-- 分享 -->
                    <li class="w-[7.5vw] h-[12.99vw] flex items-center justify-between">
                        <Icon class="w-[10.64vw] h-[8.73vw]" icon="ri:share-circle-fill" />
                    </li>
                    <li class="w-[7.5vw] h-[12.99vw] flex items-center justify-between">
                        <Icon class="w-[10.64vw] h-[8.73vw]" icon="iconamoon:music-album-bold" />
                    </li>
                    <li class="w-[7.5vw] h-[12.99vw] flex items-center justify-between">
                        <Icon class="w-[10.64vw] h-[8.73vw]" icon="uil:comment-lines" />
                    </li>
                    <li class="w-[7.5vw] h-[12.99vw] flex items-center justify-between">
                        <Icon class="w-[10.64vw] h-[8.73vw]" icon="mingcute:more-2-fill" />
                    </li>
                </ul>
                <!-- 歌曲进度条 -->
                <div class="h-[18.55vw] pt-[9vw] flex justify-center items-center">
                    <div>{{ convertSecondsToFormattedTime($player._progress) }}</div>
                    <vue-slider v-model="$player.progress" :duration="0" :process="true" tooltip="none" :drag-on-click="true" :min="0" :max="$player._duration" :interval="0.1"  class="flex-1 mx-[2.5vw]"/>
                    <div>{{ convertSecondsToFormattedTime($player._duration) }}</div>
                </div>
                <!-- 播放暂停 -->
                <div class="h-[15.64vw] flex items-center justify-between">
                    <Icon @click.native="$player._shuffledList()" class="w-[9.56vw] h-[9.24vw]" icon="fe:random" />
                    <div class="w-[41.97vw] flex items-center justify-between">
                        <!-- 上一首 -->
                        <Icon @click.native="PrevTrackCallback()" class="w-[7.8vw] h-[8.56vw]" icon="fluent:previous-32-filled" />
                        <div @click="$player.playOrPause()" class="w-[15.64vw] h-[15.64vw] border-white rounded-[50%] border-[0.64vw] flex justify-center items-center">
                            <!-- 暂停/播放 -->
                            <Icon :icon="`${$player._playing ? 'material-symbols:pause' : 'ph:play-fill'}`" class="w-[7.8vw] h-[8.56vw]" />
                        </div>
                        <!-- 下一首 -->
                        <Icon @click.native="$player.playNextTrack()" class="w-[7.8vw] h-[8.56vw]" icon="fluent:next-20-filled" />
                    </div>
                <Icon @click.native="musicListVisible = !musicListVisible" class="w-[9.56vw] h-[9.24vw]" icon="icon-park-solid:music-list" />
                </div>
            </div>
            <!-- 音乐列表 -->
            <van-popup v-model="musicListVisible" round position="bottom" :overlay-style="{background:'rgba(0,0,0,0.4)',zIndex:10,}" :style="{ height: '60%'}" class=" bg-white text-black dark:bg-[#202028] dark:text-white" >
                <div class="w-[100%]">
                    <div class="w-[100%] bg-white dark:bg-[#202028] dark:text-white z-[1] fixed pt-[5.73vw] pl-[4.53vw] pr-[5.3vw] rounded-2xl">
                        <!-- 当前播放 -->
                        <header class="text-[5.04vw] font-[900]">当前播放<span class="text-[3.25vw] text-[#909091]">({{ this.singDate?.length }})</span></header>
                        <!-- 下载收藏删除 -->
                        <div class="flex justify-between leading-[14.5vw]">
                            <div class="flex items-center text-[3.85vw]">
                                <Icon icon="arcticons:loopboard" class="text-[#797979] dark:text-[#9c9c9c] text-[5vw] mr-[2vw]" :horizontalFlip="true"/>
                                <span>列表循环</span>
                            </div>
                            <div class="flex items-center text-[5vw] text-[#a2a2a2] dark:text-[#9c9c9c]" >
                                <!-- 下载 -->
                                <Icon icon="circum:save-down-1" class="mr-[3.57vw] text-[5.5vw]" /> 
                                <!-- 收藏 -->
                                <Icon icon="fluent:collections-24-regular" :horizontalFlip="true" class="mr-[3.57vw]" />
                                <!-- 删除 -->
                                <Icon icon="uiw:delete" :horizontalFlip="true" class="text-[4.5vw]" />
                            </div>
                        </div>
                    </div>
                    <!-- 歌曲列表 -->
                    <ul class="w-[100%] flex flex-col pt-[28vw] pl-[4.53vw] pr-[5.3vw] text-black dark:text-white">
                        <li v-for="item in singDate " :key="item.key" @click="playId(item)" class="flex h-[10vw] leading-[10vw] items-center justify-between">
                            <div class="flex w-[60vw] truncate">
                                <img class="redImage" v-if="item.id === $player._currentTrack.id" src="/static/wave.gif" alt="">
                                <p :class="item.id === $player._currentTrack.id ? 'text-[#D15B57]' : ''" class="mr-[2vw] text-[4.36vw]">{{ item.name }} - </p>
                                <div :class="item.id === $player._currentTrack.id ? 'text-[#D15B57]' : ''" class="text-[#797979] dark:text-[#898989]">
                                    <span class="text-[#c1c1c1] text-[3.08vw]" v-for="items in item.ar" :key="items">
                                        {{ items.name }}
                                    </span>
                                </div>
                            </div>
                            <Icon @click.native="delectFn(index,item.id)" class="text-[#a2a2a2] dark:text-[#9c9c9c]" icon="ei:close" :horizontalFlip="true"/>
                        </li>
                    </ul>
                </div>
            </van-popup>
        </div>
        <!-- 背景蒙版 -->
        <div class="element fixed z-[1] top-0 left-0 right-0 bottom-0 imgBg" :style="`background-image: url(${$player._currentTrack?.al?.picUrl})`"></div>
        <div class="fixed z-[2] bgColor top-0 left-0 right-0 bottom-0"></div>
    </div>
</template>
<script>
    import store from 'storejs';
    export default {
        data(){
            return {
                switchCheckStatus:null,//深色模式
                musicListVisible: false,
                singDate:{},
                love:true,//喜欢
                lyricsSwitching:false,//歌词显隐
            }
        },
        async created() {
            // 深色模式
            this.switchCheckStatus = store.get('switch');
            // 获取歌曲数据
            this.singDate = store.get('songs');
            console.log($player.lyricLines);
        },
        methods: {
            // 点击列表播放单个歌曲
            playId(item){
                this.$player.replacePlaylist(this.singDate.map((song) => song.id),'','',item.id)
            },
            // 退出页面
            ExitFn(){
                this.$router.go(-1)
            },
            // 在播放列表中删除
            delectFn(index,id){
                if (this.$player._currentTrack.id === id) {
                    this.playId(this.singDate[index + 1].id);
                }
                this.singDate.splice(index, 1);
                store.set('cookie_music', this.singDate);
            },
            // 分秒格式
            convertSecondsToFormattedTime (seconds) {
                const minutes = Math.floor((seconds % 3600) / 60);
                const remainingSeconds =  Math.floor(seconds % 60);
                const formatNumber = (num) => {
                    return num.toString().padStart(2, '0');
                };
                return `${formatNumber(minutes)}:${formatNumber(remainingSeconds)}`;
            },
            // 上一首
            PrevTrackCallback() {
                if (this.$player.list.indexOf(this.$player._currentTrack.id) == 0) {
                    this.playId(this.$player.list[this.$player.list.length - 1]);
                } else {
                    this.playId(
                        this.$player.list[
                            this.$player.list.indexOf(this.$player._currentTrack.id) - 1
                        ]
                    );
                }
            },
        }
    }
</script>
<style>
    .cd{
        transition: transform 0.5s ease-in-out;
        transform-origin: 15% 8%;
        transform: rotate(-30deg);
    }
    .rotateCD {
        transform: rotate(10deg);
    }
    .redImage {
        width: 3vw;
        height: 3vw;
        margin: 4vw 2vw 0 0;
        filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='colorize'><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter></svg>#colorize");
    }
    /* 背景 */
    .bgColor {
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(30px); /* 模糊半径，可以调整模糊程度 */
    }
    .imgBg {
        background-size:cover;
    }
    .internalShadow {
        -webkit-mask-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0) 0, hsla(0, 0%, 100%, 0.6) 15%, #fff 25%, #fff 75%, hsla(0, 0%, 100%, 0.6) 85%, hsla(0, 0%, 100%, 0));
    }
</style>