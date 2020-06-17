import Vue from 'vue'
import App from './App.vue'
import router from '../router'
import VueRouter from 'vue-router'
import VueSocketIO from 'vue-socket.io'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import SocketIO from 'socket.io-client'

Vue.config.productionTip = false

Vue.use(VueRouter)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('localhost:3000'),
  vuex: {
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  options: { path: '/frontend/' }
}))

new Vue({
  el: '#app',
  render: h => h(App),

  // 라우터 객체를 넘겨준다
  router
}).$mount('#app')
