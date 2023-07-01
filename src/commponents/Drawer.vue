<template>
    <div @click="clickHandler" :class="{dark:switchCheckStatus}">
        <div class="bg-white dark:text-[#fff]">
            <transition :name="direction">
            <div v-show="visible" class="w-screen bg-white dark:bg-[#2a2929] fixed z-[999] overflow-auto" :style="[drawerContentStyle,{width}]">
                <div>
                    <slot name="header">
                        <div class="flex justify-between items-center p-4 border-b-[0.35vw] border-[#ccc]">
                            <p class="text-[#ccc] text-[4vw] font-[800] ml-[4vw]">{{title}}</p>
                            <Icon @click.native="closeDrawer" icon="carbon:close-outline" class=" w-[6vw] h-[6vw]"/>
                        </div>
                    </slot>
                </div>
                <div>
                    <slot>default slot default value </slot>
                </div>
            </div>
        </transition>
        <!-- 蒙版 -->
        <div v-if="visible" ref="drawerMask" class="bg-black opacity-40 fixed top-0 right-0 bottom-0 left-0 z-[998]"></div>
        </div>
        
    </div>
</template>
<script>
    export default{
        // 单向数据流（父级通过props传递给子组件的数据  子组件没有权限修改）
        props:{
            visible:{
                type:Boolean,
                required:true,
            },
            title:{
                type:String,
                default:'默认标题',
            },
            direction:{
                type:String,
                default:'btt',
                validator(direction){
                    // 'ttb','btt'  宽度100%    'ltr','rtl' 高度100%
                    return ['ttb','btt','ltr','rtl'].includes(direction);
                }
            },
            width:{
                type:[Number, String],
                default: '83.89vw',
            }
        },
        // 计算属性
        computed:{
            drawerContentStyle(){
                if(this.direction === 'btt'){
                    return {
                        width:'100vw',
                        left:0,
                        bottom:0,
                        borderTopLeftRadius:"5vw",
                        borderTopRightRadius:"5vw"
                    }
                }else if(this.direction === 'ttb'){
                    return {
                        width:'100vw',
                        left:0,
                        top:0,
                    }
                }else if(this.direction === 'ltr'){
                    return {
                        height:'100vh',
                        left:0,
                        top:0,
                    }
                }else if(this.direction === 'rtl'){
                    return {
                        height:'100vh',
                        right:0,
                        top:0,
                    }
                }
            }
        },
        methods:{
            closeDrawer() {
                this.$emit('update:visible', false);
            },
            clickHandler(e){
                if(e.target === this.$refs.drawerMask){
                    // this.visible =false;//直接修改，只能修改一次，有问题
                    // 使用vm.$emit给父组件传递数据
                    this.closeDrawer();
                }
            }
        }
    }
</script>

<style scoped>
    .btt-enter,.btt-leave-to{
        transform: translateY(100%);
    }
    .btt-enter-active,.btt-leave-active {
        transition: all ease-in-out 1s;
    }
    .btt-enter-to,.btt-leave{
        transform: translateY(0);
    }
    .ltr-enter,.ltr-leave-to{
        transform: translateX(-100%);
    }
    .ltr-enter-active,.ltr-leave-active {
        transition: all ease-in-out 1s;
    }
    .ltr-enter-to,.ltr-leave{
        transform: translateX(0);
    }
</style>