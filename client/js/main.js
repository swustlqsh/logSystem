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
