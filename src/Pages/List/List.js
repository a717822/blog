import React, { Component , ajax} from 'react';

import CopyRight from '../../components/CopyRight/CopyRight'
import {  Layout  , Divider  , List, Icon , Menu} from 'antd';

const { Content , Header} = Layout;

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

class blogList extends Component {
    constructor(props){
        super(props);
        this.state = {
            list:[],
            name:'',
            select:localStorage.getItem('select')?localStorage.getItem('select'):'share:1',
        }
    }

    componentWillMount(){
        this.getBlogList();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            window.location.reload();
        }
    }

    getBlogList = ()=>{
        ajax({
            url:'getBlogList',
            method:'post',
            dataType:'json',
            async:true,
            data:{
                id:this.props.match.params.id
            },
            success:(data) =>{
                if(data.id === 10000){
                    this.setState({
                        list:data.list,
                        name:data.name
                    });

                    document.title = data.name + '—杨子龙的主页—技术分享';
                }
            }
        })
    };

    render(){
        return(
            <Layout>
                <Header>
                    <Menu selectedKeys={[this.state.select]}
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
                                        localStorage.setItem('select' , 'share:1');
                                    }}>
                                        Node.js
                                    </a>
                                </Menu.Item>
                                <Menu.Item key="share:2">
                                    <a onClick={()=>{
                                        window.location.href = '#/List/1';
                                        localStorage.setItem('select' , 'share:2');
                                    }}>PHP</a>
                                </Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup title="前端">
                                <Menu.Item key="share:3">
                                    <a onClick={()=>{
                                        window.location.href = '#/List/2';
                                        localStorage.setItem('select' , 'share:3');
                                    }}>前端</a>
                                </Menu.Item>
                                <Menu.Item key="share:4">
                                    <a onClick={()=>{
                                        window.location.href = '#/List/4';
                                        localStorage.setItem('select' , 'share:4');
                                    }}>最新Web API</a>
                                </Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.SubMenu>
                    </Menu>
                </Header>

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
                                          actions={[<IconText type="like-o" text="0" />, <IconText type="eye" text={item.views} />]}
                                          extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                                      >
                                          <List.Item.Meta
                                              title={<a href={item.href}>{item.title}</a>}
                                          />
                                          {item.content}
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

export default blogList;