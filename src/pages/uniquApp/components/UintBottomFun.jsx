import React from 'react';

import { NavBar, Icon, List } from 'antd-mobile';
import _util_ from '../../../common/businessUtils/util';
import '../css/Uint.scss';
var createModel = require("../model/model");
var model = createModel();
const locationUrl = _util_.getLocation_util() + '/#';

class UintBottomFun extends React.Component {
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
            <div className="UintBottomFun">
                <div className="fl funContent">
                    <span>参考价：¥888.00</span>
                </div>
                <div className="fr funBnt">
                    <span className="color1">加入对比</span>
                    <span className="color2">获取底价</span>
                </div>
            </div>
        )
    }
}
export default UintBottomFun;