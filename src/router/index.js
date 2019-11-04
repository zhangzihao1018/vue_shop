import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Welcome from "../components/Welcome.vue"
//@相当于src目录
import Users from "@/components/user/Users.vue"
Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/home", component: Home,redirect:'/welcome' ,children:[
    {path:'/welcome',component:Welcome},
    {path:'/users',component:Users}
  ]}
];

const router = new VueRouter({
  routes
});
//本质就是改写了element内部的push方法
//对错误进行了捕获
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
//路由导航守卫 防止非法登录（通过token判断有没有登录）
//a路由向b路由跳转前会执行
router.beforeEach(function(to, from, next) {
  // console.log(to); 去往哪里
  // console.log(from); 从哪里来
  //判断用户要去那个页面，如果去登录页面直接放行
  if (to.path == "/login") return next();
  //获取token值
  let tokenStr = window.sessionStorage.getItem("token");
  //判断不是去登录页面的用户token值是否存在，存在放行，不存在强制跳转到登录页面
  if (!tokenStr) return next("/login");
  next();
});
export default router;
