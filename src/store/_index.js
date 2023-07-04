// 数据仓库
// 全局的数据
// 数据发生变化  那么所有使用该数据的模板全部自动更新
import Vue from 'vue';
import _state from './state';
const state = Vue.observable(_state);
const mutations = {
    increase(){
        state.count++;
    }
}
export default {
  state,
  mutations,
};
