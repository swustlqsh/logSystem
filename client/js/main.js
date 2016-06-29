import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from '../views/App.vue'
import List from '../views/List.vue'
import Login from '../views/Login.vue'

Vue.use(VueResource);
Vue.use(VueRouter);

const app=Vue.extend({});

const router=new VueRouter();
router.map({
  '/list':{component:List},
  '/login':{component:Login}
});
router.start(app,'body');

/*new Vue({
  el: 'body',
  components: { App, List,Login}
});*/
/*
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from '../views/App.vue'
import List from '../views/List.vue'
import Login from '../views/Login.vue'

Vue.use(VueResource);
new Vue({
  el: 'body',
  components: { App, List,Login}
});
*/
