/**
 * 路由配置模块
 */

import Home from './components/home';
// import Details from './components/details';
// import ImgUpload from './components/imgUpload';
import ListView from './components/ListView';

// import AddPage from './addPage.jsx';
let router = [
    {
        path: '/uniquApp/home',
        component: Home,
        title: '实名认证',
        show: true,
        exact: true
    },
    {
        path: '/uniquApp/listView',
        component: ListView,
        title: '热销推荐',
        show: true,
        exact: true
    },
]
export default router; 
