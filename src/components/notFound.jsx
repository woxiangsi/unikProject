import React from 'react';
const styleCss = {
    header:{
        'height': '100%',
        'background': '#ccc',
        'textAlign': "center",
        'fontSize': '0.4rem',
        'lineHeight': '5rem',
    }
    
    }
class NotFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div style={styleCss.header}>
                
                    请输入正确的路径
               
            </div>
            
        );
    }
}
export default NotFound;