import React from 'react';
import {Flex,Tabs} from 'antd-mobile';
import './Home.scss';
import _util_ from '../../common/businessUtils/util';
const locationUrl = _util_.getLocation_util()+'#';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userNmae:'',
            passWord:'',
            list:[
                {
                    title:'实名认证',
                    path:'/uniquApp/home'
                },
        
            ]

        }
        this.userList = props.location;

    }
    componentWillMount(nextProps){
        window.__navBakComp__ = this;
        var param = _util_.getUrlPam_util();
    }
    componentDidMount(){
    }
    
    goLogin(){
        this.longin()
    }
    // 可选地，上面的请求可以这样做
    
    tabBnt(tab,index){
        // alert(JSON.stringify(mobileAgent))
    }
    naVTabBnt(item){
        let search = '';
        let url = locationUrl+item.path+'?'+search;
        let param = {
            pathname:item.path, 
            search:search,
        }
        // if(window.mobileAgent.isRunOnApp()) {
        //     mobileAgent.openNewWindow(url,item.title);
        // }else{
        //     this.props.history.push(param);
        // }
        this.props.history.push(param);
       
    }
    renderDataList = ()=>{
        let {list} = this.state;
        let _self = this;
        let str = <Flex wrap="wrap">
                    {
                        list.map((item,index)=>{
                            return(<Flex.Item onClick={_self.naVTabBnt.bind(this,item)} key={index}>
                                    <div className="navTab">
                                        <div className="navTab_icon">
                                            <span ></span>
                                        </div>
                                        <div className="">
                                            <span>{item.title}</span>
                                        </div>
                                    </div>
                                </Flex.Item>)
                        })
                    }
                </Flex>
        return str
    }
    render() {
        const tab = [
            { title: '首页',sub:'1'},
            { title: '统计',sub:'2'},
            { title: '福利社',sub:'3'},
            { title: '消息',sub:'4'},
            {title:'我的',sub:'5'}
        ];
        return (
            <div className="Home">
                <div className="main">
                    {this.renderDataList()}
                </div>
                <div className="foot">
                    <Tabs 
                        tabs={tab} 
                        initialPage={0} 
                        animated={false} 
                        useOnPan={false} 
                        tabBarPosition='bottom'
                        // onChange={this.tabChange.bind(this)}
                        onTabClick={this.tabBnt.bind(this)}
                        >
                    </Tabs>
                </div>
                    
            </div>
            
        );
    }
}
export default Home;