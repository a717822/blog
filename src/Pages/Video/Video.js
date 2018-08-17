import React, { Component } from 'react';

import CopyRight from '../../components/CopyRight/CopyRight'
import {  Layout , Icon  , Menu } from 'antd';

const { Content , Header} = Layout;

class Video extends Component {
    componentWillMount(){
        this.getVideoStream();
    }

    getVideoStream = () =>{
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia; //获取媒体对象（这里指摄像头）

        navigator.getUserMedia({
            video:true,
            audio:true
        },function (stream) {

            let video = document.getElementById('video');

            video.src = URL.createObjectURL(stream);

        },function (error) {
            console.log('error' , error);
        });
    };

    render(){
        return(
            <Layout>
                <Header>
                    <Menu selectedKeys={['book']}
                          mode="horizontal"
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

                    <div className="blog-container ant-col-md-16">

                        <video id="video" width="640" height="480" autoPlay controls="controls" />

                    </div>

                </Content>

                <CopyRight />

            </Layout>
        )
    }
}

export default Video
