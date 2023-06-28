// 所有的请求都定义在这个位置
import axios from "axios";

const http = axios.create({
    baseURL:'https://netease-cloud-music-api-five-roan-88.vercel.app',
})
const homepageHttp = axios.create({
    baseURL:'https://netease-cloud-music-c2c1ys55f-cc-0820.vercel.app',
})

export const fetchPlaylistHot = () => http.get('/playlist/hot');
export const fetchPlaylists = (cat) => http.get('/top/playlist',{ params:{cat} });
export const fetchSearchDefault = () => http.get('/search/default');//获取默认搜索关键词
export const fetchSearchResult = (params) => http.get('/search',{params})
export const fetchSearchSuggest = (keywords) => http.get('/search/suggest',{params:{keywords}})

export const fetchHomepageBlockPage = () => homepageHttp.get('/homepage/block/page');//首页轮播图/新歌新碟数据
export const fetchHomepageDragonBall = () => homepageHttp.get('/homepage/dragon/ball');//首页菜单数据
export const fetchPersonalizedLimit = () => homepageHttp.get('/personalized?limit=6');//首页推荐歌单数据
// export const fetchHotTopic = () => homepageHttp.get('/hot/topic');//首页推荐歌单数据
export const fetchCalendar = () => homepageHttp.get('/calendar?startTime=1606752000000&endTime=1609430399999');//音乐日历数据
// https://netease-cloud-music-c2c1ys55f-cc-0820.vercel.app/calendar?startTime=1606752000000&endTime=1609430399999