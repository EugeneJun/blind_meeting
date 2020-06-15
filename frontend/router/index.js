import loginPage from '../src/components/loginPage'
import registerPage from '../src/components/registerPage'
import registerPage2 from '../src/components/image_recognition'
import chatList from '../src/components/chatList'
import mainPage from '../src/components/mainPage'
import mainPage_worldcup from '../src/components/mainPage_worldcup'
import VueRouter from 'vue-router'

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: loginPage },
    { path: '/login', component: loginPage },
    { path: '/register', component: registerPage },
    { path: '/image_recognition', component: registerPage2 },
    { path: '/mainPage', component: mainPage },
    { path: '/mainPage_worldcup', component: mainPage_worldcup },
    { path: '/chatList', component: chatList },
    { path: '*', component: { template: '<div>Not Found</div>' } }
  ]
})
