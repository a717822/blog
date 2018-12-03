import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Layout , Icon , Menu ,Drawer} from 'antd';
const { Header} = Layout;

class TopHeader extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            selected: localStorage.getItem('blog_selected')?localStorage.getItem('blog_selected'):'book',

            cates:[
                {
                    id:1,
                    title:'PHP'
                },
                {
                    id:2,
                    title:'前端'
                },
                {
                    id:3,
                    title:'Node.js'
                },
                {
                    id:4,
                    title:'React Native'
                },
            ]
        };
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
                            <Link to="/">首页</Link>
                        </Menu.Item>

                        {
                            this.state.cates.map((cate) =>{

                                return <Menu.Item key={cate.title}>
                                            <Link to={'/List/' + cate.id}>{cate.title}</Link>
                                       </Menu.Item>

                            })
                        }

                        <Menu.Item key="Resource">
                            <Link to="/Resource/List">资源下载</Link>
                        </Menu.Item>
                        <Menu.Item key="message">
                            <Link to="/GuestBook">留言板</Link>
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
                                <Link to="/">首页</Link>
                            </Menu.Item>

                            {
                                this.state.cates.map((cate) =>{

                                    return <Menu.Item key={cate.title}>
                                        <Link to={'/List/' + cate.id}>{cate.title}</Link>
                                    </Menu.Item>

                                })
                            }

                            <Menu.Item key="Resource">
                                <Link to="/Resource/List">资源下载</Link>
                            </Menu.Item>
                            <Menu.Item key="message">
                                <Link to="/GuestBook">留言板</Link>
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