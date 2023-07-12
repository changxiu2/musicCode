<template>
    <div class="flex fixed bottom-0 left-0 w-screen h-[13.4vw] bg-white dark:bg-[#202227] dark:text-[white]">
        <div class="w-[91vw] m-auto flex items-center justify-between">
            <div class="flex items-center">
                <div class="w-[11vw] bg-[#1a1a1a] rounded-[50%] p-[1.78vw] flex items-center ">
                    <img :src="player._currentTrack.al?.picUrl" class="w-[7.64vw] h-[7.64vw] rotate rounded-[50%] bg-[pink]">
                </div>
                <!-- 作者-歌名 -->
                <div class="ml-[2.93vw] text-[3.95vw]">
                    <span class="w-[3.28vw]">{{player._currentTrack.name}}</span>
                    <span class="w-[3.28vw] text-[#abaab0]">
                        {{ player._currentTrack.ar[0].name }} - {{player._currentTrack.al.name}}
                        <!-- <template>
                            <div v-if="Array.isArray(player._currentTrack.ar)" class="flex justify-center items-center">
                               <span>{{ player._currentTrack.ar[0].name }}&nbsp;</span>
                               <span class="w-[34.07vw] truncate"> - {{player._currentTrack.al.name}} </span>
                            </div>
                        </template> -->
                    </span>
                </div>
            </div>
            <!-- 播放按钮  菜单 -->
            <div class="w-[18.28vw] flex justify-center items-center">
                <div @click="musicToggle" class="w-[6.6vw] h-[6.6vw] relative mr-[4.86vw]">
                    <van-circle v-model="currentRate" :rate="0" :speed="100" :text="text" size="6vw" layer-color="#C9CBD0" color="#505969"/>
                    <Icon v-if="play" icon="ph:play-fill" class="absolute top-[0.7vw] left-[1vw] w-[3.71vw] h-[4.71vw]"/>
                    <Icon v-else icon="ic:round-pause" class="absolute top-[0.7vw] left-[1vw] w-[3.71vw] h-[4.71vw]" />
                    <!-- <van-icon class="w-[4.5vw]" name="bars" size="6vw"/> -->
                </div>
                <Icon icon="ri:menu-fold-fill" class="w-[5.19vw] h-[5vw]" />
            </div>
        </div>
    </div>
</template>
<script>
    import Player from './player';
    export default {
        data(){
            return {
                player:new Player(),
                currentRate: 0,
                play:false,
            }
        }, 
        created(){
            window.$player=this.player;
            console.log(window.$player);
        },
        text() {
            return this.currentRate.toFixed(0) + '%';
        },
        methods:{
            playFn() {
                this.play = !this.play;
                window.$player.playOrPause();
                if (this.play) {
                    // 添加旋转动画样式
                    const image = document.querySelector('.rotate');
                    image.style.animation = 'rotateAnimation 5s linear infinite';
                } else {
                    // 移除旋转动画样式
                    const image = document.querySelector('.rotate');
                    image.style.animation = 'none';
                }
            },
            musicToggle(){
                this.play = !this.play;
                window.$player.playOrPause();
            }
        }
    }
</script>
<style scoped>
    .rotate {
        animation: rotateAnimation 5s linear infinite;
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