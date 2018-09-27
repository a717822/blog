import 'babel-polyfill';
import React from 'react';
import { hydrate, render } from "react-dom";
import registerServiceWorker from './registerServiceWorker';

import Routers from './routers/index';
import {yangAjax} from "./assets/Server/yangAjax";

// 引入ant design CSS
import 'antd/dist/antd.min.css';
import './assets/css/App.css'

React.ajax = yangAjax;

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
    hydrate(<Routers />, rootElement);
} else {
    render(<Routers />, rootElement);
}
registerServiceWorker();
