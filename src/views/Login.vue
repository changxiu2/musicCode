<template>
    <div class="w-screen h-screen p-[6.15vw] bg-gradient-to-b from-[#f2f3f7] to-[#fff]">
        <div class="h-[5.73vw] flex justify-between items-center mb-[33.36vw]">
            <Icon @click.native="IndexFn" class="w-[7vw] h-[7vw]" icon="ep:arrow-left" />
            <p class="text-[#5f5f5f] text-[5vw]">游客登录</p>
        </div>
        <!-- 二维码 -->
        <div v-if="state === 801" class="w-[45vw] m-auto text-center">
            <img class="w-[100%] h-[7.1vw] mb-[9.66vw]" src="/static/logo.fill.svg" alt="">
            <img class="w-[45vw] h-[45vw] mb-[10vw]" :src="qrcode" alt="">
            <p class="text-[3.3vw] w-[100%] text-center mt-[10vw]"> 使用 <span class="text-[#0077cf]"> 网易云音乐APP </span>  扫码登录</p>
        </div>
        <!-- 二维码过期失效 -->
        <div v-else-if="state === 800" class="w-[45vw] m-auto">
            <img class="w-[100%] h-[7.1vw] mb-[9.66vw]" src="/static/logo.fill.svg" alt="">
            <div class="w-[45vw] h-[45vw] relative">
                <img class="w-[45vw] h-[45vw]" :src="qrcode" alt="">
                <div class="w-[38vw] h-[37vw] absolute top-[4vw] left-[3.6vw] bg-gray-300 bg-opacity-[0.7] flex justify-center items-center">
                    <div @click.native="LoginFn" class="w-[21vw] h-[7.61vw] flex items-center justify-center text-[3.08vw] text-white rounded-[5vw] bg-gradient-to-r from-[#fe5934] to-[#f01568]">点击刷新</div>
                </div>
            </div>
            <p class="text-[3.3vw] w-[100%] text-center mt-[10vw]"> 使用 <span class="text-[#0077cf]"> 网易云音乐APP </span>  扫码登录</p>
        </div>
        <!-- 扫码成功 -->
        <div v-else-if="state === 802" class="w-[45vw] m-auto text-center">
            <img class="w-[100%] h-[7.1vw] mb-[9.66vw]" src="/static/logo.fill.svg" alt="">
            <img class="w-[45vw] h-[45vw]" src="/static/phone.png" alt="">
            <p class="text-[4.53vw] mt-[5.64vw]">扫描成功</p>
            <p class="text-[3.76vw] w-[100%] mt-[6.75vw]"> 请在手机上确认登录</p>
        </div>
        <!-- 底部背景图 -->
        <img class="fixed bottom-0 left-0 w-[100%]" src="/static/tp.jpg" alt="">
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
                state:null,
            }
        },
        methods:{
            // 跳转到首页
            IndexFn(){
                this.$router.push('/Index');
            },
            // 刷新页面
            async LoginFn(){
                const res = await getQrKey().catch(err=>{console.log(err);})
                const qrinfo = await getQrInfo(res.data.data.unikey).catch(err=>{console.log(err);})
                this.qrcode = qrinfo.data.data.qrimg;
                this.pollingCheck(res.data.data.unikey);
            },
            pollingCheck(key,interval = 1000){
                const timer = setInterval(async()=>{
                    const res = await checkQrStatus(key);
                    this.state = res.data.code;
                    console.log(this.state);
                    if(res.data.code === 800){
                        // alert('此二维码已过期，请刷新后重试');
                        clearInterval(timer);
                    }else if(res.data.code === 803){
                        // console.log(res.data.cookie);
                        store.set('__m__cookie',res.data.cookie)
                        this.$router.push('/Index');
                        clearInterval(timer);
                        // const user = await getUserAccount();
                        // console.log('用户详情',user.data);

                    //     store.set('__m__User',user.data);//存用户信息
                    //     const userData = await getUserDetail(user.data.account.id);


                    //     store.set('__m__UserData',userData.data);//存账号信息
                    //     console.log('账号信息',userData.data)
                    //     this.$router.push('/HomeView');

                    // }
                    // else if(res.data.code === 802){this.code = 802;}
                    // else if(res.data.code === 800){
                    // this.code = 800;clearInterval(timer);

                    // }
                    // else {this.code = 801}
                    // console.log(res.data.code)
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