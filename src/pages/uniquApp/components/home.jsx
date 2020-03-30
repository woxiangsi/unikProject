import React from 'react';
import '../css/home.scss';
import { NavBar, Icon, List } from 'antd-mobile';
import _util_ from '../../../common/businessUtils/util';
const Item = List.Item;
var createModel = require("../model/model");
var model = createModel();

const locationUrl = _util_.getLocation_util() + '/#';

const listName = {
    background: '#ccc',
}
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentWillMount() {
       
    }
    goPage = ()=> {

        var _self = this;
       
        //token   pageFrom    carId  carNumber ？？暂时先不处理 type  ownertype ：0 司机认证 1 车主认证
        //let search = `token=${oldParams.token}&pageFrom=${oldParams.pageFrom}&type=${oldParams.type}&ownertype=${type}`;
        // let url = locationUrl + '/authenticationMog/details?' + search;

        var param = {
            pathname: '/uniquApp/listView',
            search: '',
        }
        this.props.history.push(param);
    }

    render() {
        var _self = this;
        return (
            <div className="authentication touchScroll">
                <div className="" onClick={this.goPage.bind(this)}>
                    <span>热销车型</span>
                </div>
            </div>
        )
    }
}
export default Home;