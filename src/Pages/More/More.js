import React, { Component , ajax} from 'react';
import DocumentMeta from 'react-document-meta';

import CopyRight from '../../components/CopyRight/CopyRight'
import TopHeader from "../../components/TopHeader/TopHeader";

import {  Layout  , Divider ,  List , Icon } from 'antd';


const { Content } = Layout;

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

class More extends Component {
    constructor(props){
        super(props);
        this.state = {
            list:[],
            name:'',

            title:'',
            canonical:'',
            keywords:'',
            description:''
        }
    }

    componentWillMount(){
        this.getMoreList();
    }

    getMoreList = () =>{
        ajax({
            url:'getMoreList',
            method:'post',
            dataType:'json',
            async:true,
            data:{
                type:this.props.match.params.type
            },
            success:(data) =>{
                if(data.id === 10000){
                    this.setState({
                        list:data.list,
                        name:data.name,

                        title:data.name + '_更多_杨子龙的博客',
                        canonical:'https://www.yangzilong.cn/#/More/' + this.props.match.params.type,
                        keywords:data.name + ',WebAPI,前端,权限管理,前端开发部落',
                        description:'本页是关于'+data.name+'更多列表页面'
                    });
                }
            }
        })
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
                        <div className="more_content">
                            <h1 className="more_title">{this.state.name}</h1>
                            <Divider />
                            <div className="more_list">
                                <List itemLayout="vertical"
                                      size="large"
                                      dataSource={this.state.list}
                                      pagination={{pageSize: 10,}}
                                      renderItem={item => (
                                          <List.Item
                                              key={item.title}
                                              actions={[<IconText type="like-o" text={item.likes} />, <IconText type="eye" text={item.views} />]}
                                              extra={<img width={270} height={168} alt="博客图片" src={item.imgsrc} />}
                                          >
                                              <List.Item.Meta
                                                  title={<a href={item.href}>{item.title}</a>}
                                              />
                                              {item.description}
                                          </List.Item>
                                      )}>

                                </List>
                            </div>
                        </div>
                    </Content>

                    <CopyRight />
                </Layout>
            </DocumentMeta>
        )
    }
}

export default More;