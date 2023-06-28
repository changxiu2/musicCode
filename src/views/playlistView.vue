<!-- index.template + index.js -->
<template>
    <div class="w-screen h-screen font-[30px]">
        <!-- 头部 -->
        <div class="w-screen mt-5">
            <icon icon="ci:chevron-left" color="#000" width="30" class="float-left" />
            <h3 class="w-[80px] font-[700] text-[20px] m-auto">歌单广场</h3>
        </div>
        <!-- 导航 -->
        <ul class="w-screen h-[26px] overflow-hidden mt-5 mb-5 pl-8">
            <li v-for="item in menu" :key="item.id" v-on:click="toggleMenu(item.name)" class="mx-4 h-[26px] float-left mr-6 text-decoration-[#ccc]" v-bind:class="{active:item.name === activeMenuItem}">
                {{item.name}}
            </li>
        </ul>
        <!-- 列表 -->
        <ul class="flex flex-wrap justify-center">
            <li v-for="item in playlists" class="w-[90px] ml-5 mr-5 self-start align-items">
                <div class="w-[90px] h-[90px] rounded overflow-hidden">
                    <img :src="item.coverImgUrl" alt="" class="w-[90px] h-[90px] rounded-2xl">
                </div>
                <p class="w-[90px]">{{item.name}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
    import {fetchPlaylistHot,fetchPlaylists} from '@/request/index';
    export default{
        data(){
            return {
                menu:[],
                activeMenuItem:'华语',
                playlists:[],
            }
        },
        methods:{
            toggleMenu(name){
                this.activeMenuItem = name;
            },
        },
        async created(){
            const res = await fetchPlaylistHot();
            this.menu = res.data.tags;
            
        },
        watch:{
            activeMenuItem:{
                // 指定数据变化的回调函数
                // async(){aeait + promise}
                handler:async function(newCat){
                    const res = await fetchPlaylists(newCat);
                    this.playlists = res.data.playlists;
                    // fetchPlaylists(newCat).then(res=>{
                    //     this.playlists = res.data.playlists;
                    // })
                },
                // 执行配置：立即执行函数
                immediate:true,
            }
        }
    }
</script>
<style>
    .active {
        color: #000;
        font-weight: 700;
        position: relative;
        z-index: 1;
    }

    .active::after {
        content: '';
        width: 100%;
        height: 5px;
        background-color: red;
        position: absolute;
        left: 0;
        bottom: 0;
        border-radius: 5px;
    }
</style>
<!-- 国际化自定义代码块 -->
<!-- <i18n></i18n> -->