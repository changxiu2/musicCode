<template>
    <div class="scroll-item w-[85vw] p-[4vw] mr-[5vw] dark:bg-gray-600 bg-[#fff] rounded-xl shadow-inner">
        <li class="flex justify-between mb-5">
            <div class="font-[700] flex items-center">
                <p class="text-[4vw]">{{ chart.uiElement.mainTitle?.title }}</p>
                <icon icon="ep:arrow-right-bold" class="w-[4vw] h-[4vw]" />
            </div>
            <p class="text-[2vw] text-[#ccc]">{{ chart.uiElement.mainTitle?.titleDesc }}</p>
        </li>
        <li class="w-[78vw] h-[14.17vw] mb-4 flex justify-between items-center" v-for="(item2,index) in chart.resources" :key="item2.id">
            <div class="ml-2 flex justify-start items-center">
                <img :src="item2.uiElement.image.imageUrl" alt="" class="w-[14.17vw] h-[14.17vw] rounded-xl">
                <p class="ml-4 mr-5 font-[800] text-[3vw] text-[#cb9d3b]" v-if="index+1 === 1">{{ index+1 }}</p>
                <p class="ml-4 mr-5 font-[800] text-[3vw] text-[#7b83a5]" v-else-if="index+1 === 2">{{ index+1 }}</p>
                <p class="ml-4 mr-5 font-[800] text-[3vw] text-[#c07748]" v-else="index+1 === 3">{{ index+1 }}</p>
                <div class="w-[38vw]">
                    <p class="w-[40vw] h-[5vw] font-[700] text-[3.5vw] overflow-hidden whitespace-nowrap text-ellipsis">{{ item2.uiElement.mainTitle.title }}</p>
                    <p class="text-[2.36vw] text-[#666] dark:text-[#a5a7ae]">{{item2.resourceExtInfo?.artists[0].name}}</p>
                </div>
            </div>
            <p v-if="item2.uiElement.labelText?.text === '热门'" class="text-[#ed4241] text-[2.43vw]">{{item2.uiElement.labelText?.text}}</p>
            <p v-if="item2.uiElement.labelText?.text === '新晋'" class="text-[#38b284] text-[2.43vw]" >{{item2.uiElement.labelText?.text}}</p>
            <p v-if="item2.uiElement.labelText?.text === '霸榜'" class="text-[#ed4241] text-[2.43vw]">{{item2.uiElement.labelText?.text}}</p>
        </li>
    </div>
</template>
<script>
    export default {
        props:['chart'],
    }
</script>