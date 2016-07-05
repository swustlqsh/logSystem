import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import {configRouter} from './route-config'

Vue.use(VueResource);
Vue.use(VueRouter);

const app=Vue.extend({});
const router=new VueRouter({hashbang:false});

configRouter(router);

router.start(app,'#app');



/*
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from '../views/App.vue'
import {configRouter} from './route-config'

Vue.use(VueResource);
Vue.use(VueRouter);

const app=Vue.component('app', App);
const router=new VueRouter({hashbang:false});

configRouter(router);

router.start(app,'#app');
*/

