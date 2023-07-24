<template>
  <div class="bg-black">
    <!-- 头部 -->
    <header
      class="w-[100%] h-[14.11vw] px-[5vw] pt-[3vw] flex text-white justify-between items-center"
    >
      <Icon
        @click.native="$router.push('/MvView')"
        class="w-[7.87vw] h-[7.2vw]"
        icon="iconoir:arrow-left"
      />
      <div class="flex items-center justify-between w-[22vw]">
        <Icon
          class="w-[7vw] h-[7.2vw] mr-[9.14vw]"
          icon="carbon:shrink-screen-filled"
        />
        <Icon class="w-[7vw] h-[7.2vw]" icon="ri:more-2-fill" />
      </div>
    </header>
    <!-- 视频 -->
    <div class="w-[100%] h-[118.71vw] relative text-white mt-[34vw]">
      <!-- MV视频 loop  autoplay-->
      <div @click="togglePlayPause" class="relative">
        <video autoplay class="w-[100%]" :src="MvUrl" ref="videoPlayer"></video>
        <Icon
          v-if="isPlaying == false"
          class="absolute top-[50%] left-[50%] w-[16vw] h-[16vw] z-[1] mt-[-8vw] ml-[-8vw]"
          icon="solar:play-bold"
        />
      </div>
      <!-- MV信息 -->
      <div class="absolute top-[50vw]">
        <div class="h-[75.51vw] flex justify-between items-end px-[4.5vw]">
          <div class="w-[78vw]">
            <!-- 歌手头像与歌手 -->
            <div class="flex items-center justify-start mb-[3.61vw]">
              <img
                class="w-[10.16vw] h-[10.16vw] rounded-[50%] border-[0.23vw] border-[#fff]"
                :src="info?.artists[0].img1v1Url"
                alt=""
              />
              <p class="text-[4.2vw] font-[800] mx-[1.8vw]">
                {{ info?.artists[0].name }}
              </p>
              <div
                class="w-[7vw] h-[5.53vw] rounded-[2.6vw] whitespace-pre-line text-[4vw] flex items-center justify-center bg-[#fa3e38] font-[800]"
              >
                +
              </div>
            </div>
            <!-- MV详情信息 -->
            <div class="flex items-start justify-start">
              <div
                class="w-[9.03vw] h-[5.08vw] mr-[1.35vw] mt-[0.5vw] rounded-[1.5vw] bg-[#333] text-[2.6vw] font-[700] flex items-center justify-center"
              >
                MV
              </div>
              <p class="text-[4.02vw]">
                {{ info.name }}
                <Icon
                  @click.native="timeToggle = !timeToggle"
                  class="w-[4.5vw] h-[4.5vw] ml-[1.5vw] inline"
                  icon="eva:arrow-down-fill"
                />
              </p>
            </div>
            <!-- 时间 -->
            <p
              v-if="timeToggle"
              class="w-[100%] text-[#9b9b9b] text-[3vw] mt-[3.84vw]"
            >
              {{ info.publishTime }}
            </p>
            <div
              v-else
              class="w-[100%] h-[80vw] overflow-auto oveAuto text-[3.9vw] text-white mt-[2vw]"
            >
              {{ info.desc }}
            </div>
          </div>
          <ul
            class="w-[10.35vw] h-[71.22vw] text-[3.39vw] flex flex-col justify-between items-center"
          >
            <!-- 点赞 -->
            <li
              class="w-[100%] h-[14vw] flex flex-col justify-between items-center"
            >
              <Icon class="w-[8vw] h-[7.9vw]" icon="icon-park-solid:good-two" />
              <p>{{ dataTruncation(sum.likedCount) }}</p>
            </li>
            <!-- 评论 -->
            <li
              @click="commentShow = !commentShow"
              class="w-[100%] h-[14vw] flex flex-col justify-center items-center"
            >
              <Icon class="w-[8vw] h-[7.9vw]" icon="uil:comment-lines" />
              <p>{{ dataTruncation(sum.commentCount) }}</p>
            </li>
            <!-- 转发 -->
            <li
              class="w-[100%] h-[14vw] flex flex-col justify-center items-center"
            >
              <Icon class="w-[8vw] h-[7.9vw]" icon="ion:arrow-redo" />
              <p>{{ dataTruncation(sum.shareCount) }}</p>
            </li>
            <!-- 收藏 -->
            <li
              class="w-[100%] h-[14vw] flex flex-col justify-center items-center"
            >
              <Icon class="w-[8vw] h-[7.9vw]" icon="ic:baseline-add-box" />
              <p>收藏</p>
            </li>
          </ul>
        </div>
        <!-- 滚动歌单 -->
        <div class="flex items-center justify-between pl-[4.5vw] pr-[3vw]">
          <div class="flex items-center justify-start">
            <Icon class="w-[5vw] h-[3.84vw]" icon="clarity:music-note-solid" />
            <van-notice-bar
              class="w-[33.39vw]"
              color="#fff"
              background="rgba(0,0,0,.4)"
              scrollable
              :text="info.name"
            />
            <Icon
              class="w-[5vw] h-[4.85vw]"
              v-if="love"
              icon="icon-park-outline:like"
            />
            <Icon
              class="w-[5vw] h-[4.85vw]"
              v-else
              icon="icon-park-solid:like"
            />
          </div>
          <div
            class="w-[11.85vw] h-[11.85vw] rounded-[50%] overflow-hidden flex items-center relative"
          >
            <img class="w-[100%]" src="/static/record2.png" alt="" />
            <img
              class="w-[8.01vw] h-[8.01vw] rounded-[50%] absolute left-[1.9vw] rotate"
              :src="info.cover"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 进度条 -->
    <div class="w-[100%] h-[26vw] mt-[23vw]">
      <!-- 当前播放时间、总时间 开始 -->
      <div
        class="text-[5vw] flex items-center justify-center"
        v-show="touchTheProgressBar"
      >
        <span class="text-[#ffffff]">{{ currentPlaybackDuration }}</span>
        <span class="text-[#666666]">/{{ currentTotalPlaybackDuration }}</span>
      </div>
      <!-- 进度条 -->
      <vue-slider
        v-model="progress"
        :process="true"
        tooltip="none"
        :drag-on-click="true"
        :min="0"
        :max="100"
        :interval="0.1"
        :duration="0"
        class="videoProgressBar"
        @dragging="handleProgressChange"
        @drag-end="!touchTheProgressBar"
      >
      </vue-slider>
      <div class="h-[12vw] px-[4.74vw]">
        <input
          type="text"
          placeholder="发条友爱评论吧"
          class="h-[12vw] bg-black leading-[10vw]"
        />
      </div>
    </div>
    <!-- 评论 -->
    <van-popup
      v-model="commentShow"
      position="bottom"
      :style="{ height: '60%' }"
    >
      <header
        class="w-[100%] bg-white h-[13.5vw] flex items-center flex-col pl-[3.76vw] pr-[4.02vw] fixed top-[40%]"
      >
        <Icon
          @click.native="commentShow = !commentShow"
          class="w-[5vw] h-[5vw] text-[#e6e6e6]"
          icon="ep:arrow-down-bold"
        />
        <div class="w-[100%] flex items-center justify-between">
          <div class="text-[3.8vw] font-[800]">
            评论({{ dataTruncation(sum.commentCount) }})
          </div>
          <ul
            class="w-[30.26vw] text-[3.16vw] text-[#999] flex justify-between items-center"
          >
            <li class="font-[800] text-black">推荐</li>
            <span>|</span>
            <li>最热</li>
            <span>|</span>
            <li>最新</li>
          </ul>
        </div>
      </header>
      <ul class="mt-[13.5vw]">
        <li
          v-for="item in commentData"
          :key="item.id"
          class="w-[100%] mt-[3vw] pl-[3.76vw] flex justify-between"
        >
          <img
            class="w-[9vw] h-[9vw] rounded-[50%]"
            :src="item.user.avatarUrl"
            alt=""
          />
          <div class="w-[84vw] pr-[4.02vw] border-b-[0.23vw] border-[#ccc]">
            <header class="h-[9.23vw] flex items-center justify-between">
              <div class="flex flex-col justify-around">
                <div class="flex items-center">
                  <p class="text[2.95vw] text-[#666] mr-[1.37vw]">
                    {{ item.user.nickname }}
                  </p>
                  <img
                    class="h-[3.2vw]"
                    :src="item.user?.vipRights?.associator?.iconUrl"
                    alt=""
                  />
                </div>
                <p class="text-[2.45vw] text-[#9b9b9b]">
                  {{ item.timeStr }} {{ item.ipLocation.location }}
                </p>
              </div>
              <div
                class="flex items-center justify-center text-[3vw] text-[#999]"
              >
                <p class="h-[5vw] leading-[7vw]">{{ item.likedCount }}</p>
                <Icon
                  class="w-[5vw] h-[5vw] ml-[1.88vw]"
                  icon="icon-park-outline:good-two"
                />
              </div>
            </header>
            <p class="pt-[3.16vw] pb-[4.1vw] whitespace-pre-line">
              {{ item.content }}
            </p>
          </div>
        </li>
      </ul>
    </van-popup>
  </div>
