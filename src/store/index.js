import vuex from '@/vuex';
Vue.use(vuex);

const store = new vuex.Store({
    state:{
        count:123,
        msg:'hello,vuex',
    },
    mutations:{
        increase(state){
            state.count++;
        }
    }
});

export default store;