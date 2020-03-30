/**
 * 路由配置模块
 */

import Details from './components/details';

// import AddPage from './addPage.jsx';
let router = [
    {
        path: '/detail/index',
        component: Details,
        title: '详情',
        show: true,
        exact: true
    },
    
]
export default router; 
