<template>
    <div>
        <!-- 局部注册，名字自己定
        import Button from 'vant/lib/button'; -->
        <!-- <Button>vant Button</Button> -->
        <!-- 全局注册, -->
        <!-- <van-button>vant Button</van-button> -->
        
        <Debounce>
            <div class="w-[40px] h-[20px] bg-orange-300 border text-center leading-[20px]" @click="debounceTestHandler">防抖测试</div>
        </Debounce>

        <Button>
            <span>我是按钮</span>
            <span slot="abc">[我是按钮]</span>
            <span slot="def">{我是按钮}</span>
        </Button>
        <van-popup v-model="popupVisible" position="bottom" :style="{height:'40%'}">
            <van-area :area-list="areaList" :columns-num="2" @confirm="confirm"></van-area>
        </van-popup>
    </div>
</template>
<script>
    // 全局注册
    // import { Button } from 'vant';
    // 局部注册，名字自己定
    // import Button from 'vant/lib/button';
    // import 'vant/lib/button/style';

    import {areaList} from '@vant/area-data';
    export default {
        data(){
            return {
                popupVisible:true,
                areaList:Object.freeze(areaList),
            }
        },
        // components:{Button},
        methods:{
            confirm(e){
                this.popupVisible = false;
                console.log(e);
            }
        }
    }
</script>