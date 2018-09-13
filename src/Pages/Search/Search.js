import React, { Component , ajax} from 'react';

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
            title:this.props.match.params.title
        }
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
                title:this.state.title
            },
            success:(data) =>{
                if(data.id === 10000){
                    this.setState({
                        list:data.list,
                    });
                }else{
                    this.setState({
                        list:[],
                    });
                }

                document.title = this.state.title + '—杨子龙的主页—搜索';
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
                    });

                }else{
                    this.setState({
                        list:[],
                    });
                }

                this.props.match.params.title = value;
                document.title = value + '—杨子龙的主页—搜索';
            }
        })
    };

    render(){
        return(
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
                            defaultValue={this.state.title}
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
        )
    }
}

export default Search;