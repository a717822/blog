import React, { Component , ajax} from 'react';

import CopyRight from '../../components/CopyRight/CopyRight'
import TopHeader from "../../components/TopHeader/TopHeader";

import {  Layout , Icon , Calendar  , Card} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';


const { Content} = Layout;

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
                        CardLoading:false
                    });

                    document.title = '杨子龙的主页';
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
                <TopHeader />

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
                        <Calendar fullscreen={false} locale={locale}  />
                    </div>

                </Content>

                <CopyRight />

            </Layout>
        )
    }
}

export default Index;