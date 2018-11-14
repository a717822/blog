import React, { Component , ajax} from 'react';
import DocumentMeta from 'react-document-meta';

import CopyRight from '../../components/CopyRight/CopyRight'
import TopHeader from "../../components/TopHeader/TopHeader";

import {  Layout  , Icon , Divider  , message , Avatar , Form , Input , Button , Tag } from 'antd';

import 'highlight.js/styles/sunburst.css'
import highlight from 'highlight.js'
import './Detail.css'

const { Content } = Layout;
const { TextArea } = Input;

class Detail extends Component {
    constructor(props){
        super(props);
        this.state = {
            blog:'',
            discuss:[],

            pid:0,
            level:1,
            name:'',

            title:'',
            canonical:'',
            keywords:'',
            description:'',

            icon_theme:'outlined',

            tags:[]
        }
    }

    componentWillMount(){
        this.getBlogMsg();

        this.getBlogDiscussList();
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

                        title:data.list[0].title + '_杨子龙的博客',
                        canonical:'https://www.yangzilong.cn/Detail/' + this.props.match.params.id,
                        keywords:'WebAPI,前端,权限管理,前端开发部落',
                        description:data.list[0].description,
                        tags:data.list[0].tags.split(',')
                    });

                    if(document.getElementsByTagName('pre').length !== 0){
                        for(let i in document.getElementsByTagName('pre')){
                            if(document.getElementsByTagName('pre')[i].children){
                                highlight.highlightBlock(document.getElementsByTagName('pre')[i].children[0]);
                            }
                        }
                    }
                }
            }
        })
    };

    // 获取博客评论列表
    getBlogDiscussList = () =>{
        ajax({
            url:'discussList',
            method:'post',
            dataType:'json',
            async:true,
            data:{
                aid:this.props.match.params.id
            },
            success:(data) =>{
                if(data.id === 10000){

                    this.setState({
                        discuss:data.list
                    })

                }else{
                    this.setState({
                        discuss:['暂无评论']
                    })
                }
            }
        })
    };

    // 点赞
    blogLike = () =>{
        let blog = this.state.blog;

        if(this.state.icon_theme === 'outlined'){
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
                            blog:blog,
                            icon_theme:'filled'
                        })
                    }else{
                        message.error('点赞失败');
                    }
                }
            })
        }
    };

    // 回复
    reply = (id , name) =>{
        this.setState({
            level:2,
            pid:id,
            name: '@'+ name
        })
    };

    // 添加评论
    addSubmit = (e) =>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
           if(!err){
               values.pid = this.state.pid;
               values.level = this.state.level;
               values.aid = this.props.match.params.id;


               ajax({
                   url:'addDiscuss',
                   method:'post',
                   dataType:'json',
                   async:true,
                   data:values,
                   success:(data) =>{
                       if(data.id === 10000){
                           message.success(data.msg);

                           window.location.reload();
                       }else{
                           message.error(data.msg);
                       }
                   }
               })
           }
        });
    };

    render(){
        const {getFieldDecorator} = this.props.form;
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
                        <div className="blog_detail">
                            {/*详情头部*/}
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

                                <div className="blog_tags" style={{
                                    marginTop:20
                                }}>
                                    {
                                        this.state.tags.map((tag , index) =>{
                                            return <Tag color="#108ee9" key={index}>{tag}</Tag>
                                        })
                                    }
                                </div>

                                <Divider />
                            </div>

                            {/*内容*/}
                            <div className="blog_detail_content"
                                 dangerouslySetInnerHTML = {{ __html:this.state.blog.content}}>
                            </div>

                            {/*点赞*/}
                            <div className="blog_like" onClick={
                                ()=>{
                                    this.blogLike()
                                }}>
                            <span>
                                <div>
                                    <Icon type="like" theme={this.state.icon_theme} />
                                </div>

                                <div>{this.state.blog.likes}</div>
                            </span>

                            </div>

                            {/*评论列表*/}
                            <div className="discussContent">
                                <Divider orientation="left">评论</Divider>
                                <ul className="discuss_list">
                                    {
                                        this.state.discuss.map((d) =>{
                                            if(typeof d === 'object'){
                                                if(d.children){
                                                    return  <li key={d.id}>
                                                        <div className="discuss_parent">
                                                            <div className="user_info clearfix">
                                                                <div className="user_avatar">
                                                                    <Avatar icon="user" />
                                                                </div>
                                                                <div className="user_name">{d.nick}</div>
                                                                <div className="time">{d.add_time}</div>
                                                            </div>
                                                            <div className="discuss_content">
                                                                {d.content}

                                                                <a style={{
                                                                    float:'right'
                                                                }} key={d.id}
                                                                   onClick={()=>{
                                                                       this.reply(d.id , d.nick)
                                                                   }}>回复</a>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            {
                                                                d.children.map((c)=>{
                                                                    return <div className="discuss_children" key={c.id}>
                                                                        <div className="user_info clearfix">
                                                                            <div className="user_avatar">
                                                                                <Avatar icon="user" />
                                                                            </div>
                                                                            <div className="user_name">{c.nick}</div>
                                                                            <div className="time">{c.add_time}</div>
                                                                        </div>
                                                                        <div className="discuss_content">
                                                                            {c.content}

                                                                            <a style={{
                                                                                float:'right'
                                                                            }} key={c.id}
                                                                               onClick={()=>{
                                                                                   this.reply(d.id ,  c.nick)
                                                                               }}>回复</a>
                                                                        </div>
                                                                    </div>
                                                                })
                                                            }
                                                        </div>
                                                    </li>
                                                }else{
                                                    return  <li key={d.id}>
                                                        <div className="discuss_parent">
                                                            <div className="user_info clearfix">
                                                                <div className="user_avatar">
                                                                    <Avatar icon="user" />
                                                                </div>
                                                                <div className="user_name">{d.nick}</div>
                                                                <div className="time">{d.add_time}</div>
                                                            </div>
                                                            <div className="discuss_content">
                                                                {d.content}
                                                                <a style={{
                                                                    float:'right'
                                                                }} key={d.id}
                                                                   onClick={()=>{
                                                                       this.reply(d.id ,  d.nick)
                                                                   }}>回复</a>
                                                            </div>
                                                        </div>
                                                    </li>
                                                }
                                            }else{
                                                return '暂无相应评论';
                                            }

                                        })
                                    }
                                </ul>
                            </div>

                            {/*添加评论*/}
                            <div className="add_discuss">
                                <Divider orientation="left">添加评论</Divider>
                                <Form>
                                    <Form.Item
                                        label="昵称"
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{ span: 5 }}>
                                        {getFieldDecorator('nick', {
                                            rules: [{
                                                required: true,
                                                message: '请输入昵称!' }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                    <Form.Item
                                        label="电子邮件"
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{ span: 5 }}>
                                        {getFieldDecorator('email', {
                                            rules: [{
                                                required: true,
                                                message: '请输入电子邮件!' }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                    <Form.Item
                                        label="评论内容"
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{ span: 5 }}>
                                        {getFieldDecorator('content', {
                                            rules: [{
                                                required: true,
                                                message: '请输入评论内容!' }],
                                            initialValue:this.state.name
                                        })(
                                            <TextArea rows={4} />
                                        )}
                                    </Form.Item>
                                    <Button type="primary" onClick={this.addSubmit}>添加评论</Button>
                                </Form>
                            </div>

                        </div>

                    </Content>

                    <CopyRight />
                </Layout>
            </DocumentMeta>

        )
    }
}

const DetailApp = Form.create()(Detail);
export default DetailApp;