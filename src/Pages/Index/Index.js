import React, { Component , ajax} from 'react';

import CopyRight from '../../components/CopyRight/CopyRight'
// import TopHeader from "../../components/topHeader/topHeader";

import {  Layout , Icon , Calendar , Menu} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';

const { Content , Header} = Layout;

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
            no_news_data:'none'
        }
    }

    componentWillMount(){
        this.getIndexMsg();
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
                        servers:data.list.server
                    })
                }
            }
        })
    };

    goDetail = (e) =>{
         window.location.href = '#/Detail/' + e;
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

                        {/*最新发布*/}
                        <div className="blog">
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

                        </div>

                        {/*服务器端*/}
                        <div className="blog">
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
                        </div>

                        {/*前端*/}
                        <div className="blog">
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
                        </div>
                    </div>

                    <div className="calendar ant-col-md-7">
                        <Calendar fullscreen={false} locale={locale}  />
                    </div>

                </Content>

                <CopyRight />

            </Layout>
        )
    }
}

export default Index;