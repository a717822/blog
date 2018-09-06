import React, { Component , ajax} from 'react';

import CopyRight from '../../components/CopyRight/CopyRight'
import TopHeader from "../../components/TopHeader/TopHeader";

import {  Layout  , Divider  , List, Icon} from 'antd';
const { Content } = Layout;

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

export default blogList;