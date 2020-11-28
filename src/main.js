import Vue from 'vue'
import App from './App.vue'
import VueTailwind from 'vue-tailwind'

import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'

import settings from './theme.js'

Vue.use(VueTailwind, settings);

new Vue({
  el: "#app",
  render: h => h(App)
});
