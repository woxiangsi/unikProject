import React from 'react';
import {browserHistory,HashRouter,hashHistory} from 'react-router-dom';
import {Toast,NavBar,Icon,InputItem, WhiteSpace,Tabs, Badge,Button} from 'antd-mobile';

import './login.scss';
import $HTTP from '../../common/businessUtils/HTTP';
import {Env, HostURL,} from '../../common/constant/Env';
import _util_ from '../../common/businessUtils/util';
const loginUrl = "http://sy.aerozhonghuan.com:81/test/qdfaw/api/qingqi/tocapp/login";
const quickLogin = "http://sy.aerozhonghuan.com:81/test/qdfaw/api/qingqi/tocapp/quickLogin";
const locationUrl = _util_.getLocation_util()+'#';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userNmae:'',
            passWord:''
        }
    }
    componentWillMount(nextProps){
    }
    goLogin(){
        let search = 'id=001&name=lixuehong';
        let url = locationUrl+'/home?'+search;
        let param = {
            pathname:'/home',
            search:search,
        }
        // if(window.mobileAgent.isRunOnApp()) {
        //     mobileAgent.openNewWindow(url,"首页");
        // }else{
        //     this.props.history.push(param);
        // }
        this.props.history.push(param);
    }
    longin(){
        let param = {
            appType: "qingqi_driver_mobile",
            deviceId: "AFC94082-5594-497C-92C2-1A8BCA931AAC",
            deviceType: 2,
            loginName: 18513677939,
            password: 123456,
            product: 'qingqi',

        }
        $HTTP.get(loginUrl,param)
        .then(function(response){
            console.log(response)
        }).catch(function(error){

        })
    }
    render() {
        const tab = [
            { title: '账号密码登陆' },
            { title: '手机快捷登陆' },
          ];
        return (
            <div className="login">
                <NavBar
                    mode="dark"
                    leftContent=""
                    >登陆</NavBar>
                <WhiteSpace/>
                    <Tabs tabs={tab} initialPage={1} animated={false} useOnPan={false}>
                        <div>
                            <InputItem
                                placeholder="账号"
                                labelNumber={5}
                            >账号</InputItem>
                            <InputItem
                                placeholder="密码"
                                labelNumber={5}
                            >密码</InputItem>
                        </div>
                        <div>
                            <InputItem
                                placeholder="手机号"
                                labelNumber={5}
                            >手机号</InputItem>
                            <InputItem
                                placeholder="密码"
                                labelNumber={5}
                            >密码</InputItem>
                        </div>
                    </Tabs>
                <WhiteSpace />
                
                <div className="loginBun" onClick={this.goLogin.bind(this)}>
                    <Button type="primary" size="small">登陆</Button>    
                </div>
                
            </div>
            
        );
    }
}
export default Login;