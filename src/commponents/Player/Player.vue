<template>
    <div :class="{dark:switchCheckStatus}">
        <div class="flex h-[13.4vw] w-screen bg-white dark:bg-[#202028] dark:text-white">
            <div class="w-[91vw] m-auto flex items-center justify-between">
                <div @click="musicPlayFn" class="flex items-center">
                    <div class="w-[11vw] bg-[#030202] rounded-[50%] p-[1.78vw] flex items-center ">
                        <img :src="$player._currentTrack.al?.picUrl" class="w-[7.64vw] h-[7.64vw] rounded-[50%] bg-[#f5f5f5]" :class="$player._playing ? 'rotate' : '' ">
                    </div>
                    <!-- 作者-歌名 -->
                    <div class="w-[56.21vw] ml-[2.93vw] text-[3.95vw] flex items-center truncate">
                        <p class="text-[3.28vw]">{{$player._currentTrack.name}}&nbsp;</p>
                        <div v-if="Array.isArray($player._currentTrack.ar)">
                            <p class="text-[#abaab0]">- {{ $player._currentTrack.ar[0].name }}</p>
                        </div>
                    </div>
                </div>
                <!-- 播放按钮  菜单 -->
                <div class="w-[18.28vw] flex justify-center items-center">
                    <div @click="$player.playOrPause()" class="w-[6.6vw] h-[6.6vw] relative mr-[3.86vw]">
                        <van-circle v-model="currentRate" :rate="($player._progress * 100) / $player._duration" size="6vw" :stroke-width="120" color="#475165" layer-color="#C7CBD2" class="dark:text-[#e3e6e8]"/>
                        <Icon :icon="`${$player._playing ? 'carbon:pause-filled' : 'ph:play-fill'}`" class="absolute top-[0.8vw] left-[1.2vw] w-[3.71vw] h-[4.71vw] dark:text-[#e3e6e8]" />
                    </div>
                    <Icon @click.native="musicListVisible = !musicListVisible" icon="ri:menu-fold-fill" class="w-[5.19vw] h-[5vw]" />
                </div>
            </div>
            <!-- 音乐列表 -->
            <van-popup v-model="musicListVisible" round position="bottom" :overlay-style="{background:'rgba(0,0,0,0.4)'}" :style="{ height: '60%'}" class="dark:bg-[#202028] dark:text-white" >
                <div class="w-[100%]">
                    <div class="w-[100%] fixed  z-[1] bg-white dark:bg-[#202028] dark:text-white pt-[5.73vw] pl-[4.53vw] pr-[5.3vw] rounded-2xl">
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
                    <ul class="w-[100%] flex flex-col pt-[28vw] pl-[4.53vw] pr-[5.3vw]">
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
    </div>
    
</template>
<script>
    import store from 'storejs';
    export default {
    data() {
        return {
            switchCheckStatus:null,//深色模式
            currentRate: 0,
            musicListVisible: false,
            singDate:{},
        };
    },
    async created() {
        // 深色模式
        this.switchCheckStatus = store.get('switch');
        console.log(this.$player);
        this.singDate = store.get('songs');
    },
    methods: {
        playId(item){
            this.$player.replacePlaylist(this.singDate.map((song) => song.id),'','',item.id)
        },
        // 跳转页面到CD页
        musicPlayFn(){
            this.$router.push('/MusicPlay')
        },
        // 在播放列表中删除
        delectFn(index,id){
            if (this.$player._currentTrack.id === id) {
                this.playSingle(this.music[index + 1].id);
            }
            this.music.splice(index, 1);
            store.set('cookie_music', this.music);
        },
    },
}
</script>
<style>
    .rotate {
        animation:rotateAnimation 5s linear infinite;
    }

    @keyframes rotateAnimation {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>