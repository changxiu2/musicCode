import store from 'storejs';
import { areaList } from '@vant/area-data';
import styled from 'styled-components-vue';
import { getUpdate } from '@/request';
import dayjs from 'dayjs';

const Wrapper = styled.div`
    .van-picker__confirm{
        color: red;
    }
    .van-picker__toolbar,.van-picker-column__item.van-picker-column__item--selected{
        background: #f5f5f5;
    }
`;
export default {
    render() {
        return (
            <Wrapper>
                <div class={this.switchCheckStatus ? 'dark' : ''}>
                    <div class="bg-[#f5f5f5] dark:bg-[#212121] dark:text-[#e8e8e8] pb-[16vw]">
                        <header class="bg-white dark:bg-[#2C2C2C] h-[15.46vw] flex items-center justify-start px-[4.7vw] text-[4.85vw] font-[800]">
                            <Icon nativeOnClick={() => { this.$router.push('/User') }} class="w-[5.64vw] h-[5.6vw] font-[800] mr-[5.42vw]" icon="icon-park-outline:arrow-left" />
                            我的资料
                        </header>
                        <ul class="bg-white dark:bg-[#2C2C2C] mt-[2.03vw]">
                            <li class="px-[4.7vw] h-[17.72vw] border-b-[0.23vw] border-[#f6f6f6] dark:border-[#363636] flex items-center justify-between">
                                <p class="font-[800] text-[4.74vw]">头像</p>
                                <img class="w-[12.5vw] h-[12.5vw] rounded-[50%]" src={this.data.profile.avatarUrl} alt="" />
                            </li>
                            <li onClick={() => { this.nameVisible = true }} class="px-[4.7vw] h-[17.72vw] border-b-[0.23vw] border-[#f6f6f6] dark:border-[#363636] flex items-center justify-between">
                                <p class="font-[800] text-[4.74vw]">昵称</p>
                                <p class="text-[3.84vw] text-[#929292]">{this.data.profile.nickname}</p>
                            </li>
                            <li onClick={() => { this.sexVisible = true }} class="px-[4.7vw] h-[17.72vw] border-b-[0.23vw] border-[#f6f6f6] dark:border-[#363636] flex items-center justify-between">
                                <p class="font-[800] text-[4.74vw]">性别</p>
                                <p class="text-[3.84vw] text-[#929292]">{this.sexFn(this.arr[0])}</p>
                            </li>
                            <li class="px-[4.7vw] h-[17.72vw] border-b-[0.23vw] border-[#f6f6f6] dark:border-[#363636] flex items-center justify-between">
                                <p class="font-[800] text-[4.74vw]">二维码</p>
                                <Icon class="w-[4.76vw] h-[5vw] text-[#929292]" icon="ph:qr-code-light" />
                            </li>
                        </ul>
                        <ul class="bg-white dark:bg-[#2C2C2C] mt-[2.03vw]">
                            <li onClick={() => { this.bithVisible = true }} class="px-[4.7vw] h-[17.72vw] border-b-[0.23vw] border-[#f6f6f6] dark:border-[#363636] flex items-center justify-between">
                                <p class="font-[800] text-[4.74vw]">生日</p>
                                <p class="text-[3.84vw] text-[#929292]">{this.getRegistrationDate(this.data.profile.birthday)}</p>
                            </li>
                            <li onClick={() => { this.popupVisible = true }} class="px-[4.7vw] h-[17.72vw] border-b-[0.23vw] border-[#f6f6f6] dark:border-[#363636] flex items-center justify-between">
                                <p class="font-[800] text-[4.74vw]">地址</p>
                                <p class="text-[3.84vw] text-[#929292]">{areaList.province_list[this.data.profile.province]}&nbsp;{areaList.city_list[this.data.profile.city]}</p>

                            </li>
                            <li class="px-[4.7vw] h-[17.72vw] border-b-[0.23vw] border-[#f6f6f6] dark:border-[#363636] flex items-center justify-between">
                                <p class="font-[800] text-[4.74vw]">大学</p>
                                <p class="text-[3.84vw] text-[#ccc]">未填写</p>
                            </li>
                            <li class="px-[4.7vw] h-[17.72vw] border-b-[0.23vw] border-[#f6f6f6] dark:border-[#363636] flex items-center justify-between">
                                <p class="font-[800] text-[4.74vw]">音乐标签</p>
                                <p class="flex items-center justify-center text-[3.05vw] text-[#929292] w-[27.54vw] h-[6.21vw] border border-[#e0dfdf] rounded-[1.3vw]">什么类型都听听</p>
                            </li>
                            <li class="px-[4.7vw] h-[17.72vw] border-b-[0.23vw] border-[#f6f6f6] dark:border-[#363636] flex items-center justify-between">
                                <p class="font-[800] text-[4.74vw]">简介</p>
                                <p class="text-[3.84vw] text-[#ccc]">还没有简介</p>
                            </li>
                        </ul>
                        <ul class="bg-white dark:bg-[#2C2C2C] mt-[2.03vw]">
                            <li class="px-[4.7vw] h-[17.72vw] border-b-[0.23vw] border-[#f6f6f6] dark:border-[#363636] flex items-center justify-between">
                                <p class="font-[800] text-[4.74vw]">个人主页隐私设置</p>
                            </li>
                            <li class="px-[4.7vw] h-[17.72vw] border-b-[0.23vw] border-[#f6f6f6] dark:border-[#363636] flex items-center justify-between">
                                <p class="font-[800] text-[4.74vw]">主页模块顺序设置</p>
                            </li>
                        </ul>
                        <ul class="bg-white dark:bg-[#2C2C2C] mt-[2.03vw]">
                            <li class="px-[4.7vw] h-[17.72vw] border-b-[0.23vw] border-[#f6f6f6] dark:border-[#363636] flex items-center justify-between">
                                <p class="font-[800] text-[4.74vw]">账号和绑定设置</p>
                            </li>
                        </ul>
                        {/* 更换昵称 */}
                        <van-popup v-model={this.nameVisible} position="bottom" style={{ height: '100%' }}>
                            <header class="bg-white dark:bg-[#2C2C2C] h-[15.46vw] flex items-center justify-between px-[4.7vw] text-[4.85vw] font-[800]">
                                <div class="flex justify-start items-center">
                                    <Icon nativeOnClick={() => { this.nameVisible = false }} class="w-[5.64vw] h-[5.6vw] font-[800] mr-[5.08vw]" icon="icon-park-outline:arrow-left" />
                                    <p class="text-[4.63vw]">修改昵称</p>
                                </div>
                                <p onClick={this.confirmName} class="text[3.84vw]">保存</p>
                            </header>
                            <div class="w-screen h-[20vw] pl-[4.85vw] pr-[2.48vw] relative flex items-center">
                                <input v-model={this.nameInput} type="text" class="w-[100%] h-[10.95vw] px-[2vw] leading-[10.95vw] border-b-[0.23vw] border-[#f6f6f6] dark:border-[#363636utline-none" />
                                <Icon nativeOnClick={() => { this.nameInput = '' }} class="text-[#adadad] w-[5.27vw] h-[5.05vw] absolute top-[8vw] right-[3.21vw]" icon="line-md:remove" />
                            </div>
                            {/* <van-picker show-toolbar columns={this.columns} default-index={this.data.profile.gender} onConfirm={this.confirmSex} onCancel={() => { this.nameVisible = false }} /> */}
                        </van-popup>
                        {/* 性别 */}
                        <van-popup v-model={this.sexVisible} position="bottom" style={{ height: '30%' }}>
                            <van-picker show-toolbar columns={this.columns} default-index={this.arr[0]} onConfirm={this.confirmSex} onCancel={() => { this.sexVisible = false }} />
                        </van-popup>
                        {/* 选择地址组件 */}
                        <van-popup v-model={this.popupVisible} position="bottom" style={{ height: '30%' }}>
                            <van-area area-list={areaList} columns-num="2" onConfirm={this.confirmArea} onCancel={() => { this.popupVisible = false }} onConfirm-button-text="完成"></van-area>
                        </van-popup>
                        {/* 出生日期 */}
                        <van-popup v-model={this.bithVisible} position="bottom" style={{ height: '30%' }}>
                            <van-datetime-picker v-model={this.currentDate} onConfirm={this.confirmDate} onCancel={() => { this.bithVisible = false }} type="date" min-date={this.minDate} max-date={this.maxDate} />
                        </van-popup>
                    </div>
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
            arr: [],
            isLoggedIn: true,
            bithVisible: false,//出生日期
            minDate: new Date(1990, 0, 1),
            maxDate: new Date(2024, 12, 1),
            currentDate: null,//出生日期
            sexVisible: false,//性别
            nameVisible: false,//昵称
            nameInput: null,
            columns: ['男', '女'],
            switchCheckStatus: null,//深色模式
        }
    },
    async created() {
        // 深色模式
        this.switchCheckStatus = store.get('switch');

        this.data = store.get('_cookieMusic');
        console.log(this.data);

        this.nameInput = this.data.profile.nickname;//昵称
        this.currentDate = new Date(this.data.profile.birthday);//出生日期

        this.arr = [this.data.profile.gender, this.data.profile.birthday, this.data.profile.nickname, this.data.profile.province, this.data.profile.city, this.data.profile.signature]
        console.log(this.arr);
    },
    methods: {
        // 点击确定昵称
        async confirmName() {
            this.nameVisible = !this.nameVisible;
            this.data.profile.nickname = this.nameInput;
            console.log(this.nameInput);
            if (this.arr[2] != this.data.profile.nickname) {
                this.arr[2] = this.data.profile.nickname;
                const resArea = await getUpdate(this.arr[0], this.arr[1], this.arr[2], this.arr[3], this.arr[4], this.arr[5]).then(res => console.log(res)).catch(err => console.log(err));
            }
            console.log(this.arr);
        },
        // 点击确定性别
        async confirmSex(e) {
            this.sexVisible = !this.sexVisible;
            if (e === '男') {
                this.arr[0] = 1
            } else {
                this.arr[0] = 2
            }
            await getUpdate(this.arr[0], this.arr[1], this.arr[2], this.arr[3], this.arr[4], this.arr[5]);
            console.log(this.arr);
        },
        // 点击确定地址
        async confirmArea(e) {
            this.popupVisible = !this.popupVisible;
            this.data.profile.province = Number(e[0].code)
            this.data.profile.city = Number(e[1].code)
            if (this.arr[3] != this.data.profile.province && this.arr[4] != this.data.profile.city) {
                this.arr[3] = this.data.profile.province
                this.arr[4] = this.data.profile.city
                const resArea = await getUpdate(this.arr[0], this.arr[1], this.arr[2], this.arr[3], this.arr[4], this.arr[5]).then(res => console.log(res)).catch(err => console.log(err));
            }
        },
        // 点击确定出生日期
        async confirmDate(e) {
            this.bithVisible = !this.bithVisible;
            this.data.profile.birthday = dayjs(this.getRegistrationDate(e)).valueOf();
            if (this.arr[1] != this.data.profile.birthday) {
                this.arr[1] = this.data.profile.birthday;
                const resArea = await getUpdate(this.arr[0], this.arr[1], this.arr[2], this.arr[3], this.arr[4], this.arr[5]).then(res => console.log(res)).catch(err => console.log(err));
            }
        },
        getRegistrationDate(totalDays) {
            const registrationDate = new Date(totalDays); // 计算日期
            const year = registrationDate.getFullYear(); // 获取年份
            const month = registrationDate.getMonth() + 1; // 获取月份
            const date = registrationDate.getDate(); // 获取日期

            return `${year}-${month}-${date}`;
        },
        sexFn(sex) {
            if (sex === 1) {
                return '男'
            } else if (sex === 2) {
                return '女'
            } else {
                return ''
            }

        },
    }
}