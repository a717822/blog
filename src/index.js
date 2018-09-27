import 'babel-polyfill';
import React from 'react';
import { hydrate, render } from "react-dom";

// 引入ant design CSS
import 'antd/dist/antd.min.css';
import './assets/css/App.css'

import Routers from './routers/index';

import registerServiceWorker from './registerServiceWorker';
import {yangAjax} from "./assets/Server/yangAjax";

React.ajax = yangAjax;

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
    hydrate(<Routers />, rootElement);
} else {
    render(<Routers />, rootElement);
}
registerServiceWorker();
