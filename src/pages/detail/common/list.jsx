import React from 'react';
// var model = createModel();

class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }
    handleOpen = () => {
        const {isOpen} = this.state
        this.setState({
            isOpen: !isOpen
        })
    }
    render() {
        const { isOpen } = this.state
        return (
            <div className="">
                <div onClick={this.handleOpen}>
                    <span>名称</span>
                    <span>+</span>
                </div>
                {
                    isOpen ?
                    <div className="show-info">
                        <img src="" alt=""/>  
                        <p>这是详细内容</p>
                    </div> : ''
                }
            </div>
        )
    }
}
export default List;