import loginPage from '../src/components/loginPage'
import registerPage from '../src/components/registerPage'
import registerPage2 from '../src/components/registerPage2'
import mainPage from '../src/components/mainPage'
import VueRouter from 'vue-router'

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: loginPage },
    { path: '/login', component: loginPage },
    { path: '/register', component: registerPage },
    { path: '/register2', component: registerPage2 },
    { path: '/mainPage', component: mainPage },
    { path: '*', component: { template: '<div>Not Found</div>' } }
  ]
})
