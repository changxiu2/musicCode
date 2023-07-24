// 所有的请求都定义在这个位置
import axios from "axios";
import store from 'storejs';

const http = axios.create({
    baseURL:'https://netease-cloud-music-api-five-roan-88.vercel.app',
})
const homepageHttp = axios.create({
    baseURL:'https://netease-cloud-music-c2c1ys55f-cc-0820.vercel.app',
})


// 添加请求拦截器
http.interceptors.request.use(function(config){
    const cookie = store.get('__m__cookie') ?? "";
    config.params = config.params || {};
    config.params.cookie = cookie;
    return config;
})


export const fetchPlaylistHot = () => http.get('/playlist/hot');
export const fetchPlaylists = (cat) => http.get('/top/playlist',{ params:{cat} });
export const fetchSearchDefault = () => http.get('/search/default');//获取默认搜索关键词
export const fetchSearchResult = (params) => http.get('/search',{params})
export const fetchSearchSuggest = (keywords) => http.get('/search/suggest',{params:{keywords}})

export const fetchHomepageBlockPage = () => homepageHttp.get('/homepage/block/page');//首页轮播图/推荐歌单/新歌新碟数据
export const fetchHomepageDragonBall = () => homepageHttp.get('/homepage/dragon/ball');//首页菜单数据
export const fetchCalendar = () => homepageHttp.get('/calendar?startTime=1606752000000&endTime=1609430399999');//音乐日历数据
// 搜索
export const fetchSearchRank = () => homepageHttp.get('/toplist/detail');//搜索页面排行榜数据
export const fetchSearchLove = () => homepageHttp.get('/search/hot/detail');//搜索页面排行榜数据

// 歌单详情
export const fetchSingDetails = (params) => http.get(`/playlist/detail?id=${params}`);
export const fetchSingQus = (params) => http.get(`/playlist/track/all?id=${params}`);
// 歌单详情小轮播数据
export const musicSlider = (params) => http.get(`related/playlist?id=${params}`);


// 二维码生成接口
export const getQRKey = () => http.get('/login/qr/key');
export const getQrInfo = (key,qrimg=1) => http.get('/login/qr/create',{params:{key,qrimg}});
// 二维码检测扫码状态接口
export const checkQrStatus = (key) => http.get('/login/qr/check',{params:{ key,timestamp:Date.now() } });

// 获取账号信息
export const getUserAccount = () => http.get('/user/account');
// 用户详情
export const getUserDetail = (uid) => http.get('/user/detail',{params:{uid}});
// 收藏歌单与创建的歌单数据
export const getUserPlaylist = (uid) => http.get('/user/playlist', { params: { uid } });
// 我的评论
export const getUserComment = (uid) => http.get('/user/comment/history',{params: { uid } })

// 歌曲
export const getMP3 = (id) => http.get('/song/url/v1',{params: { id,level:'standard' } })
export const getTrackDetail = (id) => http.get('/song/detail', { params: { ids: id } });
// 推荐歌手数据
export const getSinger = ()=>http.get('/artist/list?type=1&area=96&initial=b')

// 反向更改数据接口
export const getUpdate = (gender,birthday,nickname,province,city,signature) => http.get('/user/update', { params: { gender,birthday,nickname,province,city,signature} });

// MV排行
export const fetchMvList = (area) => http.get('/top/mv', { params: { limit: 50, area } });

//歌词
export const lyricText = (id) => http.get('/lyric', { params: { id } });


// MV视频
export const fetchMvUrl = (id) => http.get('/mv/url', { params: { id } });
// MV视频信息
export const fetchMvDetail = (mvid) => http.get('/mv/detail', { params: { mvid } });
// 获取 mv 点赞转发评论数数据
export const fetchMvDetailInfo = (mvid) => http.get('/mv/detail/info', { params: { mvid } });

// MV评论
export const fetchCommentMv = (id) => http.get('/comment/mv',{ params:{ id, limit: 50 } });