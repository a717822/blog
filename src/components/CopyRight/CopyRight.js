import React, { Component } from 'react';
import { Icon , BackTop  } from 'antd';
import './CopyRight.css';

class CopyRight extends Component {
    render(){
        return(
            <div>
                <div className="copy_right">
                    <BackTop />
                    Copyright <Icon type="copyright" /> 2018 Yangzilong Power By Node.js express
                    <div className="bei-An">
                        <a href="http://www.miitbeian.gov.cn"
                           target="_blank" rel="noopener noreferrer">鄂ICP备18020612号
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default CopyRight;