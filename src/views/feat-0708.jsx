/* // 全局注册
// import { Button } from 'vant';
// 局部注册，名字自己定
// import Button from 'vant/lib/button';
// import 'vant/lib/button/style'; */

import { areaList } from '@vant/area-data';
import styled from 'styled-components-vue';

const Wrapper = styled.div`
    .van-picker__confirm{
        color: red;
    }
`;
export default {
    render() {
        return (
            <Wrapper>
                <div>{this.$t(1688733891207)}</div>
                <van-popup v-model={this.popupVisible} position="bottom" style={{ height: '40%' }}>
                    <van-area area-list={areaList} value="110101" columns-num="2" onConfirm={this.confirm} onConfirm-button-text="完成"></van-area>
                </van-popup>
            </Wrapper >
        )
    },
    data() {
        return {
            popupVisible: true,
            areaList: Object.freeze(areaList),
        }
    },
    methods: {
        confirm(e) {
            this.popupVisible = false;

            console.log(e);
        }
    }
}