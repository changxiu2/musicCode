<template>
    <!-- <div>
        <img :src="source.uiElement.image.imageUrl" alt="" class="w-[32vw] h-[32vw] rounded-2xl">
        <p class="w-[100%] text-[13px]">{{source.uiElement.mainTitle.title}}</p>   
    </div> -->
    <div>
        <div class="relative mr-[2.5vw]">
            <img :src="source.uiElement.image.imageUrl" alt="" class="w-[30vw] h-[30vw] rounded-2xl mb-[1.3vw]">
            <Icon icon="ion:play" width="10" class='absolute bottom-[2vw] right-[2.5vw] text-[#fff] w-[5vw] h-[5vw]'/>
            <div class='absolute top-[2vw] right-[2.5vw] font-[800] text-[#fff] flex items-center'>
                <Icon icon="ion:play" width="10" class='text-[#fff] w-[3vw] h-[3vw]' />
                <span class='font-[800] text-[2.5vw]'>{{dataTruncation(source.resources[0].resourceExtInfo?.playCount)}}</span>
            </div>
        </div>
        <span class="text-[3vw]">{{source.uiElement.mainTitle.title}}</span>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                a:1
            }
        },
        props:['source'],
        methods:{
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