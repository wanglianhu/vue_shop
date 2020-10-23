import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import("../components/login")
const Home = () => import("../components/home")

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/home",
    component: Home
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

//  添加守卫导航
router.beforeEach((to, from, next) => {
  //  to 到哪个路径
  //  from 来自哪个路径
  //  next() 正常使用  next('路径') 强制跳转

  //  1.如果去登录界面，就放行
  if (to.path === '/login') return next()

  //  2.获取token
  let tokenStr = window.sessionStorage.getItem('token')

  //  3.如果没有token,跳转到登录界面
  if (!tokenStr) return next("login")

  //  4.其他情况，就正常放行
  return next()
});

export default router
