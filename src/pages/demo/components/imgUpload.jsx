import React from 'react';

import '../css/imgUpload.scss';
import { NavBar, Icon, List, Toast } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;
import _util_ from '../../../common/businessUtils/util';
const locationUrl = _util_.getLocation_util() + '/#';
const headImg = require("../img/head_icon.png");
const IDaImg = require("../img/ID_a.png");
const IDbImg = require("../img/ID_b.png");
const drivingLicensea = require("../img/drivingLicense_a.png");
const drivingLicenseb = require("../img/drivingLicense_b.png");
const driverLicense = require("../img/driverLicense.png");
const headiconImg = require("../img/head_icon.png");
var createModel = require("../model/model");
var model = createModel();

class ImgUpload extends React.Component {
    constructor(props) {
        super(props)
        let param = _util_.getUrlPam_util();
        this.state = {
            param: param,
            itemTitle: (param['itemTitle'] ? decodeURIComponent(param['itemTitle']) : " 实名认证"),
            IdentityAuthInfo: {},
            imgType: 1,//当前选择的图片类型
            wraningmessage: false,//图像识别有误的提示
            edit: false,

        }
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

    //获取提交按钮的可点击状态
    getBtnEnabel() {
        var btnEnable = true;
        var _self = this;
        //通过、待审核。1,2不可编辑
        if (_self.state.param.itemType == 0) {
            //头像
            if (_self.state.IdentityAuthInfo.memberPhotoStatus == 1 || _self.state.IdentityAuthInfo.memberPhotoStatus == 2) {
                btnEnable = false;
            }
        } else if (_self.state.param.itemType == 1) {
            //身份证
            if (_self.state.IdentityAuthInfo.idcardStatus == 1 || _self.state.IdentityAuthInfo.idcardStatus == 2) {
                btnEnable = false;
            }
        } else if (_self.state.param.itemType == 2) {
            //驾驶证
            if (_self.state.IdentityAuthInfo.drivingLicenseStatus == 1 || _self.state.IdentityAuthInfo.drivingLicenseStatus == 2) {
                btnEnable = false;
            }
        } else {
            //行驶证
            if (_self.state.IdentityAuthInfo.vehicleLicenseStatus == 1 || _self.state.IdentityAuthInfo.vehicleLicenseStatus == 2) {
                btnEnable = false;
            }
        }

        return btnEnable;
    }
    /**
* 提交信息
*/
    clickAction = () => {

        var params = {
            token: this.state.param.token,
            userIdentityRoleId: this.state.IdentityAuthInfo.userIdentityRoleId,
            identityAuth: this.state.param.ownertype,
        }
        //判断是不是编辑
        let editAction = false;
        var _self = this;
        //itemType: 0 :真实头像  1:身份证  2:司机的驾驶证 3 车主的行驶证
        let itemType = this.state.param.itemType;
        console.log(itemType);
        if (itemType == 0) {
            if (!_self.state.IdentityAuthInfo.memberPhoto) {
                alert("请上传头像");
                return;
            } else {
                ////0头像 1身份证 2行驶证 3驾驶证
                alert("hhahahha")
                if (this.state.IdentityAuthInfo.memberPhotoStatus == 0) {
                    editAction = true
                }
                params['identityAuthOption'] = 0;
                params['memberPhoto'] = this.state.IdentityAuthInfo.memberPhoto;

            }
        } else if (itemType == 1) {
            if ((!this.state.IdentityAuthInfo.idcardFrontUrl) && (!this.state.IdentityAuthInfo.idcardBackUrl)) {
                alert("请上传身份证信息");
                return;
            } else {
                if (this.state.IdentityAuthInfo.idcardStatus == 0) {
                    editAction = true
                }
                params['identityAuthOption'] = 1;
                params['idcardFrontPhoto'] = this.state.IdentityAuthInfo.idcardFrontUrl;
                params['idcardBackPhoto'] = this.state.IdentityAuthInfo.idcardFrontUrl;
                params['realName'] = this.state.IdentityAuthInfo.realName;
                params['identityNo'] = this.state.IdentityAuthInfo.identityNo;
                // param['identityAddr'] = address;


            }
        } else if (itemType == 2) {
            //驾驶证
            if (!this.state.IdentityAuthInfo.drivingLicenseUrl) {
                alert("请上传驾驶证信息");
                return;
            } else {
                if (this.state.IdentityAuthInfo.driverIdentityStatus == 0) {
                    editAction = true
                }
                params['identityAuthOption'] = 3;
                params['drivingLicensePhoto'] = this.state.IdentityAuthInfo.drivingLicenseUrl;

            }
        } else if (itemType == 3) {
            if ((!this.state.IdentityAuthInfo.vehicleLicenseBackUrl) && (!this.state.IdentityAuthInfo.vehicleLicenseFrontUrl)) {
                alert("请上传行驶证信息");
                return;
            } else {
                if (this.state.IdentityAuthInfo.vehicleLicenseStatus == 0) {
                    editAction = true
                }
                params['identityAuthOption'] = 2;
                params['vehicleLicenseFrontPhoto'] = this.state.IdentityAuthInfo.vehicleLicenseFrontUrl;
                params['vehicleLicenseBackPhoto'] = this.state.IdentityAuthInfo.vehicleLicenseBackUrl;

            }
        }
        //判断是不是编辑页面
        if (editAction == false) {
            model.saveIdentityAuth(params, function (res) {
                if (res.resultCode == 200) {
                    if (mobileAgent.isRunOnApp()) {
                        mobileAgent.setResult({ "code": 8100, "tag": "refreshList", "url": "baidu.com" });
                        mobileAgent.closeWindow();
                    }
                } else {
                    alert(res.message);
                }
            });

        } else {
            model.editIdentityAuth(params, function (res) {
                if (res.resultCode == 200) {
                    if (mobileAgent.isRunOnApp()) {
                        mobileAgent.setResult({ "code": 8100, "tag": "refreshList", "url": "baidu.com" });
                        mobileAgent.closeWindow();
                    }
                } else {
                    alert(res.message);
                }
            });
        }

    }

    //点击拍照按钮事件
    imageAction = (index) => {
        window.__navBakComp__ = this;
        var _self = this;
        //1.头像  2.身份证正面、3.身份证反面   4行驶证主页 5，行驶证副页 6 驾驶证主页
        this.setState({
            imgType: index
        }, () => {
            var isenable = this.getBtnEnabel();
            //按钮不可点击的时候，只能是查看大图
            if (index == 1) {
                //通过、待审核
                if (_self.state.IdentityAuthInfo.memberPhotoStatus == 1 || _self.state.IdentityAuthInfo.memberPhotoStatus == 2) {
                    var paramArr0 = [];
                    paramArr0.push(_self.state.IdentityAuthInfo.memberPhoto);
                    console.log(paramArr0);
                    mobileAgent.pictureZoom(paramArr0);
                } else {
                    mobileAgent.selectImageAndUpload('__navBakComp__.getImgSuccess', '__navBakComp__.getImgError', 2, 1)
                }
            } else if (index == 2) {

                if (_self.state.IdentityAuthInfo.idcardStatus == 1 || _self.state.IdentityAuthInfo.idcardStatus == 2) {
                    var paramArr0 = [];
                    paramArr0.push(_self.state.IdentityAuthInfo.idcardFrontUrl);
                    console.log(paramArr0);
                    mobileAgent.pictureZoom(paramArr0);
                } else {
                    mobileAgent.analyseImageAndUpload('__navBakComp__.getImgSuccess', '__navBakComp__.getImgError');
                }

            } else if (index == 3) {

                if (_self.state.IdentityAuthInfo.idcardStatus == 1 || _self.state.IdentityAuthInfo.idcardStatus == 2) {
                    var paramArr0 = [];
                    paramArr0.push(_self.state.IdentityAuthInfo.idcardBackUrl);
                    console.log(paramArr0);
                    mobileAgent.pictureZoom(paramArr0);
                } else {
                    mobileAgent.selectImageAndUpload('__navBakComp__.getImgSuccess', '__navBakComp__.getImgError', 2, 1);
                }
            } else if (index == 4) {
                //行驶证主页
                if (_self.state.IdentityAuthInfo.vehicleLicenseStatus == 1 || _self.state.IdentityAuthInfo.vehicleLicenseStatus == 2) {
                    var paramArr0 = [];
                    paramArr0.push(_self.state.IdentityAuthInfo.vehicleLicenseFrontUrl);
                    console.log(paramArr0);
                    mobileAgent.pictureZoom(paramArr0);
                } else {
                    mobileAgent.selectImageAndUpload('__navBakComp__.getImgSuccess', '__navBakComp__.getImgError', 2, 1)
                }

            } else if (index == 5) {
                //行驶证副页
                if (_self.state.IdentityAuthInfo.vehicleLicenseStatus == 1 || _self.state.IdentityAuthInfo.vehicleLicenseStatus == 2) {
                    var paramArr0 = [];
                    paramArr0.push(_self.state.IdentityAuthInfo.vehicleLicenseBackUrl);
                    console.log(paramArr0);
                    mobileAgent.pictureZoom(paramArr0);
                } else {
                    mobileAgent.selectImageAndUpload('__navBakComp__.getImgSuccess', '__navBakComp__.getImgError', 2, 1)
                }
            } else if (index == 6) {
                //驾驶证主页
                if (_self.state.IdentityAuthInfo.drivingLicenseStatus == 1 || _self.state.IdentityAuthInfo.drivingLicenseStatus == 2) {
                    var paramArr0 = [];
                    paramArr0.push(_self.state.IdentityAuthInfo.drivingLicenseUrl);
                    console.log(paramArr0);
                    mobileAgent.pictureZoom(paramArr0);
                } else {
                    mobileAgent.selectImageAndUpload('__navBakComp__.getImgSuccess', '__navBakComp__.getImgError', 2, 1)
                }
            }
        })
    }

    getImgSuccess(imgUrl, name, ID, address) {
        let _self = this;
        let imageType = this.state.imgType;
        let identityAuthInfo = this.state.IdentityAuthInfo;
        this.setState({ wraningmessage: false });
        switch (imageType) {
            case 1:
                //头像
                identityAuthInfo.memberPhoto = imgUrl;
                _self.setState({ IdentityAuthInfo: identityAuthInfo });
                break;
            case 2:
                //身份证正面
                //2.20.1添加了地址，这里暂时没有添加
                identityAuthInfo.idcardFrontUrl = imgUrl;
                identityAuthInfo.identityNo = ID;
                identityAuthInfo.realName = name;
                _self.setState({ IdentityAuthInfo: identityAuthInfo });
                break;
            case 3:
                //身份证背面
                identityAuthInfo.idcardBackUrl = imgUrl;

                _self.setState({ IdentityAuthInfo: identityAuthInfo });
                break;
            case 4:
                // 行驶证主页
                identityAuthInfo.vehicleLicenseFrontUrl = imgUrl;
                this.setState({ IdentityAuthInfo: identityAuthInfo });
                break;
            case 5:
                // 行驶证副页
                identityAuthInfo.vehicleLicenseBackUrl = imgUrl;
                this.setState({ IdentityAuthInfo: identityAuthInfo });
                break;
            case 6:
                // 驾驶证主页
                identityAuthInfo.drivingLicenseUrl = imgUrl;
                this.setState({ IdentityAuthInfo: identityAuthInfo });
                break;
            default:
                return;

        }

    }

    getImgError(data) {
        alert(data);
        this.setState({ wraningmessage: true });
    }


    componentWillMount() {
        console.log(this.state.param);
        this.getIdentityAuthInfo();
    }
    render() {
        return (
            <div className="wrap">
                <NavBar
                    mode="light"
                    icon={<Icon key="1" type="left" />}
                    onLeftClick={() => { history.go(-1) }}
                >{this.state.itemTitle}
                </NavBar>

                {/* 头像 */}
                {
                    this.state.param.itemType == 0 ? (<div className="headPortrait">
                        <div className="wrap_head">
                            <span className="warning_icon"></span>
                            <span>信息提交后无法修改，请再次确认后提交</span>
                        </div>
                        <div>
                            <div className="wrap_img" onClick={this.imageAction.bind(this, 1)}>
                                <img src={this.state.IdentityAuthInfo.memberPhoto ? this.state.IdentityAuthInfo.memberPhoto : headiconImg} alt="" className="memberPhoto" />
                                <div className="wrap_camera"></div>
                            </div>
                            <div className="wrap_imgTitle">
                                <span>上传头像</span>
                            </div>
                        </div>
                    </div>) : ""
                }
                {/* 身份证 */}
                {
                    this.state.param.itemType == 1 ? (
                        <div className="IDcard">
                            <div className="wrap_head">
                                <span className="warning_icon"></span>
                                <p>如信息识别错误，请重新拍摄识别<br />信息提交后无法修改，请再次确认后提交</p>
                            </div>
                            <div className="wrap_list">
                                <div className="">
                                    <span>姓名：</span>
                                    <span className="ID_name">
                                        {this.state.IdentityAuthInfo.realName ? this.state.IdentityAuthInfo.realName : "--"}
                                    </span>
                                </div>
                                <div className="">
                                    <span>身份证号：</span>
                                    <span className="ID">
                                        {this.state.IdentityAuthInfo.identityNo ? this.state.IdentityAuthInfo.identityNo : "--"}
                                    </span>
                                </div>
                            </div>
                            <div className="">
                                <div className="wrap_img" onClick={this.imageAction.bind(this, 2)}>
                                    <img src={this.state.IdentityAuthInfo.idcardFrontUrl ? this.state.IdentityAuthInfo.idcardFrontUrl : IDaImg} className="memberPhoto" alt="" />
                                    <div className="wrap_camera"></div>
                                </div>
                                <div className="wrap_imgTitle">
                                    <span>上传人像面</span>
                                </div>
                            </div>
                            <div className="">
                                <div className="wrap_img" onClick={this.imageAction.bind(this, 3)}>
                                    <img src={this.state.IdentityAuthInfo.idcardBackUrl ? this.state.IdentityAuthInfo.idcardBackUrl : IDbImg} className="memberPhoto" alt="" />
                                    <div className="wrap_camera"></div>
                                </div>
                                <div className="wrap_imgTitle">
                                    <span>上传国徽面</span>
                                </div>
                            </div>

                        </div>

                    ) : ""
                }
                {/* 行驶证 */}

                {/* 2:司机的驾驶证 3 车主的行驶证 */}
                {
                    this.state.param.itemType == 3 ? (<div>
                        <div className="wrap_head">
                            <span className="warning_icon"></span>
                            <p>信息提交后无法修改，请再次确认后提交</p>
                        </div>
                        <div className="">

                            <div className="wrap_img" onClick={this.imageAction.bind(this, 4)}>
                                <img src={this.state.IdentityAuthInfo.vehicleLicenseFrontUrl ? this.state.IdentityAuthInfo.vehicleLicenseFrontUrl : drivingLicensea} className="memberPhoto" alt="" />
                                <div className="wrap_camera"></div>
                            </div>
                            <div className="wrap_imgTitle">
                                <span>上传主页</span>
                            </div>
                        </div>
                        <div className="">

                            <div className="wrap_img" onClick={this.imageAction.bind(this, 5)}>
                                <img src={this.state.IdentityAuthInfo.vehicleLicenseBackUrl ? this.state.IdentityAuthInfo.vehicleLicenseBackUrl : drivingLicenseb} className="memberPhoto" alt="" />
                                <div className="wrap_camera"></div>
                            </div>
                            <div className="wrap_imgTitle">
                                <span>上传副页</span>
                            </div>
                        </div>
                    </div>) : ""
                }

                {/* 驾驶证 */}

                {
                    this.state.param.itemType == 2 ? (
                        <div>
                            <div className="wrap_head">
                                <span className="warning_icon"></span>
                                <p>信息提交后无法修改，请再次确认后提交</p>
                            </div>
                            <div className="">
                                <div className="wrap_img" onClick={this.imageAction.bind(this, 6)}>
                                    <img src={this.state.IdentityAuthInfo.drivingLicenseUrl ? this.state.IdentityAuthInfo.drivingLicenseUrl : driverLicense} className="memberPhoto" />
                                    <div className="wrap_camera"></div>
                                </div>
                                <div className="wrap_imgTitle">
                                    <span>上传主页</span>
                                </div>
                            </div>
                        </div>
                    ) : ""
                }
                {/* 底部按钮 */}
                <div className="wrap_foot">
                    {
                        this.state.wraningmessage == true ? (<div className="warning_content">
                            <span className="wraning_message">图片无法识别请重新上传</span>
                        </div>) : ""
                    }
                    {
                        this.getBtnEnabel() == true ? (<div className="wrap_bnt" onClick={this.clickAction}>
                            <span>提交信息</span>
                        </div>) : (
                                <div className="unwrap_bnt">
                                    <span>提交信息</span>
                                </div>
                            )
                    }

                </div>
            </div>

        );

    }

}
export default ImgUpload;
