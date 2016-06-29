import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import {configRouter} from './route-config'

Vue.use(VueResource);
Vue.use(VueRouter);

const app=Vue.extend({});
const router=new VueRouter();

configRouter(router);

router.start(app,'body');

