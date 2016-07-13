import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import {configRouter} from './route-config'
import {API_URL} from '../../config'

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.http.options.root = API_URL;
Vue.http.headers.common['Authorization'] = sessionStorage.getItem('user');
const app=Vue.extend({});
const router=new VueRouter({hashbang:false});

configRouter(router);

router.start(app,'#app');

