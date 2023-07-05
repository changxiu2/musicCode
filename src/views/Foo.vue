<template>
    <div>
        <h1 @click="increase">{{ count }}{{ msg }}</h1>
        <button @click="fn">toggle dialog</button>
        <!-- <Dialog title="警告" message="我是提示内容"></Dialog> -->
    </div>
</template>
<script>
    import Dialog from '@/components/Dialog';
    import {mapState,mapMutations} from '@/vuex';
    import {getUserAccount,getUserDetail} from '@/request';
    import store from 'storejs';
    export default {
        // computed: mapState(['count','msg']),
        computed:{
            ...mapState(['count','msg']),
        }, 
        methods:{
            ...mapMutations(['increase']),
            fn(){
                Dialog({title:'警告',message:'我是提示内容！'})
                .then(function () {
                    console.log('点击了确定');
                })
                .catch(function () {
                    console.log('点击了取消');
                });
            }
        },
        async created(){
            const res = await getUserAccount();
            // console.log(res);
            // store.set('_cookieMusic',res.data.profile);
            const detail = await getUserDetail(res.data.profile.userId);
            console.log(detail);
        }
    }
</script>