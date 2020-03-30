/**
 * 路由配置模块
 */

import NotFound from './components/notFound.jsx';
import Login from './components/login/login.jsx';
import Home from './components/home/Home.jsx';
import authenticationMogRouter from './pages/demo/router';
import uniquAppRouter from './pages/uniquApp/router';
import DetailRouter from './pages/detail/router';

let Routers = [
    {
        path:'/',
        component: Login,
        title:'登陆',
        show:true,
        exact: true
    },
    {
        path:'/login',
        component: Login,
        title:'登陆',
        show:true,
        exact: true
    },
    {
        path:'/home',
        component: Home,
        title:'首页',
        show:true,
        exact: true
    },
]

/**
 * 微信邀请购车模块
 */
authenticationMogRouter.forEach((item,index)=>{
    Routers.push(item)
})
/**
 * 优你客功能
 */
uniquAppRouter.forEach((item,index)=>{
    Routers.push(item)
})

DetailRouter.forEach((item,index)=>{
    Routers.push(item)
})


/**
 * 获取不到页面显示
 */
Routers.push({
    path:'',
    component: NotFound,
    title:'NoPage',
    show:true,
    exact: true
})
export default Routers; 
