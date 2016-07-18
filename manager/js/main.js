import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Init from '../views/Init.vue'
import {configRouter} from './route-config'
import {API_URL} from '../../config'

Vue.use(VueResource);
Vue.use(VueRouter);
// 2016/07/10 格式的时间
Vue.filter('date',date=>{
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() > 8 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1);
    let da = d.getDate() > 9 ? d.getDate() : '0' + d.getDate();
    return year + '/' + month + '/' + da;
});
// 2016/07/10 xx:xx:xx格式的时间
Vue.filter('dateWithSecond',date=>{
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() > 8 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1);
    let da = d.getDate() > 9 ? d.getDate() : '0' + d.getDate();
    let hour = d.getHours() > 9 ? d.getHours() : '0' + d.getHours();
    let min = d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes();
    let sec = d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds();
    return year + '-' + month + '-' + da + ' ' + hour + ':' + min + ':' + sec;
});
//Vue.http.headers.common['Authorization'] = sessionStorage.getItem('user');
//const app=Vue.extend({});
const router=new VueRouter({hashbang:false});

configRouter(router);

router.start(Init,'#app');

