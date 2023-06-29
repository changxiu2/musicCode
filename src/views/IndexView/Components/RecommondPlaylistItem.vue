<template>
    <div>
        <img :src="source.uiElement.image.imageUrl" alt="" class="w-[32vw] h-[32vw] rounded-2xl">
        <p class="w-[100%] text-[13px]">{{source.uiElement.mainTitle.title}}</p>   
    </div>
</template>
<script>
    export default{
        data(){
            return{
                a:1
            }
        },
        props:['source']
    }
</script>