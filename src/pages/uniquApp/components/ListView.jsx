import React from 'react';

import { NavBar, Icon, List } from 'antd-mobile';
import _util_ from '../../../common/businessUtils/util';
import '../css/ListView.scss';
import UintHeader from './UintHeader';
import FilterView from './FilterView';
import ListItem from './ListItem';
import UintBottomFun from './UintBottomFun';
import UintBottomTips from './UintBottomTips';
import UintBuyCar from './UintBuyCar';
import ConsultationPrice from './ConsultationPrice';

var createModel = require("../model/model");
var model = createModel();
const locationUrl = _util_.getLocation_util() + '/#';


class ListView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modelFiler:false,
            filterData:{

            },
            

        }
    }
    componentWillMount() {}
    componentDidMount(){
        // this.getList();
    }
    getList(){
        
    }
    setModelFiler = (val) =>{
        console.log(val)
        this.setState({
            modelFiler:val
        })
    }
    getFilterData = (val) =>{
        this.setState({
            filterData:val,
            modelFiler:false
        })
    }
    render() {
        var _self = this;
        return (
            <div className="ListView touchScroll">
                <UintHeader modelFiler={this.setModelFiler.bind(this)}></UintHeader>
                <div className={this.state.modelFiler==true?'r-show':'r-hide'}>
                    <FilterView sure={this.getFilterData.bind(this)}></FilterView>
                </div>
                
                <ListItem filterData = {this.state.filterData}></ListItem>
                <UintBuyCar></UintBuyCar>
                <UintBottomTips></UintBottomTips>
                <ConsultationPrice></ConsultationPrice>
            </div>
        )
    }
}
export default ListView;