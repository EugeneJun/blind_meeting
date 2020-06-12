import loginPage from '../src/components/loginPage'
import registerPage from '../src/components/registerPage'
import mainPage from '../src/components/mainPage'
import VueRouter from 'vue-router'

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: loginPage },
    { path: '/login', component: loginPage },
    { path: '/register', component: registerPage },
    { path: '/mainPage', component: mainPage },
    { path: '*', component: { template: '<div>Not Found</div>' } }
  ]
})
