<template>
    <div>
        <div class=" w-[89vw] h-[14.17vw] mb-4 flex" v-for="item2 in newSongItem.resources" :key="item2.id">
            <img :src="item2.uiElement.image.imageUrl" alt="" class="w-[14.17vw] h-[14.17vw] rounded-xl">
            <div class="ml-2 ">
                <p class="font-[700]">{{ item2.uiElement.mainTitle.title }}</p>
                <p class="text-[13px] text-[#666]">{{item2.uiElement.subTitle.title}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props:['newSongItem']
    }
</script>