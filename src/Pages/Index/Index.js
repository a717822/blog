import React, { Component , ajax} from 'react';
import { Link } from 'react-router-dom';

import DocumentMeta from 'react-document-meta';

import CopyRight from '../../components/CopyRight/CopyRight'
import TopHeader from "../../components/TopHeader/TopHeader";

import {  Layout , Icon , Calendar  , Card , Input , message ,
    Divider , Carousel , Skeleton } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';

import moment from 'moment';
const { Content} = Layout;

const meta = {
    title: '前端开发部落_杨子龙的博客',
    description: '这是我的第二版博客,有兴趣的话,可以关注我的百家号:前端开发部落',
    canonical: 'https://www.yangzilong.cn/',
    meta: {
        name: {
            keywords: '前端,CMS,node.js,WebAPI,权限管理,React,Vue,前端开发部落'
        }
    }
};

class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            fronts:[],
            front_style:'block',
            no_front_data:'none',

            servers:[],
            server_style:'block',
            no_server_data:'none',


            news:[],
            news_style:'block',
            no_news_data:'none',

            hots:[],

            messages_style:'block',
            no_messages_data:'none',
            messages:[],

            banner:[],

            visitor:0,
            views:0,

            CardLoading:true
        };
    }

    componentDidMount(){
        this.getIndexMsg();

        localStorage.clear();
    }

    getIndexMsg = () =>{
        ajax({
            url:'getIndexMsg',
            method:'post',
            dataType:'json',
            async:true,
            success:(data) =>{
                if(data.id === 10000){

                    if(data.list.new.length === 0){
                        this.setState({
                            news_style:'none',
                            no_news_data:'block'
                        })
                    }

                    if(data.list.front.length === 0){
                        this.setState({
                            front_style:'none',
                            no_front_data:'block'
                        })
                    }

                    if(data.list.server.length === 0){
                        this.setState({
                            server_style:'none',
                            no_server_data:'block'
                        })
                    }

                    if(data.list.messages.length === 0){
                        this.setState({
                            messages_style:'none',
                            no_messages_data:'block'
                        })
                    }


                    this.setState({
                        fronts:data.list.front,
                        news:data.list.new,
                        servers:data.list.server,
                        CardLoading:false,
                        hots:data.list.hots,
                        messages:data.list.messages,
                        banner:data.list.banners,
                        visitor:data.list.visitor,
                        views:data.list.views
                    });
                }
            }
        })
    };

    // 搜索博客
    searchBlog = (value) =>{
        if(!value){
            message.error('请输入博客标题！');

            return true;
        }

        window.location.href = '/Search/' + value;
    };

    render(){
        return(
            <DocumentMeta {...meta}>
                <Layout>
                    <TopHeader />


                    <Content>
                        <div className="blog" style={{
                            marginTop:20
                        }}>
                            <Input.Search
                                placeholder="请输入博客标题"
                                enterButton="搜索博客"
                                size="large"
                                onSearch={this.searchBlog}
                            />
                        </div>
                    </Content>

                    <Content>

                        <div className="blog-container ant-col-md-16">

                            <div style={{
                                marginBottom:20
                            }}>
                                <Carousel autoplay>
                                    {
                                        this.state.banner.map((m) =>{
                                            return <div key={m.id}>
                                                        <img src={m.imgSrc}
                                                             alt={m.title}
                                                             width={'100%'}
                                                             height={500}/>
                                                        <div style={{
                                                            padding:20,
                                                            position:'absolute',
                                                            zIndex:100,
                                                            bottom:0,
                                                            backgroundColor:'#000',
                                                        }} className="ant-col-md-16">
                                                            <Link to={'/Detail/' + m.id} style={{
                                                                color:'#fff'
                                                            }}>{m.title}</Link>
                                                        </div>
                                                    </div>
                                        })
                                    }
                                </Carousel>
                            </div>

                            {/*最新发布*/}
                            <Card className="blog" loading={this.state.CardLoading}>
                                <div className="blog-cate">最新发布</div>
                                <div className="blog-content">
                                    <div style={{display:this.state.news_style}}>
                                        <ul>
                                            {
                                                this.state.news.map((n) => {
                                                    return <li key={n.id}>
                                                                <Link to={'/Detail/' + n.id}>{n.title}</Link>
                                                            </li>
                                                })
                                            }
                                        </ul>
                                        <Link className="more" to='/More/news'>
                                            更多<Icon type="down-circle-o" />
                                        </Link>
                                    </div>
                                    <div className="no_data"
                                         style={{display:this.state.no_news_data}}>
                                        暂无最新发布的博客
                                    </div>
                                </div>
                            </Card>

                            {/*服务器端*/}
                            <Card className="blog" loading={this.state.CardLoading}>
                                <div className="blog-cate">服务器端</div>
                                <div className="blog-content">
                                    <div style={{display:this.state.server_style}}>
                                        <ul>
                                            {
                                                this.state.servers.map((s) =>{
                                                    return  <li key={s.id}>
                                                                <Link to={'/Detail/' + s.id}>{s.title}</Link>
                                                            </li>
                                                })
                                            }
                                        </ul>
                                        <Link className="more" to='/More/server'>
                                            更多<Icon type="down-circle-o" />
                                        </Link>
                                    </div>


                                    <div className="no_data"
                                         style={{display:this.state.no_server_data}}>
                                        暂无最新发布的博客
                                    </div>
                                </div>
                            </Card>

                            {/*前端*/}
                            <Card className="blog" loading={this.state.CardLoading}>
                                <div className="blog-cate">前端</div>
                                <div className="blog-content">
                                    <div style={{display:this.state.front_style}}>
                                        <ul>
                                            {
                                                this.state.fronts.map((f) =>{
                                                    return <li key={f.id}>
                                                                <Link to={'/Detail/' + f.id}>{f.title}</Link>
                                                            </li>
                                                })
                                            }
                                        </ul>
                                        <Link className="more" to='/More/front'>
                                            更多<Icon type="down-circle-o" />
                                        </Link>
                                    </div>


                                    <div className="no_data"
                                         style={{display:this.state.no_front_data}}>
                                        暂无最新发布的博客
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <div className="ant-col-md-7">
                            <div className="clearfix calendar" style={{
                                padding:30
                            }}>
                                <div className="ant-col-md-10">
                                    <Skeleton loading={this.state.CardLoading} active={true}>
                                        <Icon type="user" theme="outlined" />
                                        <span>浏览次数：{this.state.visitor}</span>
                                    </Skeleton>
                                </div>
                                <div className="ant-col-md-10">
                                    <Skeleton loading={this.state.CardLoading} active={true}>
                                        <Icon type="eye" />
                                        <span>文章查看次数：{this.state.views}</span>
                                    </Skeleton>
                                </div>
                            </div>

                            <div className="calendar">
                                <Calendar fullscreen={false}
                                          locale={locale}
                                          disabledDate={(current)=>{
                                              return current && current < moment().endOf('day')
                                          }}/>
                            </div>

                            <div className="calendar blog">
                                <Divider>热门博客</Divider>
                                <div className="blog-content">
                                    <Skeleton loading={this.state.CardLoading}  active={true}>
                                        <ul>
                                            {
                                                this.state.hots.map((n , index) => {
                                                    return <li key={n.id}>
                                                        <Link to={'/Detail/' + n.id}>
                                                            <span>{index + 1}、</span>{n.title}
                                                        </Link>
                                                    </li>
                                                })
                                            }
                                        </ul>
                                    </Skeleton>
                                </div>
                            </div>

                            <div className="calendar blog">
                                <Divider>留言墙</Divider>
                                <div className="blog-content"
                                     style={{display:this.state.messages_style}}>
                                    <Skeleton loading={this.state.CardLoading} active={true}>
                                        <ul>
                                            {
                                                this.state.messages.map((n) => {
                                                    return <li key={n.id}>
                                                        <a>{n.content}</a>
                                                    </li>
                                                })
                                            }
                                        </ul>
                                    </Skeleton>
                                </div>

                                <div className="no_data"
                                     style={{display:this.state.no_messages_data}}>
                                    暂无留言
                                </div>
                            </div>
                        </div>

                    </Content>

                    <CopyRight />

                </Layout>
            </DocumentMeta>

        )
    }
}

export default Index;