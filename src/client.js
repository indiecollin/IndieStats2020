import "core-js/stable";
import "regenerator-runtime/runtime";
import 'core-js/features/array/fill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/main/App.jsx';

ReactDOM.hydrate(
    <BrowserRouter>        
        <App/>        
    </BrowserRouter>,
    document.getElementById('app')
);