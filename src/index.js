import React from 'react'
import { render } from 'react-dom'
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './styles/global.scss';
import App from './components/App.jsx';
import reducer from './reducers';

const store = createStore(reducer);

const app = (
    <Provider store = {store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

render(app, document.getElementById('app'));