import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import {BrowserRouter} from 'react-router-dom';
import './main.scss';

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'));


