// 数据仓库对象（vue插件）
let Vue = null;
let store = null;
export const mapMutations = (mutationKeys = []) => {
    return mutationKeys.reduce((prev,key) => {
        prev[key] = store.mutations[key];
        return prev;
    },{})
}
// mapState(['count','msg'])
export const mapState = (stateKeys = []) => {
    // // 写法1
    // let o = {};
    // for(let key of stateKeys){
    //     o[key] = function(){
    //         return store.state[key]
    //     }
    // }
    // return o;

    // 写法2
    return stateKeys.reduce((prev,key) => {
        prev[key] = function(){
            return store.state[key];
        }
        return prev;
    },{})
}
export default {
    Store:class { 
        constructor({state = {},mutations = {}}){
            this.state = Vue.observable(state);
            // [[key,function]]
            let o = {};
            for(let key in mutations){
                o[key] = () => {
                    mutations[key](this.state);
                }
            }
            this.mutations = o;
        }
    },
    install(_vue){
        Vue = _vue;
        Vue.mixin({
            created() {
                if(!this.$parent){
                    Vue.prototype.$store = this.$options.store;
                    store = this.$options.store;
                }
            },
        })
    }
}