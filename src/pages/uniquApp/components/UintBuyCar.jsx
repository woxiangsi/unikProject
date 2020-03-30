import React from 'react';

import { NavBar, Icon, List } from 'antd-mobile';
import _util_ from '../../../common/businessUtils/util';
import '../css/Uint.scss';
var createModel = require("../model/model");
var model = createModel();
const locationUrl = _util_.getLocation_util() + '/#';

class UintBuyCar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title:"热销车型"
        }
    }
    componentWillMount() {}
    goBack=()=>{

    }
    goHome=()=>{

    }
    filterBnt=()=>{

    }
    render() {
        var _self = this;
        return (
            <div className="UintBuyCar">
                <span className="num">2</span>
                <span className="title">车辆对比</span>
            </div>
        )
    }
}
export default UintBuyCar;