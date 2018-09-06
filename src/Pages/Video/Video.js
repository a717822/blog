import React, { Component } from 'react';

import CopyRight from '../../components/CopyRight/CopyRight'
import {  Layout } from 'antd';
import TopHeader from "../../components/TopHeader/TopHeader";

const { Content } = Layout;

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
                <TopHeader />

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
