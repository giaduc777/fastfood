import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import classes from './index.module.scss';
import {BrowserRouter} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import MenuBackground from '../src/components/MenuBackground/MenuBackground';
import './main.scss';

const store = createStore(reducer)


const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App className={`${classes.body}`}></App>
            <MenuBackground />
       </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
