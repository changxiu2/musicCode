<template>
    <div v-show="visible" class="w-[320px] fixed top-[50%] left-[50%] text-[16px] rounded-[12px] bg-gray-300 translate-x-[-50%] ">
        <div>
            <div class="pt-[26px] text-center font-[800] leading-[24px]">{{title}}</div>
            <div>
                <div class="pt-[8px] text-[#646566] pb-[26px] px-[24px] box-border">
                    {{message}}
                </div>
            </div>
            <div class="flex items-center text-center h-[48px] border-t border-[#ebedf0]">
                <div @click="cancel" class="flex-1 border-r border-[#ebedf0] leading-[48px]">
                    <span>取消</span>
                </div>
                <div @click="confirm" class="flex-1 leading-[48px]">
                    <span>确认</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:'Dialog',
        data(){
            return {
                visible:false,
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