/**
 * Created by unique on 2020/3/16.
 */
// import './common/businessUtils/antm-viewport.min';
// import './assets/css/base.less';
import './assets/css/reset.css';
import './assets/css/index.scss'
import React from 'react';
import { render } from 'react-dom';
import { HashRouter,hashHistory,BrowserRouter,Route ,Switch} from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'
import { Provider } from 'react-redux';
import Router from './mainRouter.js';

render(
    <HashRouter forceRefresh={false}>
        <CacheSwitch>
            {
                Router.map((item,key)=>{
                    if(item.show){
                        return (<CacheRoute exact key={key} path={item.path} history={hashHistory} component={item.component}></CacheRoute>)
                    }
                })
            }
        </CacheSwitch>
    </HashRouter>
   ,
    document.getElementById("app")
);