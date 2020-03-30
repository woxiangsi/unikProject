/**
 * 路由配置模块
 */

import Home from './components/home';
import Details from './components/details';
import ImgUpload from './components/imgUpload';

// import AddPage from './addPage.jsx';
let router = [
    {
        path: '/authenticationMog/home',
        component: Home,
        title: '实名认证',
        show: true,
        exact: true
    },
    {
        path: '/authenticationMog/details',
        component: Details,
        title: '司机认证',
        show: true,
        exact: true
    },
    {
        path: '/authenticationMog/imgUpload',
        component: ImgUpload,
        title: '真实头像',
        show: true,
        exact: true
    },
]
export default router; 
