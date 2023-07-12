import styled from 'styled-components-vue';
import store from 'storejs';
import { areaList } from '@vant/area-data';
import { getUserAccount, getUserPlaylist, getUserComment } from '@/request';
// const Wrapper = styled.div``;
export default {
    render() {
        return (
            <div class="bg-[#f5f5f5] pb-[16vw]">
                <div class={`w-screen h-[65.28vw] relative overflow-hidden rounded-b-[2vw]`}>
                    <img class="w-[100%] h-[65.28vw]" src={this.data.profile.backgroundUrl} alt="" />
                    <header class="w-screen h-[12.41vw] fixed top-0 left-0 z-20 flex items-center justify-between pl-[4.72vw] pr-[5.93vw] text-[#fff]" style="background=rgba(0,0,0,.5)">
                        <Icon nativeOnClick={() => { this.$router.push('/Index') }} class="z-10 w-[6vw] h-[6vw]" icon="ph:arrow-left-bold" />
                        <Icon class="w-[5vw] h-[5.6vw] font-[800]" icon="ri:more-2-fill" />
                    </header>
                </div>
                {/* 我的信息 */}
                <section class="w-[100%] h-[51vw] px-[4.63vw] box-border relative mb-[6.11vw]">
                    <div class="w-[91.11vw] h-[51vw] rounded-[5vw] text-center bg-white absolute top-[-4.26vw]">
                        <p class="text-[5.56vw] font-[800] mt-[10.2vw]">{this.data.profile.nickname}</p>
                        <ul class="flex justify-center items-center text-[#9c9c9c] mb-[3.7vw]">
                            <li>{this.data.profile.follows} 关注</li>
                            <li class="text-[2.87vw] mx-[3vw] text-[#e5e5e5]">|</li>
                            <li>{this.data.profile.followeds} 粉丝</li>
                            <li class="text-[2.87vw] mx-[3vw] text-[#e5e5e5]">|</li>
                            <li>Lv. {this.data.level}</li>
                        </ul>
                        <ul class="text-[3vw] flex justify-center items-center my-[3.24vw]">
                            <li class="flex items-center justify-center h-[6.11vw] mr-[1.76vw] pr-[2.22vw] pl-[2.41vw] box-border border border-[#e6e6e6] rounded-[1.3vw]">IP:{areaList.city_list[this.data.profile.city]}</li>
                            {this.itemsInfo.map((item, index) => (
                                <li class="flex items-center justify-center h-[6.11vw] mr-[1.76vw] pr-[2.22vw] pl-[2.41vw] box-border border border-[#e6e6e6] rounded-[1.3vw]" key={index}>{item}</li>
                            ))}
                        </ul>
                        <ul class=" flex justify-center items-center ">
                            <li onClick={() => { this.$router.push('/Info') }} class="border border-[#e6e6e6] mr-[1.67vw] rounded-[5vw] text-[3.33vw] w-[23.33vw] h-[8.15vw] flex justify-center items-center">编辑资料</li>
                            <li class="border border-[#e6e6e6] rounded-[50%] text-[3.33vw] w-[8.33vw] h-[8.33vw] flex justify-center items-center">
                                <Icon class="" icon="ep:arrow-down-bold" />
                            </li>
                        </ul>
                    </div>
                    <img class="w-[19.44vw] h-[19.44vw] rounded-[50%] absolute top-[-16.2vw] left-[50%] ml-[-10vw]" src={this.data.profile.avatarUrl} alt="" />
                </section>
                {/* 主页内容 */}
                <section class="w-[100%] px-[4.63vw] box-border">
                    <ul class="w-[100%] text-[4.296vw] font-[800] text-[#929595] flex justify-center items-center">
                        <li class="text-[#000] mr-[13.8vw] ">主页</li>
                        <li class="mr-[13.8vw]">动态</li>
                        <li class="">播客</li>
                    </ul>
                    {/* 音乐品味 */}
                    <div class="h-[48.52vw] px-[4.44vw] bg-white rounded-[5vw] mt-[3vw] pt-[4.65vw] box-border">
                        <p class="text-[4.81vw] mb-[2.7vw] font-[800]">音乐品味</p>
                        <ul class="flex justify-between">
                            <li class="w-[26.2vw] h-[32.41vw] pt-[2.56vw] pl-[1.67vw] flex flex-col justify-between border border-[#efe0df] rounded-[3.5vw] bg-gradient-to-b from-[#fdf2f1] to-[#fefefb]">
                                <div>
                                    <p class="text-[3.06vw] text-[#878689]">我的喜欢</p>
                                    <p class="text-[4.26vw] text-[#5b5961] font-[800]">{this.list[0]?.trackCount}首</p>
                                </div>
                                <div class="flex items-center text-[3.15vw] text-[#b1b1ae] mb-[2.69vw]">
                                    <Icon class="mr-[1.11vw]" icon="icon-park-solid:like" />喜欢的音乐
                                </div>
                            </li>
                            <li class="w-[26.2vw] h-[32.41vw] pt-[2.56vw] pl-[1.67vw] flex flex-col justify-between border border-[#f3eddc] rounded-[3.5vw] bg-gradient-to-b from-[#fdf7e6] to-[#fefef9]">
                                <div>
                                    <p class="text-[3.06vw] text-[#878689]">累计听歌</p>
                                    <p class="text-[4.26vw] text-[#5b5961] font-[800]">{this.data.listenSongs}首</p>
                                </div>
                                <div class="flex items-center text-[3.15vw] text-[#b1b1ae] mb-[2.69vw]">
                                    <Icon class="mr-[1.11vw]" icon="fa6-solid:ranking-star" />听歌排行
                                </div>
                            </li>
                            <li class="w-[26.2vw] h-[32.41vw] pt-[2.56vw] pl-[1.67vw] flex flex-col justify-between border border-[#e0eef9] rounded-[3.5vw] bg-gradient-to-b from-[#eff6fb] to-[#faffff]">
                                <div>
                                    <p class="text-[3.06vw] text-[#878689]">本周关键词</p>
                                    <p class="text-[4.26vw] text-[#5b5961] font-[800]">属于你的音乐档案</p>
                                </div>
                                <div class="flex items-center text-[3.15vw] text-[#b1b1ae] mb-[2.69vw]">
                                    <Icon class="mr-[1.11vw]" icon="dashicons:hourglass" />黑胶时光机
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* 创建的歌单 */}
                    <div class="px-[4.44vw] bg-white rounded-[5vw] mt-[3vw] pt-[4.65vw] pb-[3.8vw] box-border">
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
                    <div class="px-[4.44vw] bg-white rounded-[5vw] mt-[3vw] pt-[4.65vw] pb-[3.8vw] box-border">
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
                    <div class="h-[51.13vw] bg-white rounded-[5vw] mt-[3vw] pt-[4.65vw] box-border">
                        <div class="flex justify-between items-end mb-[4.17vw] px-[4.44vw]">
                            <p class="text-[4.81vw] font-[800]">我的评论<span class="text-[#afafaf] text-[3.52vw] ml-[1.67vw] font-[500]">({this.comment.length})</span></p>
                            <Icon class="w-[4vw] h-[4.06vw] text-[#ccc]" icon="uis:lock" />
                        </div>
                        <div>
                            {/* {this.comment.map((item, index) => (
                                <div class="px-[4.44vw] h-[24.49vw] flex justify-start border-b-[0.23vw] border-[#ccc]">
                                    <div class="w-[13.89vw] h-[15vw] mb-[1.94vw]">
                                        <div class="relative">
                                            <div class="w-[12.46vw] h-[10vw] absolute top-0 left-[0.8vw] rounded-[3vw]" style="background: rgba(175, 168 ,168, 0.3)"></div>
                                            <img src={JSON.parse(item.resourceInfo).coverImgUrl} class="w-[13.89vw] h-[13.89vw] z-[2] rounded-xl absolute top-[1vw] left-0" alt="" />
                                        </div>
                                    </div>
                                    <div class="ml-[3.06vw] flex flex-col justify-center">
                                        <p class="text-[4.35vw] mb-[1.85vw]" key={index}>{item.name}</p>
                                        <p class="text-[3.15vw] text-[#7f7f7f]" key={index}>{item.trackCount}首</p>
                                    </div>
                                </div>
                            ))} */}
                            <div class="px-[4.44vw] h-[24.49vw] border-b-[0.23vw] border-[#ccc]">
                                <div class="w-[100%] h-[7.2vw] mb-[1.94vw] flex items-center justify-between">
                                    <img class="w-[7.22vw] h-[7.22vw] rounded-[2vw]" src={JSON.parse(this.comment[0].resourceInfo).coverImgUrl} alt="" />
                                    <p class="w-[60.95vw] truncate text-[3.27vw] text-[#cfcfcf]"><span class="mx-[2.37vw]">歌单</span><span>[{JSON.parse(this.comment[0].resourceInfo).name}]</span></p>
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
                    <div class="h-[51.13vw] bg-white rounded-[5vw] mt-[3vw] pt-[4.65vw] box-border">
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
                </section>
            </div>
        )
    },
    data() {
        return {
            indexView: "",
            data: {},//个人信息
            areaList,//IP城市数据
            list: [],//歌单数据
            itemsInfo: ['00后 巨蟹座', '什么类型都听听', <Icon onClick={() => { this.$router.push('/Info') }} class="w-[2.41vw]" icon="ep:arrow-right-bold" />],
            songList: [],
            create: [],
            comment: [],//评论
            sex: 0,
        }
    },
    async created() {
        this.data = store.get('_cookieMusic');
        // console.log(this.data);

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


    },
    methods: {
        dataTruncation(playVolume) {
            if (playVolume > 100000000) {
                return `${Math.floor(playVolume / 100000000)}亿`;
            } else if (playVolume > 100000) {
                return `${Math.floor(playVolume / 10000)}万`;
            } else {
                return playVolume;
            }
        },
        getRegistrationDate(totalDays) {
            const currentDate = new Date();
            const registrationDate = new Date(currentDate.getTime() - totalDays * 24 * 60 * 60 * 1000); // 计算注册日期

            const year = registrationDate.getFullYear(); // 获取年份
            const month = registrationDate.getMonth() + 1; // 获取月份

            return `(${year}年${month}月注册)`;
        },
        isGender(sex) {
            return sex === 1 ? '男' : '女'
        }
    }
}