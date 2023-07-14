<template>
    <div :class="{dark:switchCheckStatus}">
        <ul class="w-screen bg-white dark:bg-black h-[14vw] px-[8.53vw] flex items-center justify-between fixed bottom-0 left-0 z-10">
            <li @click="()=>{this.$router.push('/Index')}" class="flex flex-col justify-center items-center">
                <Icon class="w-[6.65vw] h-[6.65vw]" icon="ri:netease-cloud-music-fill" color="#f53d5b" :rotate="2" />
                <p>首页</p>
            </li>
            <li @click="()=>{this.$router.push('/MvView')}" class="flex flex-col justify-center items-center">
                <Icon class="w-[6.65vw] h-[6.65vw]" icon="fa6-solid:ranking-star" />
                <p>排行榜</p>
            </li>
            <li @click="()=>{this.$router.push('/MvView')}" class="flex flex-col justify-center items-center">
                <Icon class="w-[6.65vw] h-[6.65vw]" icon="mingcute:music-line" />
                <p>我的</p>
            </li>
            <li @click="()=>{this.$router.push('/User')}" class="flex flex-col justify-center items-center">
                <Icon class="w-[6.65vw] h-[6.65vw]" icon="iconoir:user-love" />
                <p>关注</p>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                switchCheckStatus:null,//深色模式
            }
        },
        created(){
            // 深色模式
            this.switchCheckStatus = store.get('switch');
        }
    }
</script>