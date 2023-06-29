<template>
    <div>
        <img :src="menu.iconUrl" class="red-image w-[10vw]" alt="">
        <p class="text-[1.7vw] text-[#888]">{{menu.name}}</p>
    </div>
</template>
<script>
    export default{
        props:['menu'],
    }
</script>
<style>
    .red-image {
        filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='colorize'><feColorMatrix type='matrix' values='1 0 0 0 0.698 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/></filter></svg>#colorize");
    }
</style>