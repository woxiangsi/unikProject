import React from 'react';
import '../css/home.scss';
import { NavBar, Icon, List } from 'antd-mobile';
import _util_ from '../../../common/businessUtils/util';
const Item = List.Item;
const Brief = Item.Brief;
const home_bagImg = require("../img/home_bag.png");
const carOwnerImg = require("../img/carOwner.png");
const driverOwnerImg = require("../img/driverOwner.png");
var createModel = require("../model/model");
var model = createModel();

const locationUrl = _util_.getLocation_util() + '/#';

const listName = {
    background: '#ccc',
}
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            IdentityAuthInfo: {},

        }
    }
    componentWillMount() {
        hybrid.addEventListener("onResult", function (para) {
            var json = JSON.parse(para);
            if ((json.tag == "refreshList") && (json.code == 8100)) {
                this.getIdentityAuthInfo();
            }
        });
        this.getIdentityAuthInfo();
    }
    addBnt() {
        // alert('添加')
        let path = {
            pathname: '/authenticationMog/details',
        }
        this.props.history.push(path);
    }
    goDetails(type) {

        var _self = this;
        var oldParams = _self.getParam();
        //需要判断，已通过的状态下不可点击
        if (type == 0) {
            if (_self.state.IdentityAuthInfo.driverIdentityStatus == "1") {
                return;
            }
        } else {
            if (_self.state.IdentityAuthInfo.ownerIdentityStatus == "1") {
                return;
            }
        }
        //token   pageFrom    carId  carNumber ？？暂时先不处理 type  ownertype ：0 司机认证 1 车主认证
        let search = `token=${oldParams.token}&pageFrom=${oldParams.pageFrom}&type=${oldParams.type}&ownertype=${type}`;
        let url = locationUrl + '/authenticationMog/details?' + search;

        var param = {
            pathname: '/authenticationMog/details',
            search: search,
        }
        var titleName = type == 0 ? "司机认证" : "车主认证"
        if (window.mobileAgent.isRunOnApp()) {
            mobileAgent.openNewWindow(url, titleName);
        } else {
            this.props.history.push(param);
        }

    }


    //获取参数
    getParam() {
        var _self = this;
        var params = {
            token: "+gBXqtAMcClqQwlHhMeZmJTlfQY=",
            pageFrom: 2,
            type: 1,
            appType: 1,
        }
        return params;
    }
    //获取实名认证状态
    getIdentityAuthInfo() {
        var params = this.getParam();
        var _self = this;
        model.getIdentityAuthInfoss(params, function (res) {
            if (res.resultCode == 200) {
                _self.setState({
                    IdentityAuthInfo: res.data
                })
            }else{
                Toast.info(res.message, 1);
            }
        })
    }
    render() {
        var _self = this;
        return (
            <div className="authentication touchScroll">
                <NavBar
                    mode="light"
                    icon={<Icon key="1" type="left" />}
                    onLeftClick={() => { history.go(-1) }}
                >实名认证</NavBar>
                <div className="bagImg">
                    <img src={home_bagImg} alt="" />
                </div>
                <List className="list_style">
                    <Item align="center" thumb={carOwnerImg} className="item_style" multipleLine onClick={_self.goDetails.bind(this, 0)}>
                        司机认证 <Brief>驾驶证、驾驶证、自拍照片</Brief>
                        {
                            _self.state.IdentityAuthInfo.driverIdentityStatus == "1" ? (
                                <div className="list_state"></div>
                            ) : ""
                        }
                        <span className="rightArrow_icon"></span>
                    </Item>
                </List>
                <List className="list_style">
                    <Item align="center" thumb={driverOwnerImg} className="item_style" multipleLine onClick={_self.goDetails.bind(this, 1)}>
                        车主认证 <Brief>行驶证、驾驶证、自拍照片</Brief>
                        {
                            _self.state.IdentityAuthInfo.ownerIdentityStatus == "1" ? (
                                <div className="list_state"></div>
                            ) : ""
                        }
                        <span className="rightArrow_icon"></span>
                    </Item>
                </List>
            </div>
        )
    }
}
export default Home;