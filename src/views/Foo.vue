<template>
    <div>
        <h1>Foo view</h1>
        <button @click="fn">toggle dialog</button>
        <!-- <Dialog title="警告" message="我是提示内容"></Dialog> -->
    </div>
</template>
<script>
    import Dialog from '@/components/Dialog'
    export default {
        methods:{
            fn(){
                Dialog({title:'警告',message:'我是提示内容！'})
                .then(function () {
                    console.log('点击了确定');
                })
                .catch(function () {
                    console.log('点击了取消');
                });
            }
        }
    }
</script>