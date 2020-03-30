import React from 'react';

import { NavBar, Icon, List } from 'antd-mobile';
import _util_ from '../../../common/businessUtils/util';
import '../css/Uint.scss';
var createModel = require("../model/model");
var model = createModel();
const locationUrl = _util_.getLocation_util() + '/#';

class UintBottomTips extends React.Component {
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
            <div className="UintBottomFun UintBottomTips">
                <div className="fl funContent">
                    <span>推荐车辆不是您想要的类型？快来个性定制看看吧</span>
                </div>
                <div className="fr funBnt">
                    <span className="color1">个性定制</span>
                </div>
            </div>
        )
    }
}
export default UintBottomTips;