import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';

// 加载部分组件
import CopyRight from '../../components/CopyRight/CopyRight'
import ErrorTemplate from '../../components/ErrorTemplate/ErrorTemplate'

import { Layout } from 'antd';
const meta = {
    title: '404页面_杨子龙的博客',
    description: '这是我的第二版博客,有兴趣的话,可以关注我的百家号:前端开发部落',
};

class ErrorPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            errorSet:{
                type:'404'
            },
            pageType:'error'
        };
    }
    render(){
        return(
            <DocumentMeta {...meta}>
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
            </DocumentMeta>
        )
    }
}

export default ErrorPage;