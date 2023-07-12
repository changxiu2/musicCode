import store from 'storejs';
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
                <div class="bg-[#f5f5f5] pb-[16vw]">
                    <header class="bg-white h-[15.46vw] flex items-center justify-start px-[4.7vw] text-[4.85vw] font-[800]">
                        <Icon nativeOnClick={() => { this.$router.push('/User') }} class="w-[5.64vw] h-[5.6vw] font-[800] mr-[5.42vw]" icon="icon-park-outline:arrow-left" />
                        我的资料
                    </header>
                    <ul class="bg-white mt-[2.03vw]">
                        <li class="px-[4.7vw] h-[17.72vw] border-b-[0.32vw] border-[#e0dfdf] flex items-center justify-between">
                            <p class="font-[800] text-[4.74vw]">头像</p>
                            <img class="w-[12.5vw] h-[12.5vw] rounded-[50%]" src={this.data.profile.avatarUrl} alt="" />
                        </li>
                        <li onClick={() => { this.nameVisible = true }} class="px-[4.7vw] h-[17.72vw] border-b-[0.32vw] border-[#e0dfdf] flex items-center justify-between">
                            <p class="font-[800] text-[4.74vw]">昵称</p>
                            <p class="text-[3.84vw] text-[#929292]">{this.data.profile.nickname}</p>
                        </li>
                        <li onClick={() => { this.sexVisible = true }} class="px-[4.7vw] h-[17.72vw] border-b-[0.32vw] border-[#e0dfdf] flex items-center justify-between">
                            <p class="font-[800] text-[4.74vw]">性别</p>
                            <p class="text-[3.84vw] text-[#929292]">{this.sexFn(this.data.profile.gender)}</p>
                        </li>
                        <li class="px-[4.7vw] h-[17.72vw] border-b-[0.32vw] border-[#e0dfdf] flex items-center justify-between">
                            <p class="font-[800] text-[4.74vw]">二维码</p>
                            <Icon class="w-[4.76vw] h-[5vw] text-[#929292]" icon="ph:qr-code-light" />
                        </li>
                    </ul>
                    <ul class="bg-white mt-[2.03vw]">
                        <li onClick={() => { this.bithVisible = true }} class="px-[4.7vw] h-[17.72vw] border-b-[0.32vw] border-[#e0dfdf] flex items-center justify-between">
                            <p class="font-[800] text-[4.74vw]">生日</p>
                            <p class="text-[3.84vw] text-[#929292]">{this.getRegistrationDate(this.data.profile.birthday)}</p>
                        </li>
                        <li onClick={() => { this.popupVisible = true }} class="px-[4.7vw] h-[17.72vw] border-b-[0.32vw] border-[#e0dfdf] flex items-center justify-between">
                            <p class="font-[800] text-[4.74vw]">地址</p>
                            {this.Greeting(this.isLoggedIn)}
                        </li>
                        <li class="px-[4.7vw] h-[17.72vw] border-b-[0.32vw] border-[#e0dfdf] flex items-center justify-between">
                            <p class="font-[800] text-[4.74vw]">大学</p>
                            <p class="text-[3.84vw] text-[#ccc]">未填写</p>
                        </li>
                        <li class="px-[4.7vw] h-[17.72vw] border-b-[0.32vw] border-[#e0dfdf] flex items-center justify-between">
                            <p class="font-[800] text-[4.74vw]">音乐标签</p>
                            <p class="flex items-center justify-center text-[3.05vw] text-[#929292] w-[27.54vw] h-[6.21vw] border border-[#e0dfdf] rounded-[1.3vw]">什么类型都听听</p>
                        </li>
                        <li class="px-[4.7vw] h-[17.72vw] border-b-[0.32vw] border-[#e0dfdf] flex items-center justify-between">
                            <p class="font-[800] text-[4.74vw]">简介</p>
                            <p class="text-[3.84vw] text-[#ccc]">还没有简介</p>
                        </li>
                    </ul>
                    <ul class="bg-white mt-[2.03vw]">
                        <li class="px-[4.7vw] h-[17.72vw] border-b-[0.32vw] border-[#e0dfdf] flex items-center justify-between">
                            <p class="font-[800] text-[4.74vw]">个人主页隐私设置</p>
                        </li>
                        <li class="px-[4.7vw] h-[17.72vw] border-b-[0.32vw] border-[#e0dfdf] flex items-center justify-between">
                            <p class="font-[800] text-[4.74vw]">主页模块顺序设置</p>
                        </li>
                    </ul>
                    <ul class="bg-white mt-[2.03vw]">
                        <li class="px-[4.7vw] h-[17.72vw] border-b-[0.32vw] border-[#e0dfdf] flex items-center justify-between">
                            <p class="font-[800] text-[4.74vw]">账号和绑定设置</p>
                        </li>
                    </ul>
                    {/* 更换昵称 */}
                    <van-popup v-model={this.nameVisible} position="bottom" style={{ height: '100%' }}>
                        <header class="bg-white h-[15.46vw] flex items-center justify-between px-[4.7vw] text-[4.85vw] font-[800]">
                            <div class="flex justify-start items-center">
                                <Icon nativeOnClick={() => { this.nameVisible = false }} class="w-[5.64vw] h-[5.6vw] font-[800] mr-[5.08vw]" icon="icon-park-outline:arrow-left" />
                                <p class="text-[4.63vw]">修改昵称</p>
                            </div>
                            <p onClick={() => { this.nameVisible = false }} class="text[3.84vw]">保存</p>
                        </header>
                        <div class="w-screen h-[20vw] pl-[4.85vw] pr-[2.48vw] relative flex items-center">
                            <input v-model={this.data.profile.nickname} type="text" class="w-[100%] h-[10.95vw] px-[2vw] leading-[10.95vw] border-b-[0.32vw] border-[#000] outline-none" />
                            <Icon class="text-[#adadad] w-[5.27vw] h-[5.05vw] absolute top-[8vw] right-[3.21vw]" icon="line-md:remove" />
                        </div>
                        {/* <van-picker show-toolbar columns={this.columns} default-index={this.data.profile.gender} onConfirm={this.confirmSex} onCancel={() => { this.nameVisible = false }} /> */}
                    </van-popup>
                    {/* 性别 */}
                    <van-popup v-model={this.sexVisible} position="bottom" style={{ height: '30%' }}>
                        <van-picker show-toolbar columns={this.columns} default-index={this.data.profile.gender} onConfirm={this.confirmSex} onCancel={() => { this.sexVisible = false }} />
                    </van-popup>
                    {/* 选择地址组件 */}
                    <van-popup v-model={this.popupVisible} position="bottom" style={{ height: '30%' }}>
                        <van-area v-model={this.area} area-list={areaList} value="110101" columns-num="2" onConfirm={this.confirmArea} onCancel={() => { this.popupVisible = false }} onConfirm-button-text="完成"></van-area>
                    </van-popup>
                    {/* 出生日期 */}
                    <van-popup v-model={this.bithVisible} position="bottom" style={{ height: '30%' }}>
                        <van-datetime-picker v-model={this.currentDate} onConfirm={this.confirmDate} onCancel={() => { this.bithVisible = false }} type="date" min-date={this.minDate} max-date={this.maxDate} />
                    </van-popup>
                </div>
            </Wrapper>
        )
    },
    data() {
        return {
            data: {},//详情数据
            areaList,//地址
            popupVisible: false,//判断选择地址开关
            areaDate: {},
            isLoggedIn: true,
            bithVisible: false,//出生日期
            minDate: new Date(1990, 0, 1),
            maxDate: new Date(2024, 12, 1),
            currentDate: null,//出生日期
            area: null,
            sexVisible: false,//性别
            nameVisible: false,//昵称
            columns: ['男', '女']
        }
    },
    created() {
        this.data = store.get('_cookieMusic');
        console.log(this.data);

        this.currentDate = new Date(this.data.profile.birthday);
        // this.sex = 'this.data.profile.gender'
    },
    methods: {
        // 点击确定性别
        confirmSex(e) {
            this.sexVisible = false;
            console.log(e);
        },
        // 点击确定地址
        confirmArea(e) {
            this.popupVisible = false;
            this.areaDate = e;
            this.isLoggedIn = false;
            console.log(this.areaDate);
        },
        // 点击确定出生日期
        confirmDate(e) {
            this.currentDate = this.getRegistrationDate(e);
            // console.log(this.getRegistrationDate(e));
            console.log(this.currentDate);
            this.bithVisible = false;
        },
        getRegistrationDate(totalDays) {
            const registrationDate = new Date(totalDays); // 计算日期

            const year = registrationDate.getFullYear(); // 获取年份
            const month = registrationDate.getMonth() + 1; // 获取月份
            const date = registrationDate.getDate(); // 获取日期

            return `${year}-${month}-${date}`;
        },
        Greeting(isLoggedIn) {
            if (isLoggedIn) {
                return <p class="text-[3.84vw] text-[#929292]">{areaList.province_list[this.data.profile.province]}&nbsp;&nbsp;{areaList.city_list[this.data.profile.city]}</p>
            } else {
                return <p class="text-[3.84vw] text-[#929292]">{this.areaDate[0].name}&nbsp;&nbsp;{this.areaDate[1].name}</p>
            }
        },
        sexFn(sex) {
            if (sex == 1) {
                return '男'
            } else if (sex == 2) {
                return '女'
            }
        }

    }
}