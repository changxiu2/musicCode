<template>
    <div>
       <!-- <img src="/static/tp.jpg" alt="">  -->
        <h1>扫码登录</h1>
        <img :src="qrcode" alt="">
    </div>
</template>
<script>
    import {getQRKey,getQrInfo,checkQrStatus} from '@/request';
    import store from 'storejs';
    export default {
        name:'Login',
        data(){
            return {
                qrcode:'',
            }
        },
        methods:{
            pollingCheck(key,interval = 1000){
                const timer = setInterval(async()=>{
                    const res = await checkQrStatus(key);
                    if(res.data.code === 800){
                        alert('此二维码已过期，请刷新后重试');
                        clearInterval(timer);
                    }else if(res.data.code === 803){
                        clearInterval(timer);
                        // console.log(res.data.cookie);
                        store.set('__m__cookie',res.data.cookie)
                        // this.$route.push('/Index');
                    }
                },interval)
                // 监听自己生命周期执行的时候执行的一些逻辑  自己监听自己
                this.$on('hook:beforeDestroy',() => { clearInterval(timer); })
            }
        },
        async created(){
            const res = await getQRKey().catch(err =>{
                console.log(err);
            })
            // console.log(res.data.data.unikey);//获取到unikey
            const qrInfo = await getQrInfo(res.data.data.unikey).catch(err=>{
                console.log(err);
            })
            // console.log(qrInfo);
            this.qrcode = qrInfo.data.data.qrimg;//生成二维码
            this.pollingCheck(res.data.data.unikey)
        },
        beforeDestroy(){
            // 页面销毁前做一些事
            console.log('beforeDestroy');

        }
    }
</script>