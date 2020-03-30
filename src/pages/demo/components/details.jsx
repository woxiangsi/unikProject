import React from 'react';

import '../css/details.scss';
import { NavBar, Icon, List } from 'antd-mobile';
import _util_ from '../../../common/businessUtils/util';
const Item = List.Item;
const Brief = Item.Brief;
const home_bagImg = require("../img/home_bag.png");
const carOwnerImg = require("../img/carOwner.png");
const driverOwnerImg = require("../img/driverOwner.png");

const headImg = require("../img/head_icon.png");
var createModel = require("../model/model");
var model = createModel();
const locationUrl = _util_.getLocation_util() + '/#';

// Toast.loading('Loading...',1,()=>{
// })
const listName = {
    background: '#ccc',
}
class Home extends React.Component {
    constructor(props) {
        super(props)
        let param = _util_.getUrlPam_util();
        this.state = {
            IdentityAuthInfo: {},
            param: param,
            titleStr: param.ownertype == 0 ? "司机认证" : "车主认证",
            LicensName: param.ownertype == 0 ? "驾驶证" : "行驶证",
        }
    }
    componentWillMount() {
        hybrid.addEventListener("onResult", function(para) {
            var json = JSON.parse(para);
            if((json.tag == "refreshList") && (json.code == 8100)){
                this.getIdentityAuthInfo();
            }
        });
        this.getIdentityAuthInfo();
        
    }
    //获取实名认证状态
    getIdentityAuthInfo() {
        var _self = this;
        model.getIdentityAuthInfoss(_self.state.param, function (res) {
            if (res.resultCode == 200) {
                _self.setState({
                    IdentityAuthInfo: res.data

                })
            }
        })
    }

    clickAction() {
        console.log("点击确认");
    }

    idCardAction = (ownertype) => {
        var _self = this;
        var enable = true;
        //添加一个itemType: 0 :真实头像  1:身份证  2:司机的驾驶证 3 车主的行驶证
        //ownertype 0:司机认证   1 车主认证
        var itemType = ownertype;
        var itemTitle1 = ""
        if (itemType == 2) {
            //需要判断是司机还是车主
            if (_self.state.param.ownertype == 1) {
                //车主
                itemType = 3;
            }
        }
        let oldparams = _self.state.param;
        oldparams['itemType'] = itemType;
         enable = _self.getEnableToNext();

       if(itemType == 0){
        itemTitle1 = "真实头像";
       }else if (itemType ==1){
        itemTitle1 = "身份证";
       }else if(itemType ==2){
        itemTitle1 = "驾驶证";
       }else{
        itemTitle1 = "行驶证";
       }
       //汉字需要编码处理
       let itemTitle = encodeURIComponent(itemTitle1);
       let search = `token=${oldparams.token}&pageFrom=${oldparams.pageFrom}&type=${oldparams.type}&itemType=${oldparams.itemType}&itemTitle=${itemTitle}&ownertype=${oldparams.ownertype}`;
       let url = locationUrl + '/authenticationMog/imgUpload?' + search;

        var param = {
            pathname: '/authenticationMog/imgUpload',
            search: search,

        }
        if(enable == false){
            return;
        }
        if (window.mobileAgent.isRunOnApp()) {
            mobileAgent.openNewWindow(url, itemTitle1);
        } else {
            this.props.history.push(param);
        }
    }

