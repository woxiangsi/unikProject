import React from 'react';

import { NavBar, Icon, List } from 'antd-mobile';
import _util_ from '../../../common/businessUtils/util';
import '../css/ListItem.scss';
var createModel = require("../model/model");
var model = createModel();
const locationUrl = _util_.getLocation_util() + '/#';
import carIcon from '../img/car_icon.png'

class ListItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title:"热销车型",
            salesPriority:1,
            industryId:2,
            driverId:1,
            list:[]
        }
        // props.cacheLifecycles.didCache(this.componentDidCache)
        // props.cacheLifecycles.didRecover(this.componentDidRecover)
    }
    componentWillMount() {}
    componentDidMount(){
        this.getList();
    }
    componentWillReceiveProps(nextProps){
        if(JSON.stringify(nextProps.filterData) == "{}"){
            return
        };
        if(this.state.salesPriority !=nextProps.filterData.salesPriority||this.state.industryId !=nextProps.filterData.industryId||this.state.driverId !=nextProps.filterData.driverId){
            this.setState({
                salesPriority:nextProps.filterData.salesPriority,
                industryId:nextProps.filterData.industryId,
                driverId:nextProps.filterData.driverId,
            },()=>{
                this.getList()
            })
        }

       
    }
    getList(){
        let _self = this;
        let param = {
            salesPriority: this.state.salesPriority, //1=销量优先 0=不选
            industryId: this.state.industryId, //行业
            driverId: this.state.driverId//驱动
        }
        model.getList(param,function(res){
            if(res.code == 200){
                _self.setState({
                    list: res.data
                })
            }
        })
    }
    addComp=(index)=>{
        let list = this.state.list;
        if(!list[index].bntName||list[index].bntName == '加入对比'){
            list[index].bntName = '已加入对比';
        }else{
            list[index].bntName = '加入对比';
        }
        this.setState({
            list
        })
    }
    render() {
        var _self = this;
        return (
            <div className="ListItem">
                {
                    this.state.list.map(function(item,index){
                        return(
                            <div className="item" key={index}>
                                <div className="item-main">
                                    <div className="itemM-img">
                                        <img src={item.modelImage} alt=""/>
                                    </div>
                                    <div className="itemM-content">
                                        <div className="itemM-content-title">
                                            <span>{item.modelName} </span>
                                        </div>
                                        <div className="itemM-content-content">
                                            {item.remarks}
                                            <span>具有低油耗、高可靠、高安全适合在总重100吨恶劣路况行驶具有低油耗、高可靠、高高安全具有低油耗、高可靠高安字高安...</span>
                                        </div>
                                        <div className="itemM-content-fun">
                                            {
                                                item.labels.map(function(el,index1){
                                                    return(
                                                        <span key={index1}>{el.name}</span>
                                                    )
                                                    
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="item-bottom">
                                    <span className={item.bntName=='已加入对比'?'addActive fl':'fl'} onClick={_self.addComp.bind(this,index)}>{item.bntName?item.bntName:'加入对比'}</span>
                                    <span className="fr">查看详情</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
export default ListItem;