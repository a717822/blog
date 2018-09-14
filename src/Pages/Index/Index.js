import React, { Component , ajax} from 'react';
import DocumentMeta from 'react-document-meta';

import CopyRight from '../../components/CopyRight/CopyRight'
import TopHeader from "../../components/TopHeader/TopHeader";

import {  Layout , Icon , Calendar  , Card , Input , message , Divider} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';

import moment from 'moment';
const { Content} = Layout;

const meta = {
    title: '前端开发部落_杨子龙的博客',
    description: '这是我的第二版博客,有兴趣的话,可以关注我的百家号:前端开发部落',
    canonical: 'https://www.yangzilong.cn/#/',
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

            CardLoading:true
        }
    }

    componentWillMount(){
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


                    this.setState({
                        fronts:data.list.front,
                        news:data.list.new,
                        servers:data.list.server,
                        CardLoading:false,
                        hots:data.list.hots
                    });
                }
            }
        })
    };

    goDetail = (e) =>{
         window.location.href = '#/Detail/' + e;
    };

    // 搜索博客
    searchBlog = (value) =>{
        if(!value){
            message.error('请输入博客标题！');

            return true;
        }


        window.location.href = '#/Search/' + value;
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

                            {/*最新发布*/}
                            <Card className="blog" loading={this.state.CardLoading}>
                                <div className="blog-cate">最新发布</div>
                                <div className="blog-content">
                                    <div style={{display:this.state.news_style}}>
                                        <ul>
                                            {
                                                this.state.news.map((n) => {
                                                    return <li key={n.id}>
                                                        <a onClick={()=>{
                                                            this.goDetail(n.id)
                                                        }}>{n.title}</a>
                                                    </li>
                                                })
                                            }
                                        </ul>
                                        <div className="more" onClick={() =>{
                                            window.location.href = '#/More/news'
                                        }}>
                                            更多<Icon type="down-circle-o" />
                                        </div>
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
                                                        <a onClick={()=>{
                                                            this.goDetail(s.id)
                                                        }}>{s.title}</a>
                                                    </li>
                                                })
                                            }
                                        </ul>
                                        <div className="more" onClick={() =>{
                                            window.location.href = '#/More/server'
                                        }}>
                                            更多<Icon type="down-circle-o" />
                                        </div>
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
                                                        <a onClick={()=>{
                                                            this.goDetail(f.id)
                                                        }}>{f.title}</a>
                                                    </li>
                                                })
                                            }
                                        </ul>
                                        <div className="more" onClick={() =>{
                                            window.location.href = '#/More/front'
                                        }}>
                                            更多<Icon type="down-circle-o" />
                                        </div>
                                    </div>


                                    <div className="no_data"
                                         style={{display:this.state.no_front_data}}>
                                        暂无最新发布的博客
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <div className="calendar ant-col-md-7">
                            <Calendar fullscreen={false}
                                      locale={locale}
                                      disabledDate={(current)=>{
                                          return current && current < moment().endOf('day')
                                      }}/>
                        </div>

                        <div className="calendar blog ant-col-md-7">
                            <Divider>热门博客</Divider>
                            <div className="blog-content">
                                <ul>
                                    {
                                        this.state.hots.map((n , index) => {
                                            return <li key={n.id}>
                                                <a onClick={()=>{
                                                    this.goDetail(n.id)
                                                }}><span>{index + 1}、</span>{n.title}</a>
                                            </li>
                                        })
                                    }
                                </ul>
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