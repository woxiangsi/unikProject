import React from 'react';

import { NavBar, Icon, List } from 'antd-mobile';
import _util_ from '../../../common/businessUtils/util';
import '../css/ConsultationPrice.scss';
var createModel = require("../model/model");
var model = createModel();
const locationUrl = _util_.getLocation_util() + '/#';
import carIcon from '../img/car_icon.png'

class ConsultationPrice extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title:"热销车型",
            showModel:true,
            name:'',
            phone:'',
            pin:'',
            company:'',
            sex:1

        }
    }
    componentWillMount() {}
    
    componentDidMount(){
    }
    
    
    sure = ()=>{
        let param = {
            salesPriority:this.state.salesPriority,
            industryId:this.state.industryId,
            driverId:this.state.driverId,
        }
        this.props.sure(param)
    }
    stopPropagation = (e)=>{
        e.nativeEvent.stopImmediatePropagation();
    }
    closeView = ()=>{
        this.setState({
            showModel:false
        })
    }
    sendVerifty = ()=>{
        let _self = this;
        console.log(this.state.phone)
        let param = {
            phone: this.state.phone, 
        }
        model.sendVerifty(param,function(res){
            if(res.code == 200){
               
            }
        })
    }
    handleGetInputValue = (val,event)=>{
        console.log(event.target.value)
        console.log(val)
        if(val == 'name'){

        }
        if(val == 'phone'){

        }
        if(val == 'pin'){

        }
        if(val == 'company'){

        }
        // if(val)
        // this.setState({
        //     phone:event.target.value
        // })
    }
    render() {
        var _self = this;
        return (
            <div className="ConsultationPrice" className={this.state.showModel==true?'r-show ConsultationPrice':'r-hide'}>
                <div className="wrap" onClick={this.stopPropagation.bind(this) }>
                    <div className="title">
                        <span>获取底价</span>
                        <span className="close-icon" onClick={this.closeView.bind(this)}></span>
                    </div>
                    <div className="wrap-infor">
                        <div className="wrapInfor-img">
                            <img src={carIcon} alt=""/>
                        </div>
                        <div className="itemM-content">
                            <div className="itemM-content-title">J7 6×4 牵引车</div>
                            <div className="itemM-content-content">具有低油耗、高可靠、高安全适合在总重100吨恶劣路况行驶。</div>
                            <div className="itemM-content-fun">
                                <span>安全</span>
                                <span>可靠</span>
                                <span>高效</span>
                            </div>

                        </div>
                    </div>
                    <div className="wrap-li">
                        <div className="wrapLi-let">
                            <span className="must-icon">*</span>
                            <span>姓名</span>
                        </div>
                        <div className="wrapLi-rigt">
                            <input type="text" value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}} placeholder="请输入姓名"/>
                        </div>
                    </div>
                    <div className="wrap-li">
                        <div className="wrapLi-let">
                            <span className="must-icon">*</span>
                            <span>性别</span>
                        </div>
                        <div className="wrapLi-rigt radio" onClick={()=>{this.setState({sex:1})}}>
                            <div className="radioOption ">
                                <span className={this.state.sex==1?'radio-icon radioCheck':'radio-icon'}></span>
                                <span>男</span>
                            </div>
                            <div className="radioOption" onClick={()=>{this.setState({sex:2})}}>
                                <span className={this.state.sex==2?'radio-icon radioCheck':'radio-icon'}></span>
                                <span>女</span>
                            </div>
                            
                            
                        </div>
                    </div>
                    <div className="wrap-li">
                        <div className="wrapLi-let">
                            <span className="must-icon">*</span>
                            <span>手机号</span>
                        </div>
                        <div className="wrapLi-rigt">
                            <input type="text" value={this.state.phone} onChange={(e)=>{this.setState({phone:e.target.value})}} placeholder="请输入您的手机号"/>
                            <span className="getCode" onClick={this.sendVerifty.bind(this)}>获取验证码</span>
                        </div>
                    </div>
                    <div className="wrap-li">
                        <div className="wrapLi-let">
                            <span className="must-icon">*</span>
                            <span>验证码</span>
                        </div>
                        <div className="wrapLi-rigt">
                            <input type="text" value={this.state.pin} onChange={(e)=>{this.setState({pin:e.target.value})}} placeholder="请输入验证码"/>
                        </div>
                    </div>
                    <div className="wrap-li">
                        <div className="wrapLi-let">
                            <span className="must-icon"></span>
                            <span>所属公司</span>
                        </div>
                        <div className="wrapLi-rigt with100">
                            <input type="text" value={this.state.company} onChange={(e)=>{this.setState({company:e.target.value})}} placeholder="请输入您所属公司"/>
                        </div>
                    </div>
                    <div className="wrap-li">
                        <div className="wrapLi-let">
                            <span className="must-icon">*</span>
                            <span>地区</span>
                        </div>
                        <div className="wrapLi-rigt selectP">
                            <div className="select selectLet">
                                <span>请选择省份</span>
                                <span className="select-icon"></span>
                            </div>
                            <div className="select">
                                <span>请选择城市</span>
                                <span className="select-icon"></span>
                            </div>
                        </div>
                    </div>
                    <div className="wrap-li">
                        <div className="wrapLi-let">
                            <span className="must-icon">*</span>
                            <span>经销商</span>
                        </div>
                        <div className="wrapLi-rigt with100">
                            <div className="select slectJ">
                                <span>请选择经销商</span>
                                <span className="select-icon"></span>
                            </div>
                        </div>
                    </div>
                    <div className="wrap-li">
                        <div className="wrapLi-let">
                            {/* <span className="must-icon">*</span>
                            <span>地区</span> */}
                        </div>
                        <div className="wrapLi-rigt with100 tips">
                            <span>风险说明：Lorem ipsum dolor sit amet, consectetur adipiscing elit, s</span>
                            
                        </div>
                    </div>
                    <div className="sure">
                        <span>提交</span>
                    </div>
                </div>
               
            </div>
        )
    }
}
export default ConsultationPrice;