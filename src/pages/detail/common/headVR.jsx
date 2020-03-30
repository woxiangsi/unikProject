import React from 'react';
const headerPic = require("../img/header-pic.png");
console.log(headerPic)
// var model = createModel();

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    render() {
        return (
            <div className="header-VR">
                <img src={headerPic} alt=""/>
                <p>具有低油耗、高可靠、高安全、适合在总重100吨恶劣路况行驶。具有低油耗、高可靠、高安全、适合在总重100吨恶劣路况行驶。具有低油耗高可靠、高安全、适合在总重100吨恶劣路况行驶。具有低油耗、高可靠高安全100字。</p>
            </div>
        )
    }
}
export default Header;