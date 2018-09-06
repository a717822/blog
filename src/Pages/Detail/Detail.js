import React, { Component , ajax} from 'react';

import CopyRight from '../../components/CopyRight/CopyRight'
import TopHeader from "../../components/TopHeader/TopHeader";

import {  Layout  , Icon , Divider  , message} from 'antd';

import 'highlight.js/styles/sunburst.css'
import highlight from 'highlight.js'

const { Content } = Layout;

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

    // 获取博客信息
    getBlogMsg = () =>{
        ajax({
            url:'getBlogDetail',
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
                    });

                    if(document.getElementsByTagName('pre').length !== 0){
                        for(let i in document.getElementsByTagName('pre')){
                            if(document.getElementsByTagName('pre')[i].children){
                                highlight.highlightBlock(document.getElementsByTagName('pre')[i].children[0]);
                            }
                        }
                    }

                    document.title = data.list[0].title
                }
            }
        })
    };

    // 点赞
    blogLike = () =>{
        let blog = this.state.blog;

        ajax({
            url:'blogLike',
            method:'post',
            dataType:'json',
            async:true,
            data:{
                id:this.props.match.params.id
            },
            success:(data) =>{
                if(data.id === 10000){
                    message.success('点赞成功');
                    blog.likes = parseInt(blog.likes) + 1;

                    this.setState({
                        blog:blog
                    })
                }else{
                    message.error('点赞失败');
                }
            }
        })
    };

    render(){
        return(
            <Layout>
                <TopHeader />

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

                        <div className="blog_like" onClick={()=>{
                            this.blogLike()
                        }}>
                            <span>
                                <div>
                                    <Icon type="like-o" />
                                </div>

                                <div>{this.state.blog.likes}</div>
                            </span>

                        </div>
                    </div>

                </Content>

                <CopyRight />
            </Layout>
        )
    }
}

export default Detail;