    //显示实名认证状态名称
    getStatusName(status) {
        let statusName = "未上传";
        if (status == 1) {
            statusName = "通过";
        } else if (status == 2) {
            statusName = "待审核";
        } else if (status == 0) {
            statusName = "已驳回";
        } else {
            statusName = "未上传";
        }
        return statusName;
    }
    //获取按钮可点击状态
    getBtnEnable() {
        var _self = this;
        var enableStatus = false;
        if (_self.state.param.type == 1) {
            //司机
            if (_self.state.IdentityAuthInfo.driverIdentityStatus == 1 && _self.state.IdentityAuthInfo.idcardStatus == 1 && _self.state.IdentityAuthInfo.memberPhotoStatus == 1) {
                enableStatus = true;
            } else {
                enableStatus = false;
            }
        } else {
            //车主
            if (_self.state.IdentityAuthInfo.vehicleLicenseStatus == 1 && _self.state.IdentityAuthInfo.idcardStatus == 1 && _self.state.IdentityAuthInfo.memberPhotoStatus == 1) {
                enableStatus = true;
            } else {
                enableStatus = false;
            }
        }
        return enableStatus;
    }
    //根据status判断是否可以点击进入下一页
    getEnableToNext(){
        console.log(this.state.param);
        var _self = this;
       // itemType: 0 :真实头像  1:身份证  2:司机的驾驶证 3 车主的行驶证
        var enableStatus = true;
        var itemType = this.state.param.itemType;
        console.log(itemType);
        if(itemType == 0){
            if(this.state.IdentityAuthInfo.memberPhotoStatus == 1){
                enableStatus = false;
             }
        }else if(itemType ==1){
            if(this.state.IdentityAuthInfo.idcardStatus == 1){
                enableStatus = false;
             }
        }else if (itemType ==2){
            if(this.state.IdentityAuthInfo.drivingLicenseStatus == 1){
                enableStatus = false;
             }
        }else{
            if(this.state.IdentityAuthInfo.vehicleLicenseStatus == 1){
                enableStatus = false;
             }
        }
        return enableStatus;
    }
    render() {
        var _self = this;
        return (
            <div className="authentication touchScroll">
                <NavBar
                    mode="light"
                    icon={<Icon key="1" type="left" />}
                    onLeftClick={() => { history.go(-1) }}
                >{this.state.titleStr}</NavBar>
                <div className="wrap_head" onClick={this.idCardAction.bind(this, 0) }>
                    <div className="headLet">
                        <span>真实头像</span>
                    </div>
                    <div className="headRigt">
                        <img className="headimg" src={this.state.IdentityAuthInfo.memberPhoto ? this.state.IdentityAuthInfo.memberPhoto : headImg} alt="" />
                    </div>
                    <div className="rightArrow">
                        <span className="rightArrow_icon"></span>
                    </div>
                    <div className="headStatus">
                        <span className={this.state.IdentityAuthInfo.memberPhotoStatusName ? "uploadStyle" : "unupload"}>
                            {this.state.IdentityAuthInfo.memberPhotoStatusName ? this.state.IdentityAuthInfo.memberPhotoStatusName : "未上传"}
                        </span>
                    </div>
                </div>
                <div className="wrap_main">
                    <div className="wrap_list" onClick={this.idCardAction.bind(this, 1)}>
                        <div className="listLet">
                            <span>身份证</span>
                        </div>
                        <div className="rightArrow">
                            <span className="rightArrow_icon"></span>
                        </div>
                        <div className="listRigt">
                            <span className={this.state.IdentityAuthInfo.idcardStatus ? "uploadStyle" : "unupload"}>
                                {this.getStatusName(this.state.IdentityAuthInfo.idcardStatus)}
                            </span>
                        </div>
                    </div>
                    {/* 司机：驾驶证 车主行驶证 */}
                    <div className="wrap_list" onClick={this.idCardAction.bind(this, 2)}>
                        <div className="listLet">
                            <span>{this.state.LicensName}</span>
                        </div>
                        <div className="rightArrow">
                            <span className="rightArrow_icon"></span>
                        </div>
                        <div className="listRigt">
                            <span className={this.state.param.type == 1 ? (this.state.IdentityAuthInfo.drivingLicenseStatus ? "uploadStyle" : "unupload") : (this.state.IdentityAuthInfo.vehicleLicenseStatus ? "uploadStyle" : "unupload")}>
                                {this.state.param.type == 1 ? this.getStatusName(this.state.IdentityAuthInfo.drivingLicenseStatus) : this.getStatusName(this.state.IdentityAuthInfo.vehicleLicenseStatus)}
                            </span>
                        </div>
                    </div>
                    {
                        // 判断按钮的可点击状态
                        this.getBtnEnable() == true ? (<div className="wrap_bnt" onClick={this.clickAction} > <span>确认</span> </div>) : (<div className="unwrap_bnt"> <span>确认</span> </div>)
                    }
                </div>


            </div>
        )
    }
}
export default Home;