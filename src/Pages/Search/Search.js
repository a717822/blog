import React, { Component , ajax} from 'react';
import DocumentMeta from 'react-document-meta';

import CopyRight from '../../components/CopyRight/CopyRight'
import TopHeader from "../../components/TopHeader/TopHeader";

import {  Layout   , List, Icon , Input , message} from 'antd';
const { Content } = Layout;

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            list:[],
            key:this.props.match.params.title,

            title:'',
            canonical:'',
            keywords:'',
            description:''
        };
    }

    componentWillMount(){
        this.getSearchList();
    }

    getSearchList = ()=>{
        ajax({
            url:'searchBlog',
            method:'post',
            dataType:'json',
            async:true,
            data:{
                title:this.state.key
            },
            success:(data) =>{
                if(data.id === 10000){
                    this.setState({
                        list:data.list,

                        title:this.state.key + '_搜索列表_杨子龙的博客',
                        canonical:'https://www.yangzilong.cn/Search/' + this.state.key,
                        keywords:this.state.key + ',WebAPI,前端,权限管理,前端开发部落',
                        description:'本页是关于'+this.state.key+'搜索列表页面'
                    });
                }else{
                    this.setState({
                        list:[],

                        title:this.state.key + '_搜索列表_杨子龙的博客',
                        canonical:'https://www.yangzilong.cn/Search/' + this.state.key,
                        keywords:this.state.key + ',WebAPI,前端,权限管理,前端开发部落',
                        description:'本页是关于'+this.state.key+'搜索列表页面'
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

        ajax({
            url:'searchBlog',
            method:'post',
            dataType:'json',
            async:true,
            data:{
                title:value
            },
            success:(data) =>{
                if(data.id === 10000){
                    this.setState({
                        list:data.list,

                        title:value + '_搜索列表_杨子龙的博客',
                        canonical:'https://www.yangzilong.cn/Search/' + value,
                        keywords:value + ',WebAPI,前端,权限管理,前端开发部落',
                        description:'本页是关于'+this.state.key+'搜索列表页面'
                    });

                }else{
                    this.setState({
                        list:[],

                        title:value + '_搜索列表_杨子龙的博客',
                        canonical:'https://www.yangzilong.cn/Search/' + value,
                        keywords:value + ',WebAPI,前端,权限管理,前端开发部落',
                        description:'本页是关于'+value+'搜索列表页面'
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
                        <div className="blog" style={{
                            marginTop:20
                        }}>
                            <Input.Search
                                placeholder="请输入标题"
                                enterButton="搜索博客"
                                size="large"
                                onSearch={this.searchBlog}
                                defaultValue={this.state.key}
                            />
                        </div>
                    </Content>

                    <Content>
                        <div className="more_content">
                            <div className="more_list">
                                <List itemLayout="vertical"
                                      size="large"
                                      dataSource={this.state.list}
                                      pagination={{pageSize: 10,}}
                                      renderItem={item => (
                                          <List.Item
                                              key={item.title}
                                              actions={[<IconText type="like-o" text={item.likes} />, <IconText type="eye" text={item.views} />]}
                                              extra={<img width={270} height={168} alt="博客图片" src={item.imgsrc} /> }
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

export default Search;