</template>
<script>
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import {
  fetchMvUrl,
  fetchMvDetail,
  fetchMvDetailInfo,
  fetchCommentMv,
} from '@/request';
export default {
  data() {
    return {
      MvUrl: null, //MV路径
      info: {}, //MV歌手信息
      sum: {},
      timeToggle: true, //MV发布时间是否显示
      touchTheProgressBar: false,
      commentShow: false,
      commentData: {}, //评论数据
      isPlaying: true,
      progress: 0, // 进度
      playbackStatus: false, // 播放状态
      plyrOptions: {
        controls: [], // 播放器实例规则
      },
      currentPlaybackDuration: '00:00', // 当前播放时长
      currentTotalPlaybackDuration: '00:00', // 当前播放总时长
      touchTheProgressBar: false, // 触摸进度条
    };
  },
  async created() {
    // MV链接
    const resMvUrl = await fetchMvUrl(this.$route.params.id);
    this.MvUrl = resMvUrl.data.data.url;
    // MV信息
    const resMvDetail = await fetchMvDetail(this.$route.params.id);
    this.info = resMvDetail.data.data;
    // 点赞评论转发详情
    const resMvDetailInfo = await fetchMvDetailInfo(this.$route.params.id);
    this.sum = resMvDetailInfo.data;
    // 评论详情
    const resMvText = await fetchCommentMv(this.$route.params.id);
    this.commentData = resMvText.data.comments;
    // this.commentData = resMvText.data.hotComments;
    console.log(resMvText.data);
  },
  methods: {
    // 数量转化
    dataTruncation(playVolume) {
      if (playVolume > 100000000) {
        return `${Math.floor(playVolume / 100000000)}亿`;
      } else if (playVolume > 10000) {
        return `${Math.floor((playVolume * 10) / 10000).toFixed(1) / 10}万`;
      } else {
        return playVolume;
      }
    },
    // 初始化视频
    initPlayer() {
      this.$refs.videoPlayer = new Plyr(
        this.$refs.videoPlayer,
        this.plyrOptions
      );

      // 监听 Plyr 播放器的时间更新事件
      this.$refs.videoPlayer.on('timeupdate', this.handleTimeUpdate);
      // this.player = new Plyr(this.$refs.videoPlayer, this.plyrOptions);

      // // 监听 Plyr 播放器的时间更新事件
      // this.player.on('timeupdate', this.handleTimeUpdate);
    },
    // 计算进度 获取 当前播放时间于总时长
    handleTimeUpdate(event) {
      // 根据 Plyr 播放器的当前时间更新进度条
      this.progress =
        (event.detail.plyr.currentTime / event.detail.plyr.duration) * 100;

      this.currentPlaybackDuration = this.formatTime(
        event.detail.plyr.currentTime
      ); //当前播放时长
      this.currentTotalPlaybackDuration = this.formatTime(
        event.detail.plyr.duration
      ); //当前播放总时长
    },
    // 点击 拖到进度条视频跳转到对应进度
    handleProgressChange() {
      // 根据进度条的值计算视频的播放时间
      const currentTime =
        (this.progress / 100) * this.$refs.videoPlayer.duration;

      // 更新 Plyr 播放器的当前时间
      this.$refs.videoPlayer.currentTime = currentTime;

      // 切换为播放状态
      this.$refs.videoPlayer.play();
      this.playbackStatus = false;

      // 显示时间
      this.touchTheProgressBar = true;
      this.currentPlaybackDuration = this.formatTime(currentTime);
    },
    // 切换播放状态
    togglePlayPause() {
      // if (this.player.playing) {
      //     this.player.pause();
      //     this.playbackStatus = true;
      // } else {
      //     this.player.play();
      //     this.playbackStatus = false;
      // }
      const videoElement = this.$refs.videoPlayer;
      if (this.isPlaying) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    // 将时间格式化为分钟和秒钟的形式（例如：01:30）
    formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
    },
  },
};
</script>
<style>
.oveAuto::-webkit-scrollbar {
  height: 0rem;
  width: 1.25rem;
}
</style>
