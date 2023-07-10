// 所有的请求都定义在这个位置
import axios from "axios";
import store from "storejs";

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


// @description  获取默认搜索关键字

export const fetchPlaylistHot = () => http.get('/playlist/hot');
export const fetchPlaylists = (cat) => http.get('/top/playlist',{ params:{cat} });
export const fetchSearchDefault = () => http.get('/search/default');//获取默认搜索关键词
export const fetchSearchResult = (params) => http.get('/search',{params})
export const fetchSearchSuggest = (keywords) => http.get('/search/suggest',{params:{keywords}})

export const fetchHomepageBlockPage = () => homepageHttp.get('/homepage/block/page');//首页轮播图/推荐歌单/新歌新碟数据
export const fetchHomepageDragonBall = () => homepageHttp.get('/homepage/dragon/ball');//首页菜单数据
export const fetchCalendar = () => homepageHttp.get('/calendar?startTime=1606752000000&endTime=1609430399999');//音乐日历数据

// 二维码生成接口
export const getQRKey = () => http.get('/login/qr/key');
export const getQrInfo = (key,qrimg=1) => http.get('/login/qr/create',{params:{key,qrimg}});
// 二维码检测扫码状态接口
export const checkQrStatus = (key) => http.get('/login/qr/check',{params:{ key,timestamp:Date.now() } });

// 获取账号信息
export const getUserAccount = () => http.get('/user/account');
// 用户详情
export const getUserDetail = (uid) => http.get('/user/detail',{params:{uid}});

