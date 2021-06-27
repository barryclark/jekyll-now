import Vue from 'vue'
import App from './App.vue'
// import VueRouter from 'vue-router'
import VueTailwind from 'vue-tailwind'
import router from './router.js';

import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import 'material-design-icons/iconfont/material-icons.css'
import "tailwindcss/tailwind.css"

import settings from './theme.js'

Vue.use(VueTailwind, settings);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app-container');
