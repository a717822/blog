// 资源详情

import React, { Component , ajax} from 'react';
import DocumentMeta from 'react-document-meta';

import CopyRight from '../../components/CopyRight/CopyRight'
import TopHeader from "../../components/TopHeader/TopHeader";

import {  Layout , Skeleton } from 'antd';

const { Content } = Layout;

class ResourceDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            resource:'',

            title:'',
            canonical:'',
            keywords:'',
            description:'',

            Loading:true
        }
    }

    componentDidMount(){
        this.getResourceDetail();
    }

    getResourceDetail = () =>{
        let id = this.props.match.params.id;
        ajax({
            url:'getResourceDetail',
            method:'post',
            dataType:'json',
            async:true,
            data:{
                id:id
            },
            success:(data) =>{
                if(data.id === 10000){
                    this.setState({
                        resource:data.list[0],

                        title:data.list[0].name + '_资源下载_杨子龙的博客',
                        canonical:'https://www.yangzilong.cn/Resource/Detail/' + this.props.match.params.id,
                        keywords:data.list[0].name + ',资源下载,前端,权限管理,前端开发部落,杨子龙的博客',
                        description:'本页是提供' + data.list[0].name + '下载以及代码的使用方法',
                        Loading:false

                    },()=>{
                        document.getElementsByTagName('a')[2].addEventListener('click',function () {
                            ajax({
                                url:'downloadResource',
                                method:'post',
                                dataType:'json',
                                async:true,
                                data:{
                                    id:id
                                },
                                success:(data) =>{
                                }
                            })
                        })
                    });
                }
            }
        });
    };


    render(){
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
                            <div className="blog_header">
                                <div className="blog_title">
                                    <Skeleton loading={this.state.Loading} active={true}>
                                        <h1>{this.state.resource.name}</h1>
                                    </Skeleton>

                                </div>
                            </div>

                            <div className="blog_detail_content"
                                 dangerouslySetInnerHTML = {{ __html:this.state.resource.info}}></div>
                        </div>
                    </Content>

                    <CopyRight />

                </Layout>
            </DocumentMeta>

        )
    }
}

export default ResourceDetail;