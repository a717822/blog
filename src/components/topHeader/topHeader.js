import React, { Component } from 'react';
import {Layout, Menu , Icon} from 'antd';
const { Header } = Layout;

class topHeader extends Component {
    render(){
        return(
            <Header>
                    <Menu selectedKeys={['book']}
                          mode="horizontal"
                          theme="dark"
                          style={{ lineHeight: '64px' }}>
                        <Menu.Item key="book">
                            <Icon type="book" />首页
                        </Menu.Item>
                        <Menu.SubMenu title={<span><Icon type="share-alt" />技术分享</span>}>
                            <Menu.ItemGroup title="服务器端">
                                <Menu.Item key="share:1">Node.js</Menu.Item>
                                <Menu.Item key="share:2">PHP</Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup title="前端">
                                <Menu.Item key="share:3">前端</Menu.Item>
                                <Menu.Item key="share:4">最新Web API</Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.SubMenu>
                        {/*<Menu.Item key="about">*/}
                        {/*关于我*/}
                        {/*</Menu.Item>*/}
                    </Menu>
                </Header>

        )
    }
}

export default topHeader;