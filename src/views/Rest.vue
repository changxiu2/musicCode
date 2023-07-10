<!-- <template>
    <div>
        <h1 @click="fn" ref="h1">{{ count }}</h1>
        <button @click="changeABC" ref="h1">changeABC</button> -->
        <!-- <h1 @click="()=>count++">{{ count }}</h1> -->
        <!-- <h1 @click="count++">{{ count }}</h1> -->
        <!-- <ul>
            <li v-for="item in arr" :key="item">{{ item }}</li>
        </ul>
    </div>
</template> -->
<script>
import { h } from 'vue';


    //data中的数据变化(同步) => 数据对应的视图更新（异步） 
    // import Vue from 'vue';
    // function initO(){
    //     let _a = 1;
    //     return {
    //         // 对象a的存值器
    //         // 拦截了属性的赋值操作
    //         set a(v){
    //             _a = Math.pow(v,2);
    //             document.body.innerHTML = `<h1>${this.a}</h1>`;
    //         },
    //         // 对象a的取值器
    //         get a(){
    //             return _a
    //         },
    //         b:2,
    //     }
    // }

    // function reactive(data={}){
    //     // ['a','b','c']
    //     Object.keys(data).forEach(function(key){
    //         let _ = {};
    //         _[key] = data[key];
    //         Object.defineProperty(data,key,{
    //             set(v){
    //                 _[key] = v;
    //             },
    //             set(){
    //                 return data[key];
    //             },
    //         });
    //     })
    //     return data;
    // }

    // window.r = reactive({a:1,b:2,c:3})


    // window.o = initO();
    // console.log(o);
    
    export default {
        // h ====> createElement
        render: function(h){
            // return h('div',{},[
            //     h('h1',{on: this.fn},[this.count]),
            //     h('button',{on:{click:this.changeABC}},['changeABC']),
            //     h('ul',{},this.arr.map(item=>h('li',{},item))
            //     )
            // ]);
            // jsx 元素 是 js 的一种新数据类型
            return (
                <div>
                    <h1 onclick={this.fn}>{count}</h1>
                    <h1 onclick={this.changeABC}>changeABC</h1>
                    <ul>
                        {this.arr.map(item => {
                            <li key={item}>{item}</li>
                        })}
                        
                    </ul>
                </div>
            )
        },
        data(){
            return {
                count:123,
                abc:1122,
                arr:[1,2,3],
            }
        },
        filters:{
            // 过滤器就是一个带有返回值的函数
        },
        methods:{
            fn(){
                this.count = 124;
                this.$nextTick(() => console.log(this.$refs.h1.innerText))
                
            },
            changeABC(){
                this.abc = 4321;
                console.log(this.abc);
            },
            addNewProp(){

            },
        },
        updated(){
            console.log('updated',this.$refs.h1.innerText);
        }

    }
    /**
 使用jsx编写render函数的配置步骤：
 1.安装所需的babel相关模块
    "@babel/core": "^7.22.8"
    "@babel/preset-env": "^7.22.7"
    "@vue/babel-plugin-transform-vue-jsx": "^1.4.0"
    "babel-loader": "^9.1.2"
    "@vue/babel-helper-vue-jsx-merge-props": "^1.4.0"
    "@vue/babel-preset-jsx": "^1.4.0"
    "@vue/cli-plugin-babel": "^5.0.8"
  2.在根目录下新建.babelrc（babel.config.js）并写入如下配置：
    {
      "presets": [
        "@vue/cli-plugin-babel/preset",
        [
          "@vue/babel-preset-jsx",
          {
            "injectH": false
          }
        ]
      ]
    }
  3.修改webpack.config.js中的module配置项加入如下配置：
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },
  4.编写正确的jsx代码 并编译
 */
</script>

