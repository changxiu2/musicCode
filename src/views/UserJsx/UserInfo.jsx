import store from 'storejs';
import { areaList } from '@vant/area-data';
export default {
    render() {
        return (
            <div class="bg-[#f5f5f5]">
                <header class="bg-white h-[15.46vw] flex items-center justify-start px-[4.7vw] text-[4.85vw] font-[800]">
                    <Icon nativeOnClick={() => { this.$router.push('/User') }} class="w-[5.64vw] h-[5.6vw] font-[800] mr-[5.42vw]" icon="icon-park-outline:arrow-left" />
                    我的资料
                </header>
                <ul class="bg-white mt-[2.03vw]">
                    <li class="px-[4.7vw] h-[17.72vw] border-b-[0.32vw] border-[#e0dfdf] flex items-center justify-between">
                        <p class="font-[800] text-[4.74vw]">头像</p>
                        <img class="w-[12.5vw] h-[12.5vw] rounded-[50%]" src={this.data.profile.avatarUrl} alt="" />
                    </li>
                    <li class="px-[4.7vw] h-[17.72vw] border-b-[0.32vw] border-[#e0dfdf] flex items-center justify-between">
                        <p class="font-[800] text-[4.74vw]">昵称</p>
                        <p class="text-[3.84vw] text-[#929292]">{this.data.profile.nickname}</p>
                    </li>
                    <li class="px-[4.7vw] h-[17.72vw] border-b-[0.32vw] border-[#e0dfdf] flex items-center justify-between">
                        <p class="font-[800] text-[4.74vw]">性别</p>
                        <p class="text-[3.84vw] text-[#929292]">女</p>
                    </li>
                    <li class="px-[4.7vw] h-[17.72vw] border-b-[0.32vw] border-[#e0dfdf] flex items-center justify-between">
                        <p class="font-[800] text-[4.74vw]">二维码</p>
                        <Icon class="w-[4.76vw] h-[5vw] text-[#929292]" icon="ph:qr-code-light" />
                    </li>
                </ul>
                <ul class="bg-white mt-[2.03vw]">
                    <li class="px-[4.7vw] h-[17.72vw] border-b-[0.32vw] border-[#e0dfdf] flex items-center justify-between">
                        <p class="font-[800] text-[4.74vw]">生日</p>
                        <p class="text-[3.84vw] text-[#929292]">{this.getRegistrationDate(this.data.profile.birthday)}</p>
                    </li>
                    <li class="px-[4.7vw] h-[17.72vw] border-b-[0.32vw] border-[#e0dfdf] flex items-center justify-between">
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
                {/* 选择地址组件 */}
                <van-popup v-model={this.popupVisible} position="bottom" style={{ height: '30%' }}>
                    <van-area area-list={areaList} value="110101" columns-num="2" onConfirm={this.confirm} onConfirm-button-text="完成"></van-area>
                </van-popup>
            </div>
        )
    },
    data() {
        return {
            data: {},//详情数据
            areaList,//地址
            popupVisible: false,//判断选择地址开关
            areaDate: {},
            isLoggedIn: true,
        }
    },
    created() {
        this.data = store.get('_cookieMusic');
        console.log(this.data);
    },
    methods: {
        confirm(e) {
            this.popupVisible = false;
            this.areaDate = e;
            this.isLoggedIn = false;
            console.log(this.areaDate);
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
                return <p onClick={() => { this.popupVisible = true }} class="text-[3.84vw] text-[#929292]">{areaList.province_list[this.data.profile.province]}&nbsp;&nbsp;{areaList.city_list[this.data.profile.city]}</p>
            } else {
                return <p onClick={() => { this.popupVisible = true }} class="text-[3.84vw] text-[#929292]">{this.areaDate[0].name}&nbsp;&nbsp;{this.areaDate[1].name}</p>
            }
        }

    }
}