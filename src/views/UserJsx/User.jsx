import styled from 'styled-components-vue';
import store from 'storejs';
import { areaList } from '@vant/area-data';
// import BScroll from '@better-scroll/core'
import { getUserAccount, getUserPlaylist, getUserComment, getSinger } from '@/request';
const Wrapper = styled.div`
    .van-tabs__nav{
        background: none;
    }
    .van-tab{
        font-size: 4.296vw;
        font-weight: 800;
        /* color: #929595; */
        color: #8C8C8C;
    }
    :root {
        --primary-light: #ffffff;
        --primary-dark: linear-gradient(to b, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.8));
    }
    .van-tabs__wrap .van-tab.van-tab--active {
        color:#323233;
        color: var(--primary-light);
    }
    .van-tabs__line{
        width: 23px;
        height: 4px;
    }
    .van-tabs__wrap .van-tabs__nav.van-tabs__nav--line{
        background-color:var(--primary-dark);
    }
    .van-tabs__wrap{
        background-color: #f5f5f5;
    }
    .dark .van-tabs__wrap{
        background-color: #323233;
    }
`;
export default {
    render() {
        return (
            <Wrapper>
                <div class={this.switchCheckStatus ? 'dark' : ''}>
                    <div class="bg-[#f5f5f5] pb-[16vw] dark:bg-[#141414] dark:text-white">
                        <div class={`w-screen h-[65.28vw] relative overflow-hidden rounded-b-[2vw]`}>
                            <img class="w-[100%] h-[65.28vw]" src={this.data.profile.backgroundUrl} alt="" />
                            <header class="w-screen h-[12.41vw] bg-white fixed top-0 left-0 z-10 flex items-center justify-between pl-[4.72vw] pr-[5.93vw]">
                                <Icon nativeOnClick={() => { this.$router.push('/Index') }} class="z-10 w-[6vw] h-[6vw]" icon="ph:arrow-left-bold" />
                                <Icon class="w-[5vw] h-[5.6vw] font-[800]" icon="ri:more-2-fill" />
                            </header>
                        </div>
                        {/* 我的信息 h-[50vw] */}
                        <section class="w-[100%] px-[4.63vw] box-border" ref='mine'>
                            <div class="w-[91.11vw] rounded-[5vw] text-center bg-white dark:bg-[#272727] relative top-[-4.26vw] py-[5vw]">
                                <img class="w-[19.44vw] h-[19.44vw] rounded-[50%] absolute top-[-14.2vw] left-[50%] ml-[-10vw]" src={this.data.profile.avatarUrl} alt="" />
                                <p class="text-[5.56vw] font-[800] my-[3vw]">{this.data.profile.nickname}</p>
                                <ul class="flex justify-center items-center text-[#9c9c9c] mb-[3.7vw]">
                                    <li>{this.data.profile.follows} 关注</li>
                                    <li class="text-[2.87vw] mx-[3vw] text-[#e5e5e5]">|</li>
                                    <li>{this.data.profile.followeds} 粉丝</li>
                                    <li class="text-[2.87vw] mx-[3vw] text-[#e5e5e5]">|</li>
                                    <li>Lv. {this.data.level}</li>
                                </ul>
                                {/* IP... */}
                                <ul class="text-[3vw] flex justify-center items-center my-[3.24vw]">
                                    <li class="flex items-center justify-center h-[6.11vw] mr-[1.76vw] pr-[2.22vw] pl-[2.41vw] box-border border border-[#e6e6e6] dark:border-[#292929] rounded-[1.3vw]">IP:{areaList.city_list[this.data.profile.city]}</li>
                                    {this.itemsInfo.map((item, index) => (
                                        <li class="flex items-center justify-center h-[6.11vw] mr-[1.76vw] pr-[2.22vw] pl-[2.41vw] box-border border border-[#e6e6e6] dark:border-[#292929] rounded-[1.3vw]" key={index}>{item}</li>
                                    ))}
                                </ul>
                                {/* 编辑资料 */}
                                <ul class=" flex justify-center items-center ">
                                    <li onClick={() => { this.$router.push('/Info') }} class="border border-[#e6e6e6] mr-[1.67vw] rounded-[5vw] text-[3.33vw] w-[23.33vw] h-[8.15vw] flex justify-center items-center">编辑资料</li>
                                    <li onClick={this.singerFn} class="border border-[#e6e6e6] rounded-[50%] text-[3.33vw] w-[8.33vw] h-[8.33vw] flex justify-center items-center animate" >
                                        <Icon class="" icon="ep:arrow-down-bold" />
                                    </li>
                                </ul>
                                {/* 歌手推荐 */}
                                {this.suggest == true ? (
                                    <div class="w-[100%] overflow-y-scroll " ref="singer">
                                        <ul class="pb-[1vw] mt-[4.29vw] mb-[1.5vw] pl-[4.06vw] w-[175vw] flex justify-around">
                                            {this.singerDate.map((item, index) => (
                                                <li class="flex flex-col items-center justify-center w-[25.06vw] h-[37.6vw] rounded-[3vw] bg-[#f5f5f5] dark:bg-none">
                                                    <img class="w-[12.53vw] h-[12.3vw] rounded-[50%] mb-[2.93vw]" src={item.picUrl} alt="" />
                                                    <p class="w-[18.96vw] truncate text-[3.05vw]">{item.name}</p>
                                                    <p class="w-[18.96vw] truncate text-[#b5b5b6] text-[2.93vw]">你可能喜欢</p>
                                                    <div class="w-[15.91vw] h-[6.32vw] text-[2.82vw] mt-[2.6vw] flex justify-center items-center text-[#ec3d4c] border-[0.33vw] border-[#ec3d4c] rounded-[5vw]">
                                                        <Icon class="w-[4vw] h-[4vw]" icon="material-symbols:add" />
                                                        关注
                                                    </div>
                                                </li>
                                            ))}

                                        </ul>
                                    </div>
                                ) : ('')}

                            </div>
                        </section>
                        {/* 主页内容 */}
                        <section class="w-[100%] px-[4.63vw] box-border sticky top-[10vw]">
                            <van-tabs v-model={this.active} sticky offset-top='13vw'>
                                <van-tab title="主页">
                                    {/* 音乐品味 */}
                                    <div class="dark:bg-[#2c2c2c] h-[48.52vw] px-[4.44vw] bg-white rounded-[5vw] mt-[3vw] pt-[4.65vw] box-border">
                                        <p class="text-[4.81vw] mb-[2.7vw] font-[800]">音乐品味</p>
                                        <ul class="flex justify-between">
                                            <li class="w-[26.2vw] h-[32.41vw] pt-[2.56vw] pl-[1.67vw] flex flex-col justify-between border border-[#efe0df] dark:border-[#2C2C2C] rounded-[3.5vw] bg-gradient-to-b dark:from-[#414141] dark:to-[#313131] from-[#fdf2f1] to-[#fefefb]">
                                                <div>
                                                    <p class="text-[3.06vw] text-[#878689] dark:text-[#b1b1b1]">我的喜欢</p>
                                                    <p class="text-[4.26vw] text-[#5b5961] dark:text-[#d5d5d5] font-[800]">{this.list[0]?.trackCount}首</p>
                                                </div>
                                                <div class="flex items-center text-[3.15vw] text-[#b1b1ae] dark:text-[#717171] mb-[2.69vw]">
                                                    <Icon class="mr-[1.11vw]" icon="icon-park-solid:like" />喜欢的音乐
                                                </div>
                                            </li>
                                            <li class="w-[26.2vw] h-[32.41vw] pt-[2.56vw] pl-[1.67vw] flex flex-col justify-between dark:border-[#2C2C2C] border border-[#f3eddc] rounded-[3.5vw] bg-gradient-to-b dark:from-[#414141] dark:to-[#313131] from-[#fdf7e6] to-[#fefef9]">
                                                <div>
                                                    <p class="text-[3.06vw] text-[#878689] dark:text-[#b1b1b1]">累计听歌</p>
                                                    <p class="text-[4.26vw] text-[#5b5961] dark:text-[#d5d5d5] font-[800]">{this.data.listenSongs}首</p>
                                                </div>
                                                <div class="flex items-center text-[3.15vw] text-[#b1b1ae] dark:text-[#717171] mb-[2.69vw]">
                                                    <Icon class="mr-[1.11vw]" icon="fa6-solid:ranking-star" />听歌排行
                                                </div>
                                            </li>
                                            <li class="w-[26.2vw] h-[32.41vw] pt-[2.56vw] pl-[1.67vw] flex flex-col justify-between dark:border-[#2C2C2C] border border-[#e0eef9] rounded-[3.5vw] bg-gradient-to-b dark:from-[#414141] dark:to-[#313131] from-[#eff6fb] to-[#faffff]">
                                                <div>
                                                    <p class="text-[3.06vw] text-[#878689] dark:text-[#b1b1b1]">本周关键词</p>
                                                    <p class="text-[4.26vw] text-[#5b5961] dark:text-[#d5d5d5] font-[800]">属于你的音乐档案</p>
                                                </div>
                                                <div class="flex items-center text-[3.15vw] text-[#b1b1ae] dark:text-[#717171] mb-[2.69vw]">
                                                    <Icon class="mr-[1.11vw]" icon="dashicons:hourglass" />黑胶时光机
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* 创建的歌单 */}
                                    <div class="dark:bg-[#2c2c2c] px-[4.44vw] bg-white rounded-[5vw] mt-[3vw] pt-[4.65vw] pb-[3.8vw] box-border">
                                        <p class="text-[4.81vw] mb-[3.52vw] font-[800]">创建的歌单<span class="text-[#afafaf] text-[3.52vw] ml-[1.67vw] font-[500]">({this.create.length}个)</span></p>
                                        <div>
                                            {this.create.map((item, index) => (
                                                <div class="flex justify-start">
                                                    <div class="w-[13.89vw] h-[15vw] mb-[1.94vw]">
                                                        <div class="relative">
                                                            <div class="w-[12.46vw] h-[10vw] absolute top-0 left-[0.8vw] rounded-[3vw]" style="background: rgba(175, 168 ,168, 0.3)"></div>
                                                            <img src={item.coverImgUrl} class="w-[13.89vw] h-[13.89vw] rounded-xl absolute top-[1vw] left-0" alt="" />
                                                        </div>
                                                    </div>
                                                    <div class="ml-[3.06vw] flex flex-col justify-center">
                                                        <p class="text-[4.35vw] mb-[1.85vw]" key={index}>{item.name}</p>
                                                        <p class="text-[3.15vw] text-[#7f7f7f]" key={index}>{item?.trackCount}首</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* 收藏的歌单 */}
                                    <div class="dark:bg-[#2c2c2c] px-[4.44vw] bg-white rounded-[5vw] mt-[3vw] pt-[4.65vw] pb-[3.8vw] box-border">
                                        <p class="text-[4.81vw] mb-[3.52vw] font-[800]">收藏的歌单<span class="text-[#afafaf] text-[3.52vw] ml-[1.67vw] font-[500]">({this.songList.length})</span></p>
                                        <div>
                                            {this.songList.map((item, index) => (
                                                <div class="flex justify-start">
                                                    <div class="w-[13.89vw] h-[15vw] mb-[1.94vw]">
                                                        <div class="relative">
                                                            <div class="w-[12.46vw] h-[10vw] absolute top-0 left-[0.8vw] rounded-[3vw]" style="background: rgba(175, 168 ,168, 0.3)"></div>
                                                            <img src={item.coverImgUrl} class="w-[13.89vw] h-[13.89vw] rounded-xl absolute top-[1vw] left-0" alt="" />
                                                        </div>
                                                    </div>
                                                    <div class="ml-[3.06vw] flex flex-col justify-center">
                                                        <p class="truncate w-[65vw] text-[4.35vw] mb-[1.85vw]" key={index}>{item.name}</p>
                                                        <p class="truncate w-[65vw] text-[3.15vw] text-[#7f7f7f]" key={index}>{item?.trackCount}首,By  {item.creator.nickname},播放{this.dataTruncation(item.playCount)}次</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* 我的评论 */}
                                    <div class="dark:bg-[#2c2c2c] h-[51.13vw] bg-white rounded-[5vw] mt-[3vw] pt-[4.65vw] box-border">
                                        <div class="flex justify-between items-end mb-[4.17vw] px-[4.44vw]">
                                            <p class="text-[4.81vw] font-[800]">我的评论<span class="text-[#afafaf] text-[3.52vw] ml-[1.67vw] font-[500]">({this.comment.length})</span></p>
                                            <Icon class="w-[4vw] h-[4.06vw] text-[#ccc]" icon="uis:lock" />
                                        </div>
                                        <div>
                                            <div class="px-[4.44vw] h-[24.49vw] border-b-[0.23vw] border-[#ccc]">
                                                <div class="w-[100%] h-[7.2vw] mb-[1.94vw] flex items-center justify-between">
                                                    <img class="w-[7.22vw] h-[7.22vw] rounded-[2vw]" src={JSON.parse(this?.comment[0]?.resourceInfo).coverImgUrl} alt="" />
                                                    <p class="w-[60.95vw] truncate text-[3.27vw] text-[#cfcfcf]"><span class="mx-[2.37vw]">歌单</span><span>[{JSON.parse(this?.comment[0]?.resourceInfo).name}]</span></p>
                                                    <Icon class="w-[4.29vw] text-[#999]" icon="uiw:like-o" />
                                                </div>
                                                <p class="text-[3.72vw] mt-[3.84vw] mb-[1vw] font-[800]">{this.comment[0].content}</p>
                                                <p class="text-[2.82vw] text-[#999">{this.$t(this.comment[0].time)}</p>
                                            </div>
                                        </div>
                                        <div class="h-[10.84vw] flex items-center justify-center text-[3.5vw] text-[#999]">
                                            <p>查看全部</p>
                                            <Icon icon="ep:arrow-right-bold" />
                                        </div>
                                    </div>
                                    {/* 基本信息 */}
                                    <div class="dark:bg-[#2c2c2c] h-[51.13vw] bg-white rounded-[5vw] mt-[3vw] pt-[4.65vw] box-border">
                                        <div class="flex justify-between items-end mb-[4.17vw] px-[4.44vw]">
                                            <p class="text-[4.81vw] font-[800]">基本信息</p>
                                            <p class="w-[22.69vw] h-[6.66vw] flex items-center justify-center text-[3.27vw] border border-[#ccc] rounded-[5vw]">领取村民证</p>
                                        </div>
                                        <div class="px-[4.44vw] h-[24.49vw] text-[4.07vw] border-b-[0.23vw] border-[#ccc]">
                                            <p class="text-[#848484] mb-[2vw]">村龄：<span class="text-[#666]">{this.data.createDays}天{this.getRegistrationDate(this.data.createDays)}</span></p>
                                            <p class="text-[#848484] mb-[2vw]">性别：<span class="text-[#666]">{this.isGender(this.sex)}</span></p>
                                            <p class="text-[#848484]">地区：<span class="text-[#666]">{areaList.province_list[this.data.profile.province]}&nbsp;&nbsp;{areaList.city_list[this.data.profile.city]}</span></p>
                                        </div>
                                        <div class="h-[10.84vw] flex items-center justify-center text-[3.5vw] text-[#999]">
                                            <p>查看全部</p>
                                            <Icon icon="ep:arrow-right-bold" />
                                        </div>
                                    </div>
                                </van-tab>
                                <van-tab title="动态">
                                    <div class="h-[65.5vw]"></div>
                                </van-tab>
                                <van-tab title="播客">
                                    <div class="h-[65.5vw]"></div>
                                </van-tab>
                            </van-tabs>
                        </section>
                    </div>
                </div>
            </Wrapper>
        )
    },
    data() {
        return {
            switchCheckStatus: null,//深色模式
            indexView: "",
            data: {},//个人信息
            areaList,//IP城市数据
            list: [],//歌单数据
            itemsInfo: ['00后 巨蟹座', '什么类型都听听', <Icon onClick={() => { this.$router.push('/Info') }} class="w-[2.41vw]" icon="ep:arrow-right-bold" />],
            songList: [],
            create: [],
            comment: [],//评论
            sex: 0,
            suggest: false,//推荐歌手是否显示
            singerDate: [],
            active: 0,
        }
    },
    async created() {
        // 深色模式
        this.switchCheckStatus = store.get('switch');

        this.data = store.get('_cookieMusic');
        console.log(this.data);

        // 获取id
        const resUser = await getUserAccount();
        // 获取歌单数据
        const res = await getUserPlaylist(resUser.data.profile.userId);
        this.list = res.data.playlist;
        // console.log(this.list);
        this.create = this.list.slice(1, 4);
        // console.log('创建的歌单',this.create);
        this.songList = this.list.slice(this.create.length + 1);
        // console.log('收藏的歌单', this.songList);
        // 获取我的评论
        const resCommit = await getUserComment(resUser.data.profile.userId);
        this.comment = resCommit.data.data.comments;
        // console.log('全部的评论',this.comment);
        // console.log('显示的评论',JSON.parse(this.comment[0].resourceInfo));

        const resSinger = await getSinger();
        this.singerDate = resSinger.data.artists.slice(0, 6);
        // console.log(resSinger.data.artists.slice(0, 6));
    },
    methods: {
        // 转换点击数
        dataTruncation(playVolume) {
            if (playVolume > 100000000) {
                return `${Math.floor(playVolume / 100000000)}亿`;
            } else if (playVolume > 10000) {
                return `${Math.floor(playVolume / 10000)}万`;
            } else {
                return playVolume;
            }
        },
        // 转换出生日期
        getRegistrationDate(totalDays) {
            const currentDate = new Date();
            const registrationDate = new Date(currentDate.getTime() - totalDays * 24 * 60 * 60 * 1000); // 计算注册日期
            const year = registrationDate.getFullYear(); // 获取年份
            const month = registrationDate.getMonth() + 1; // 获取月份

            return `(${year}年${month}月注册)`;
        },
        isGender(sex) {
            return sex === 1 ? '男' : '女'
        },
        // 推荐歌手显隐
        singerFn() {
            this.suggest = !this.suggest;
            const animate = document.querySelector('.animate');
            if (this.suggest) {
                animate.style = 'transform: rotate(-180deg); transition: all .2s linear;'
            } else {
                animate.style = 'transform: rotate(-360deg); transition: all .2s linear;'
            }

            console.log(animate);
        },
        handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            // 如果滚动高度超过阈值，则固定在顶部，否则取消固定
            this.check = scrollTop > this.$refs.mine.offsetHeight / 2 ? false : true;
        },
        // 滚动条插件
        // init(name) {
        //     this.bs = new BScroll(name, {
        //         scrollX: true,
        //         scrollY: true,
        //         probeType: 3,
        //         click: true,
        //     })
        // },
    },
    beforeDestroy() {
        this.bs.destroy();
        window.removeEventListener('scroll', this.handleScroll);
    },
    // updated() {
    //     this.bs.refresh();
    // },
    mounted() {
        // new BScroll(this.$refs.mine);
        // this.init(this.$refs.mine);
        window.addEventListener('scroll', this.handleScroll);
    },
}