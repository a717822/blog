import React, { Component } from 'react';
import {Route,HashRouter as Router} from 'react-router-dom';
import { Icon } from 'antd';
import Loadable from 'react-loadable';

const Loading = ({ pastDelay, timedOut, error }) => {
    if (pastDelay) {
        return <div style={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            textAlign: 'center',
        }}>
                    <Icon type="loading" />
                    <h1>由于网络原因，首页加载可能很慢，请耐心等待...</h1>
               </div>;
    } else if (timedOut) {
        return <div>页面正在加载，请稍等...</div>;
    } else if (error) {
        return <div>页面加载失败!</div>;
    }
    return null;
};

const router = [

    {
      path:'/',
      component:Loadable({
          loader: () => import('../Pages/Index/Index'),
          loading: Loading,
          timeout: 10000
      })
    },

    {
       path:'/Detail/:id',
       component:Loadable({
           loader: () => import('../Pages/Detail/Detail'),
           loading: Loading,
           timeout: 10000
       })
    },

    {
        path:'/More/:type',
        component:Loadable({
            loader: () => import('../Pages/More/More'),
            loading: Loading,
            timeout: 10000
        })
    },

    {
        path:'/List/:id',
        component:Loadable({
            loader: () => import('../Pages/List/List'),
            loading: Loading,
            timeout: 10000
        })
    },

    {
        path:'/Search/:title',
        component:Loadable({
            loader: () => import('../Pages/Search/Search'),
            loading: Loading,
            timeout: 10000
        })
    },

    // 错误页面
    {
        path:'/Error/403',
        component:Loadable({
            loader: () => import('../Pages/Error/403'),
            loading: Loading,
            timeout: 10000
        })
    },
    {
        path:'/Error/404',
        component:Loadable({
            loader: () => import('../Pages/Error/404'),
            loading: Loading,
            timeout: 10000
        })
    },
    {
        path:'/Error/500',
        component:Loadable({
            loader: () => import('../Pages/Error/500'),
            loading: Loading,
            timeout: 10000
        })
    },

    // 视频
    {
        path:'/Video',
        component:Loadable({
            loader: () => import('../Pages/Video/Video'),
            loading: Loading,
            timeout: 10000
        })
    },

    // 资源
    {
        path:'/Resource/List',
        component:Loadable({
            loader: () => import('../Pages/Resource/Resources'),
            loading: Loading,
            timeout: 10000
        })
    },
    {
        path:'/Resource/Detail/:id',
        component:Loadable({
            loader: () => import('../Pages/Resource/ResourceDetail'),
            loading: Loading,
            timeout: 10000
        })
    },

    // 留言板
    {
        path:'/GuestBook',
        component:Loadable({
            loader: () => import('../Pages/GuestBook/GuestBook'),
            loading: Loading,
            timeout: 10000
        })
    }

];

class Routers extends Component {
    render() {
        return (
            <Router hashType={'hashbang'}>
                <div className='test'>
                    {
                        router.map((r) => {
                            return <Route  exact
                                           path={r.path}
                                           component={r.component}
                                           key={r.path}/>;
                        })
                    }

                </div>
            </Router>
        );
    }
}

export default Routers;