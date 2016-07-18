import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import {configRouter} from './route-config'

Vue.use(VueResource);
Vue.use(VueRouter);

// 2016/07/10 格式的时间
Vue.filter('date',(date)=>{
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() > 8 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1);
    let da = d.getDate() > 9 ? d.getDate() : '0' + d.getDate();
    return year + '/' + month + '/' + da;
});
Vue.filter('logNoPic',(content)=>{
    return content.replace(/<\s?img[^>]*>/gi, "");
});
const app=Vue.extend({});
const router=new VueRouter({hashbang:false});

configRouter(router);

router.start(app,'#app');




