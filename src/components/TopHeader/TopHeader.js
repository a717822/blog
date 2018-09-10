import React, { Component } from 'react';
import { Layout , Icon , Menu ,Drawer} from 'antd';
const { Header} = Layout;

class TopHeader extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            selected: localStorage.getItem('blog_selected')?localStorage.getItem('blog_selected'):'book'
        }
    }

    chooseMenu = (e) =>{
        localStorage.setItem('blog_selected' , e.key);
    };

    render(){
        return(
            <Header>
                <div className="pc_header">
                    <Menu selectedKeys={[this.state.selected]}
                          mode="horizontal"
                          theme="dark"
                          style={{ lineHeight: '64px' }}
                          onClick={this.chooseMenu}>
                        <Menu.Item key="book">
                            <a href="#/">
                                <Icon type="book" />首页
                            </a>
                        </Menu.Item>
                        <Menu.SubMenu title={<span><Icon type="share-alt" />技术分享</span>}>
                            <Menu.ItemGroup title="服务器端">
                                <Menu.Item key="share:1">
                                    <a href='#/List/3'>Node.js</a>
                                </Menu.Item>
                                <Menu.Item key="share:2">
                                    <a href='#/List/1'>PHP</a>
                                </Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup title="前端">
                                <Menu.Item key="share:3">
                                    <a href='#/List/2'>前端</a>
                                </Menu.Item>
                                <Menu.Item key="share:4">
                                    <a href='#/List/4'>React & Vue</a>
                                </Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.SubMenu>
                        <Menu.Item key="Resource">
                            <a href="#/Resource/List">
                                <Icon type="cloud-download" theme="outlined" />资源下载
                            </a>
                        </Menu.Item>
                    </Menu>
                </div>
                <div className="mobile_header">
                    <div className="mobile_title">杨子龙的主页</div>
                    <div className="mobile_menu" onClick={()=>{
                        this.setState({
                            visible:true
                        })
                    }}>
                        <Icon type="bars" theme="outlined" />
                    </div>

                    <Drawer
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                        width={200}
                    >
                        <Menu
                            onClick={this.handleClick}
                            style={{ width: 200 }}
                            defaultSelectedKeys={['book']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            theme="dark"
                        >
                            <Menu.Item key="book">
                                <a href="#/">
                                    <Icon type="book" />首页
                                </a>
                            </Menu.Item>
                            <Menu.SubMenu title={<span><Icon type="share-alt" />技术分享</span>}>
                                <Menu.ItemGroup title="服务器端">
                                    <Menu.Item key="share:1">
                                        <a href='#/List/3'>Node.js</a>
                                    </Menu.Item>
                                    <Menu.Item key="share:2">
                                        <a href='#/List/1'>PHP</a>
                                    </Menu.Item>
                                </Menu.ItemGroup>
                                <Menu.ItemGroup title="前端">
                                    <Menu.Item key="share:3">
                                        <a href='#/List/2'>前端</a>
                                    </Menu.Item>
                                    <Menu.Item key="share:4">
                                        <a href='#/List/4'>React & Vue</a>
                                    </Menu.Item>
                                </Menu.ItemGroup>
                            </Menu.SubMenu>
                            <Menu.Item key="Resource">
                                <a href="#/Resource/List">
                                    <Icon type="cloud-download" theme="outlined" />资源下载
                                </a>
                            </Menu.Item>
                        </Menu>
                    </Drawer>
                </div>
            </Header>
        )
    }

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
}

export default TopHeader;