// 资源下载

import React, { Component , ajax} from 'react';
import DocumentMeta from 'react-document-meta';

import CopyRight from '../../components/CopyRight/CopyRight'
import TopHeader from "../../components/TopHeader/TopHeader";

import {  Layout , List , Card} from 'antd';

const { Content} = Layout;

class Resources extends Component{
    constructor(props){
        super(props);
        this.state = {
            resource:[],

            title:'',
            canonical:'',
            keywords:'',
            description:''
        }
    }

    componentWillMount(){
        this.getResourceList();
    }

    render(){
        const meta = {
            title: this.state.title,
            description: this.state.description,
            canonical: this.state.canonical,
            meta: {
                name: {
                    keywords: this.state.keywords
                }
            }
        };

        return(
            <DocumentMeta {...meta}>
                <Layout>
                    <TopHeader />

                    <Content>

                        <div className="blog-container ant-col-md-16">
                            <List grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
                                  dataSource={this.state.resource}
                                  renderItem={item => (
                                      <List.Item key={item.id}>
                                          <Card title={item.name}>
                                              <p>上传时间：{item.add_time}</p>
                                              <p>下载次数：{item.num}</p>
                                              <p style={{
                                                  textAlign:'right'
                                              }}><a onClick={()=>{
                                                  window.location.href = '/Resource/Detail/' + item.id
                                              }}>详情</a></p>
                                          </Card>
                                      </List.Item>
                                  )} />
                        </div>

                    </Content>

                    <CopyRight />
                </Layout>
            </DocumentMeta>
        )
    }

    getResourceList = ()=>{
        ajax({
            url:'getResourceList',
            method:'post',
            dataType:'json',
            async:true,
            success:(data) =>{
                if(data.id === 10000){
                    this.setState({
                        resource:data.list,
                        title:'资源下载_杨子龙的博客',
                        canonical:'https://www.yangzilong.cn/Resource/List',
                        keywords:'开源代码,WebAPI,前端,权限管理,前端开发部落',
                        description:'本页提供部分开源代码'
                    });
                }
            }
        });
    }
}

export default Resources;