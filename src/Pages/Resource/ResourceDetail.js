// 资源详情

import React, { Component , ajax} from 'react';

import CopyRight from '../../components/CopyRight/CopyRight'
import TopHeader from "../../components/TopHeader/TopHeader";

import {  Layout } from 'antd';

const { Content } = Layout;

class ResourceDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            resource:''
        }
    }

    componentWillMount(){
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
                        resource:data.list[0]
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

                    document.title = data.list[0].name + '-资源下载—杨子龙的主页'
                }
            }
        });
    };


    render(){
        return(
            <Layout>
                <TopHeader />

                <Content>
                    <div className="blog_detail">
                        <div className="blog_header">
                            <div className="blog_title">
                                <h1>{this.state.resource.name}</h1>
                            </div>
                        </div>

                        <div className="blog_detail_content"
                             dangerouslySetInnerHTML = {{ __html:this.state.resource.info}}></div>
                    </div>
                </Content>

                <CopyRight />

            </Layout>
        )
    }
}

export default ResourceDetail;