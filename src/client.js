import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App.jsx';
import  configureStore from './store';
import { Provider } from 'react-redux';


let store = configureStore();

ReactDOM.hydrate(
    <BrowserRouter>
        <Provider store = {store}> 
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('app')
);