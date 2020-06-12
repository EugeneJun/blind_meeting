import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'
import App from './App.vue'
import router from '../router'
import VueRouter from 'vue-router'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueRouter)

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
