<template>
    <div class="h-[13.4vw] bg-white dark:bg-[#202227] w-[100%] dark:text-[white] flex fixed bottom-0 left-0">
        <div class="w-[91vw] m-auto flex items-center justify-between">
            <div class="flex items-center">
                <div class="w-[11vw] bg-[#1a1a1a] rounded-[50%] p-[1.78vw] flex items-center ">
                    <img src="" class="w-[7.64vw] h-[7.64vw] rounded-[50%] bg-[pink]">
                </div>
                <!-- 作者-歌名 -->
                <div class="ml-[2.93vw]">
                    <span class="w-[3.28vw]">或许</span>
                    <span class="w-[3.28vw] text-[#abaab0]">-LBI利比</span>
                </div>
            </div>
            <!-- 播放按钮  菜单 -->
            <div class="flex">
                <span class="relative inline-block w-[6.6vw] h-[6.6vw] rounded-[50%] border-[#68676d]  border-[0.44vw] mr-[4.86vw]">
                    <Icon icon="solar:play-bold" class="absolute top-[1vw] left-[1vw] text-[4vw]" /> 
                </span>
                <Icon icon="ri:menu-fold-fill" class="text-[6vw]" />
            </div>
        </div>
    </div>
</template>