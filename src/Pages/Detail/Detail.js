import React, { Component , ajax} from 'react';

import CopyRight from '../../components/CopyRight/CopyRight'
import {  Layout  , Icon , Divider , Menu} from 'antd';

const { Content  , Header} = Layout;

class Detail extends Component {
    constructor(props){
        super(props);
        this.state = {
            blog:''
        }
    }

    componentWillMount(){
        this.getBlogMsg();
    }

    getBlogMsg = () =>{
        ajax({
            url:'detail',
            method:'post',
            dataType:'json',
            async:true,
            data:{
               id:this.props.match.params.id
            },
            success:(data) =>{
                if(data.id === 10000){
                    this.setState({
                        blog:data.list[0],
                    })
                }
            }
        })
    };

    render(){
        return(
            <Layout>
                <Header>
                    <Menu mode="horizontal"
                          theme="dark"
                          style={{ lineHeight: '64px' }}>
                        <Menu.Item key="book">
                            <a href="/">
                                <Icon type="book" />首页
                            </a>
                        </Menu.Item>
                        <Menu.SubMenu title={<span><Icon type="share-alt" />技术分享</span>}>
                            <Menu.ItemGroup title="服务器端">
                                <Menu.Item key="share:1">
                                    <a  onClick={()=>{
                                        window.location.href = '#/List/3';
                                    }}>
                                        Node.js
                                    </a>
                                </Menu.Item>
                                <Menu.Item key="share:2">
                                    <a onClick={()=>{
                                        window.location.href = '#/List/1';
                                    }}>PHP</a>
                                </Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup title="前端">
                                <Menu.Item key="share:3">
                                    <a onClick={()=>{
                                        window.location.href = '#/List/2';
                                    }}>前端</a>
                                </Menu.Item>
                                <Menu.Item key="share:4">
                                    <a onClick={()=>{
                                        window.location.href = '#/List/4';
                                    }}>最新Web API</a>
                                </Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.SubMenu>
                    </Menu>
                </Header>

                <Content>
                    <div className="blog_detail">
                        <div className="blog_header">
                            <div className="blog_title">
                                <h1>{this.state.blog.title}</h1>
                                <p>{this.state.blog.description}</p>
                            </div>

                            <div className="blog_header_label clearfix">
                                <div className="ant-col-md-6">
                                    <Icon type="user" />
                                    <span>{this.state.blog.u_name}</span>
                                </div>
                                <div className="ant-col-md-6">
                                    <Icon type="calendar" />
                                    <span>{this.state.blog.add_time}</span>
                                </div>
                                <div className="ant-col-md-6">
                                    <Icon type="tags" />
                                    <span>{this.state.blog.type}</span>
                                </div>
                                <div className="ant-col-md-6">
                                    <Icon type="eye" />
                                    <span>{this.state.blog.views}</span>
                                </div>

                            </div>

                            <Divider />
                        </div>

                        <div className="blog_detail_content"
                             dangerouslySetInnerHTML = {{ __html:this.state.blog.content}}></div>
                    </div>

                </Content>

                <CopyRight />
            </Layout>
        )
    }
}

export default Detail;