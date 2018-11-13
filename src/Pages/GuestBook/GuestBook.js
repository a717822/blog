import React, { Component , ajax} from 'react';
import DocumentMeta from 'react-document-meta';

import CopyRight from '../../components/CopyRight/CopyRight'
import TopHeader from "../../components/TopHeader/TopHeader";

import {  Layout   , Divider  , message , Avatar , Form , Input , Button} from 'antd';

import 'highlight.js/styles/sunburst.css'
import '../Detail/Detail.css'

const { Content } = Layout;
const { TextArea } = Input;

class GuestBook extends Component {
    constructor(props){
        super(props);
        this.state = {
            books:[],

            pid:0,
            level:1,
            name:'',

            title:'',
            canonical:'',
            keywords:'',
            description:''
        }
    }

    componentWillMount(){
        this.getBlogBooksList()
    }

    // 获取博客留言列表
    getBlogBooksList = () =>{
        ajax({
            url:'getMessageList',
            method:'post',
            dataType:'json',
            async:true,
            success:(data) =>{
                if(data.id === 10000){

                    this.setState({
                        books:data.list,

                        title:'留言板_杨子龙的博客',
                        canonical:'https://www.yangzilong.cn/GuestBook',
                        keywords:'留言板,WebAPI,前端,权限管理,前端开发部落',
                        description:'本页是关于本博客的留言板页面'
                    })

                }else{
                    this.setState({
                        books:['暂无留言'],

                        title:'留言板_杨子龙的博客',
                        canonical:'https://www.yangzilong.cn/GuestBook',
                        keywords:'留言板,WebAPI,前端,权限管理,前端开发部落',
                        description:'本页是关于本博客的留言板页面'
                    })
                }
            }
        })
    };

    // 回复
    reply = (id , name) =>{
        this.setState({
            level:2,
            pid:id,
            name: '@'+ name
        })
    };

    // 添加留言
    addSubmit = (e) =>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err){
                values.pid = this.state.pid;
                values.level = this.state.level;

                ajax({
                    url:'addMessage',
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
                            <Divider orientation="left">关于我</Divider>
                            <div className="info" style={{
                                paddingBottom:100
                            }}>
                                <p>我，毕业于湖北三类学校（现在都成为二类），专业电子信息科学与技术。从事前端这行业已经3年多时间了</p>
                                <p>在这三年中，依然是一个前端小白。对自己的评价是，一知半解的前端，
                                    一知半解的后端，不精通前端，也不精通后端。我可能是一个半吊子前端吧</p>
                                <p>2017年12月：在老薛主机上，上线第一版博客。后端是用ThinkPHP 3.2.3，前端为Vue + vuebeauty搭建；</p>
                                <p>2018年07月：琢磨自己的第二版博客，使用腾讯云CVM服务器 , 开发后台 + 前台；</p>
                                <p>2018年09月：上线自己的第二版博客。后端用Node.js + Express,前端为React + React-router + ant Design；</p>
                                <p>目前为止，本博客使用预渲染技术实现了SEO，想要了解预渲染技术的可以查看本博客的博文</p>
                                <p>由于第一版博客的数据消失，所有博文从8月份开始添加到数据库（其实是为了测试），
                                    还有些博客功能未添加，后期也将逐步添加上</p>
                            </div>

                            <Divider orientation="left">留言板</Divider>
                            <ul className="discuss_list">
                                {
                                    this.state.books.map((d) =>{
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
                                            return '暂无留言';
                                        }

                                    })
                                }
                            </ul>

                            {/*添加留言*/}
                            <div className="add_discuss">
                                <Divider orientation="left">添加留言</Divider>
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
                                    <Button type="primary" onClick={this.addSubmit}>添加留言</Button>
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

const GuestBookApp = Form.create()(GuestBook);
export default GuestBookApp;