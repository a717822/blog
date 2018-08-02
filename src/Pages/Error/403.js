import React, { Component } from 'react';

// 加载部分组件
import CopyRight from '../../components/CopyRight/CopyRight'
import ErrorTemplate from '../../components/ErrorTemplate/ErrorTemplate'

import { Layout } from 'antd';

class ErrorPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            errorSet:{
                type:'403'
            },
            pageType:'error'
        };
    }
    render(){
        return(
            <Layout>

                <Layout>

                    {/*Content start*/}
                    <ErrorTemplate errorSet={this.state.errorSet} />
                    {/*Content end*/}

                    {/*copyright start*/}

                    <CopyRight />

                    {/*copyright end*/}

                </Layout>
            </Layout>
        )
    }
}

export default ErrorPage;