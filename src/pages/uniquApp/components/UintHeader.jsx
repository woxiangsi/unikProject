import React from 'react';

import { NavBar, Icon, List } from 'antd-mobile';
import _util_ from '../../../common/businessUtils/util';
import '../css/Uint.scss';
var createModel = require("../model/model");
var model = createModel();
const locationUrl = _util_.getLocation_util() + '/#';

class UintHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title:"热销车型"
        }
    }
    componentWillMount() {}
    componentDidMount() {
        document.addEventListener('click', this.hideAllMenu);
    }
    
    hideAllMenu = () => {
        this.props.modelFiler(false)
        // this.setState({
        //   checkBtnMenu: false,
        //   newBtnMenu: false,
        //   mineBtnMenu: false,
        // })
      }
    goBack=()=>{

    }
    goHome=()=>{

    }
    filterBnt=(e)=>{
        e.nativeEvent.stopImmediatePropagation();
        this.props.modelFiler(true)
        
    }

    render() {
        var _self = this;
        return (
            <div className="UintHeader">
                <div className="header-let">
                    <span className="goBack" onClick={this.goBack.bind(this)}></span>
                    <span className="goHome" onClick={this.goHome.bind(this)}></span>
                </div>
                <div className="">
                    <span>{this.state.title}</span>
                </div>
                <div className="header-rigt" onClick={this.filterBnt.bind(this)}>
                    <span className="filter">筛选</span>
                    <span className="filter_icon"></span>
                </div>
            </div>
        )
    }
}
export default UintHeader;