import React, { Component } from 'react';
import {Route,HashRouter as Router} from 'react-router-dom';

// 错误页面
import Error_403 from '../Pages/Error/403'
import Error_404 from '../Pages/Error/404'
import Error_500 from '../Pages/Error/500'

import Index from '../Pages/Index/Index'
import Detail from "../Pages/Detail/Detail";
import More from "../Pages/More/More";
import List from "../Pages/List/List";

const router = [

    {
      path:'/',
      component:Index
    },

    {
       path:'/Detail/:id',
       component:Detail
    },

    {
        path:'/More/:type',
        component:More
    },

    {
        path:'/List/:id',
        component:List
    },

    // 错误页面
    {
        path:'/Error/403',
        component:Error_403
    },
    {
        path:'/Error/404',
        component:Error_404
    },
    {
        path:'/Error/500',
        component:Error_500
    }
];

class Routers extends Component {
    render() {
        return (
            <Router>
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