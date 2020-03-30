import React from 'react';

import { NavBar, Icon, List } from 'antd-mobile';
import _util_ from '../../../common/businessUtils/util';
import '../css/FilterView.scss';
var createModel = require("../model/model");
var model = createModel();
const locationUrl = _util_.getLocation_util() + '/#';

class FilterView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title:"热销车型",
            list:[],
            salesPriority:0,
            industryId:1,
            driverId:1,
        }
    }
    componentWillMount() {}
    
    componentDidMount(){
        this.getCondition();
    }
    getCondition(){
        let _self = this;
        let param = {
            salesPriority: this.state.salesPriority, //1=销量优先 0=不选
            industryId: this.state.industryId, //行业
            driverId: this.state.driverId,//驱动
        }
        model.getCondition(param,function(res){
            if(res.code == 200){
                _self.setState({
                    list: res.data
                })
            }
        })
    }
    salesPriorityCheck = (vl)=>{
        this.setState({
            salesPriority:vl
        })
    }
    industryIdCheck = (vl)=>{
        this.setState({
            industryId:vl
        })
    }
    driverIdCheck = (vl)=>{
        this.setState({
            driverId:vl
        })
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
    render() {
        var _self = this;
        return (
            <div className="FilterView" >
                <div className="wrap" onClick={this.stopPropagation.bind(this) }>
                    <div className="sel-line">
                        <div className="option" onClick={this.salesPriorityCheck.bind(this,1)}>
                            <div className="selIcon"><i className={this.state.salesPriority==1?'selCheck':''}></i></div>
                            销量优先
                        </div>
                        <div className="option" onClick={this.salesPriorityCheck.bind(this,0)}>
                            <div className="selIcon"><i className={this.state.salesPriority==0?'selCheck':''}></i></div>
                            人气优先
                        </div>
                    </div>
                    {
                        this.state.list.map(function(item,index){
                            return(
                                <div className="sel-line" key={index}>
                                    <div className="title">
                                        <i className="titleTips-icon"></i><span className="title-content">{item.category}</span>
                                        {/* <div className="line-style"> */}
                                            <i className="line_icon"></i>
                                            <i className="line_icon"></i>
                                            <i className="line_icon"></i>
                                            <i className="spot_icon"></i>
                                            <i className="spot_icon"></i>
                                            <i className="spot_icon"></i>
                                            <i className="line_icon"></i>
                                            <i className="line_icon"></i>
                                            <i className="line_icon"></i>
                                            <i className="line_icon"></i>
                                            <i className="spot_icon"></i>
                                            <i className="spot_icon"></i>
                                            <i className="line_icon"></i>
                                            <i className="spot_icon"></i>
                                        {/* </div> */}
                                    </div>
                                    <div className="">
                                        {
                                            item.values.map(function(el,index1){
                                                if(item.category == "行业"){
                                                    return(
                                                        <div className="option" key={el.id} onClick={_self.industryIdCheck.bind(this,el.id)}>
                                                            <div className="selIcon"><i className={_self.state.industryId==el.id?'selCheck':''}></i></div>
                                                            {el.name}
                                                        </div>
                                                    )
                                                }else{
                                                    return(
                                                        <div className="option" key={el.id} onClick={_self.driverIdCheck.bind(this,el.id)}>
                                                            <div className="selIcon"><i className={_self.state.driverId==el.id?'selCheck':''}></i></div>
                                                            {el.name}
                                                        </div>
                                                    )
                                                }
                                                
                                            })
                                        }
                                    </div>
                                    
                                </div>
                            )
                        })
                    }
                    <div className="sure" onClick={this.sure.bind(this)}>
                        <span>确定</span>
                    </div>
                    
                </div>
                <div className="yuan-con"></div>
            </div>
        )
    }
}
export default FilterView;