<template>
    <div class="w-[50px] h-[30px] rounded-[15px]" 
    :class="`${ value ? 'bg-gray-700' : 'bg-pink-600' }`" 
    @click="toggle">
        <div class="w-[30px] h-[30px] rounded-[15px] bg-white transition-all" :class="`${
            value ? 'translate-x-[20px]' : 'translate-x-0'
        }`"></div>
    </div>
</template>
<script>
    export default {
        // model主要是配置v-model指令所需要使用的 属性名 和 事件名
        model:{//主要用于防止value属性被占用，input属性被占用，无法使用v-model
            prop:'value',
            event:'input',
        },
        props:{
            value:{
                type:Boolean,
                required:true,
            }
        },
        methods:{
            toggle(){
                // this.$emit('updata:value',!this.value);
                // 触发自身的input1方法
                this.$emit('input',!this.value);
            }
        }
    }
</script>