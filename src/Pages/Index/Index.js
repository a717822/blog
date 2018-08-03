import React, { Component , ajax} from 'react';

import CopyRight from '../../components/CopyRight/CopyRight'
import TopHeader from "../../components/topHeader/topHeader";

import {  Layout , Icon , Calendar} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';

const { Content } = Layout;

class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            index:''
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
                    this.setState({
                        index:data.list
                    })
                }
            }
        })
    };

    render(){
        return(
            <Layout>
                <TopHeader />

                <Content style={{ padding: '0 50px' }}>

                    <div className="blog-container ant-col-md-16">

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

                    <div className="calendar ant-col-md-6">
                        <Calendar fullscreen={false} locale={locale}  />
                    </div>

                </Content>

                <CopyRight />

            </Layout>
        )
    }
}

export default Index;