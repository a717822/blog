import React, { Component } from 'react';

import CopyRight from '../../components/CopyRight/CopyRight'

import {  Layout, Menu , Icon} from 'antd';
const { Header, Content } = Layout;

class Index extends Component {
    constructor(props){
        super(props);
        console.log(props);
    }

    render(){
        return(
            <Layout>
                <Header>
                    <Menu selectedKeys={['book']}
                          mode="horizontal"
                          theme="dark"
                          style={{ lineHeight: '64px' }}>
                        <Menu.Item key="book">
                            <Icon type="book" />首页
                        </Menu.Item>
                        <Menu.SubMenu title={<span><Icon type="share-alt" />技术分享</span>}>
                            <Menu.ItemGroup title="服务器端">
                                <Menu.Item key="share:1">Node.js</Menu.Item>
                                <Menu.Item key="share:2">PHP</Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup title="前端">
                                <Menu.Item key="share:3">前端</Menu.Item>
                                <Menu.Item key="share:4">最新Web API</Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.SubMenu>
                        {/*<Menu.Item key="about">*/}
                            {/*关于我*/}
                        {/*</Menu.Item>*/}
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>

                    <div className="blog-container">

                        {/*最新发布*/}
                        <div className="blog">
                            <div className="blog-cate">最新发布</div>
                            <div className="blog-content">
                                <ul>
                                    <li>
                                        <a href="">测试</a>
                                    </li>
                                    <li>
                                        <a href="">测试</a>
                                    </li>
                                    <li>
                                        <a href="">测试</a>
                                    </li>
                                    <li>
                                        <a href="">测试</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="more">
                                更多<Icon type="down-circle-o" />
                            </div>
                        </div>


                        {/*服务器端*/}
                        <div className="blog">
                            <div className="blog-cate">服务器端</div>
                            <div className="blog-content">
                                <ul>
                                    <li>
                                        <a href="">测试</a>
                                    </li>
                                    <li>
                                        <a href="">测试</a>
                                    </li>
                                    <li>
                                        <a href="">测试</a>
                                    </li>
                                    <li>
                                        <a href="">测试</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="more">
                                更多<Icon type="down-circle-o" />
                            </div>
                        </div>

                        {/*前端*/}
                        <div className="blog">
                            <div className="blog-cate">前端</div>
                            <div className="blog-content">
                                <ul>
                                    <li>
                                        <a href="">测试</a>
                                    </li>
                                    <li>
                                        <a href="">测试</a>
                                    </li>
                                    <li>
                                        <a href="">测试</a>
                                    </li>
                                    <li>
                                        <a href="">测试</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="more">
                                更多<Icon type="down-circle-o" />
                            </div>
                        </div>
                    </div>

                </Content>

                <CopyRight />

            </Layout>
        )
    }
}

export default Index;