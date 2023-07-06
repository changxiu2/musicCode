<template>
    <div>
        <div v-show="visible" class="dark:bg-[#2A2929] dark:text-[#fff] w-[320px] fixed top-[36%] left-[50%] text-[16px] rounded-[4vw] bg-white z-30 translate-x-[-50%] ">
            <div>
                <div class="pt-[26px] text-center font-[800] leading-[24px]">{{title}}</div>
                <div>
                    <div class="pt-[8px] text-center text-[#646566] pb-[26px] px-[24px] box-border">
                        {{message}}
                    </div>
                </div>
                <div class="flex items-center text-center h-[48px] border-t border-[#ebedf0]">
                    <div @click="cancel" class="flex-1 border-r border-[#ebedf0] leading-[48px]">
                        <span class="text-blue-500">取消</span>
                    </div>
                    <div @click="confirm" class="flex-1 leading-[48px]">
                        <span class="text-blue-500">确认</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 蒙版 -->
        <div v-if="visible" ref="drawerMask" class="bg-black opacity-40 fixed top-0 right-0 bottom-0 left-0 z-[29]"></div>
    </div>
</template>
<script>
    export default {
        name:'Dialog',
        data(){
            return {
                visible:false,
                switchCheckStatus:null,
            }
        },
        methods:{
            hide(){
                this.visible = false;
            },
            cancel(){
                this.hide();
                this.reject();
            },
            confirm(){
                this.hide();
                this.resolve();
            },
        },
    }
</script>